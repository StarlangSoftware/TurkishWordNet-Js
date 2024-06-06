(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./SynSet", "./Literal", "nlptoolkit-dictionary/dist/Dictionary/ExceptionalWord", "nlptoolkit-xmlparser/dist/XmlDocument", "nlptoolkit-dictionary/dist/Dictionary/Pos", "./SemanticRelation", "./InterlingualRelation", "./SemanticRelationType"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WordNet = void 0;
    const SynSet_1 = require("./SynSet");
    const Literal_1 = require("./Literal");
    const ExceptionalWord_1 = require("nlptoolkit-dictionary/dist/Dictionary/ExceptionalWord");
    const XmlDocument_1 = require("nlptoolkit-xmlparser/dist/XmlDocument");
    const Pos_1 = require("nlptoolkit-dictionary/dist/Dictionary/Pos");
    const SemanticRelation_1 = require("./SemanticRelation");
    const InterlingualRelation_1 = require("./InterlingualRelation");
    const SemanticRelationType_1 = require("./SemanticRelationType");
    class WordNet {
        /**
         * Reads a wordnet from a Xml file. A wordnet consists of a list of synsets encapsulated inside SYNSET tag. A synset
         * has an id (represented with ID tag), a set of literals encapsulated inside SYNONYM tag, part of speech tag
         * (represented with POS tag), a set of semantic relations encapsulated inside SR tag, a definition (represented
         * with DEF tag), and a possible example (represented with EXAMPLE tag). Each literal has a name, possibly a group
         * number (represented with GROUP tag), a sense number (represented with SENSE tag) and a set of semantic relations
         * encapsulated inside SR tag. A semantic relation has a name and a type (represented with TYPE tag).
         * @param fileName File stream that contains the wordnet.
         */
        constructor(fileName, locale) {
            this.synSetList = new Map();
            this.literalList = new Map();
            this.locale = "tr";
            this.exceptionList = new Map();
            this.interlingualList = new Map();
            if (fileName == undefined) {
                fileName = "turkish_wordnet.xml";
            }
            else {
                if (locale == undefined) {
                    this.locale = "en";
                    this.readExceptionFile("english_exception.xml");
                }
                else {
                    this.locale = locale;
                }
            }
            let doc = new XmlDocument_1.XmlDocument(fileName);
            doc.parse();
            let rootNode = doc.getFirstChild();
            let synSetNode = rootNode.getFirstChild();
            let currentSynSet, typeNode, toNode, literalNode, senseNode;
            while (synSetNode != undefined) {
                let partNode = synSetNode.getFirstChild();
                while (partNode != undefined) {
                    if (partNode.getName() == "ID") {
                        currentSynSet = new SynSet_1.SynSet(partNode.getPcData());
                        this.addSynSet(currentSynSet);
                    }
                    else {
                        if (partNode.getName() == "DEF") {
                            currentSynSet.setDefinition(partNode.getPcData());
                        }
                        else {
                            if (partNode.getName() == "EXAMPLE") {
                                currentSynSet.setExample(partNode.getPcData());
                            }
                            else {
                                if (partNode.getName() == "BCS") {
                                    currentSynSet.setBcs(Number.parseInt(partNode.getPcData()));
                                }
                                else {
                                    if (partNode.getName() == "POS") {
                                        switch (partNode.getPcData()[0]) {
                                            case 'a':
                                                currentSynSet.setPos(Pos_1.Pos.ADJECTIVE);
                                                break;
                                            case 'v':
                                                currentSynSet.setPos(Pos_1.Pos.VERB);
                                                break;
                                            case 'b':
                                                currentSynSet.setPos(Pos_1.Pos.ADVERB);
                                                break;
                                            case 'n':
                                                currentSynSet.setPos(Pos_1.Pos.NOUN);
                                                break;
                                            case 'i':
                                                currentSynSet.setPos(Pos_1.Pos.INTERJECTION);
                                                break;
                                            case 'c':
                                                currentSynSet.setPos(Pos_1.Pos.CONJUNCTION);
                                                break;
                                            case 'p':
                                                currentSynSet.setPos(Pos_1.Pos.PREPOSITION);
                                                break;
                                            case 'r':
                                                currentSynSet.setPos(Pos_1.Pos.PRONOUN);
                                                break;
                                        }
                                    }
                                    else {
                                        if (partNode.getName() == "SR") {
                                            typeNode = partNode.getFirstChild();
                                            if (typeNode != undefined && typeNode.getName() == "TYPE") {
                                                toNode = typeNode.getNextSibling();
                                                if (toNode != undefined && toNode.getName() == "TO") {
                                                    currentSynSet.addRelation(new SemanticRelation_1.SemanticRelation(partNode.getPcData(), typeNode.getPcData(), Number.parseInt(toNode.getPcData())));
                                                }
                                                else {
                                                    currentSynSet.addRelation(new SemanticRelation_1.SemanticRelation(partNode.getPcData(), typeNode.getPcData()));
                                                }
                                            }
                                        }
                                        else {
                                            if (partNode.getName() == "ILR") {
                                                typeNode = partNode.getFirstChild();
                                                if (typeNode != undefined && typeNode.getName() == "TYPE") {
                                                    let interlingualId = partNode.getPcData();
                                                    let sList;
                                                    if (this.interlingualList.has(interlingualId)) {
                                                        sList = this.interlingualList.get(interlingualId);
                                                    }
                                                    else {
                                                        sList = new Array();
                                                    }
                                                    sList.push(currentSynSet);
                                                    this.interlingualList.set(interlingualId, sList);
                                                    currentSynSet.addRelation(new InterlingualRelation_1.InterlingualRelation(interlingualId, typeNode.getPcData()));
                                                }
                                            }
                                            else {
                                                if (partNode.getName() == "SYNONYM") {
                                                    literalNode = partNode.getFirstChild();
                                                    while (literalNode != undefined) {
                                                        if (literalNode.getName() == "LITERAL") {
                                                            senseNode = literalNode.getFirstChild();
                                                            if (senseNode != undefined) {
                                                                if (senseNode.getName() == "SENSE" && senseNode.getPcData() != "") {
                                                                    let currentLiteral = new Literal_1.Literal(literalNode.getPcData(), Number.parseInt(senseNode.getPcData()), currentSynSet.getId());
                                                                    let srNode = senseNode.getNextSibling();
                                                                    while (srNode != undefined) {
                                                                        if (srNode.getName() == "SR") {
                                                                            typeNode = srNode.getFirstChild();
                                                                            if (typeNode != undefined && typeNode.getName() == "TYPE") {
                                                                                toNode = typeNode.getNextSibling();
                                                                                if (toNode != undefined && toNode.getName() == "TO") {
                                                                                    currentLiteral.addRelation(new SemanticRelation_1.SemanticRelation(srNode.getPcData(), typeNode.getPcData(), Number.parseInt(toNode.getPcData())));
                                                                                }
                                                                                else {
                                                                                    currentLiteral.addRelation(new SemanticRelation_1.SemanticRelation(srNode.getPcData(), typeNode.getPcData()));
                                                                                }
                                                                            }
                                                                        }
                                                                        else {
                                                                            if (srNode.getName() == "ORIGIN") {
                                                                                currentLiteral.setOrigin(srNode.getPcData());
                                                                            }
                                                                            else {
                                                                                if (srNode.getName() == "GROUP") {
                                                                                    currentLiteral.setGroupNo(Number.parseInt(senseNode.getPcData()));
                                                                                }
                                                                            }
                                                                        }
                                                                        srNode = srNode.getNextSibling();
                                                                    }
                                                                    currentSynSet.addLiteral(currentLiteral);
                                                                    this.addLiteralToLiteralList(currentLiteral);
                                                                }
                                                            }
                                                        }
                                                        literalNode = literalNode.getNextSibling();
                                                    }
                                                }
                                                else {
                                                    if (partNode.getName() == "SNOTE") {
                                                        currentSynSet.setNote(partNode.getPcData());
                                                    }
                                                    else {
                                                        if (partNode.getName() == "WIKI") {
                                                            currentSynSet.setWikiPage(partNode.getPcData());
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    partNode = partNode.getNextSibling();
                }
                synSetNode = synSetNode.getNextSibling();
            }
        }
        /**
         * Method constructs a DOM parser using the dtd/xml schema parser configuration and using this parser it
         * reads exceptions from file and puts to exceptionList HashMap.
         *
         * @param exceptionFileName exception file to be read
         */
        readExceptionFile(exceptionFileName) {
            let doc = new XmlDocument_1.XmlDocument(exceptionFileName);
            doc.parse();
            let rootNode = doc.getFirstChild();
            let wordNode = rootNode.getFirstChild();
            let pos;
            while (wordNode != undefined) {
                if (wordNode.hasAttributes()) {
                    let wordName = wordNode.getAttributeValue("name");
                    let rootForm = wordNode.getAttributeValue("root");
                    if (wordNode.getAttributeValue("pos") == "Adj") {
                        pos = Pos_1.Pos.ADJECTIVE;
                    }
                    else {
                        if (wordNode.getAttributeValue("pos") == "Adv") {
                            pos = Pos_1.Pos.ADVERB;
                        }
                        else {
                            if (wordNode.getAttributeValue("pos") == "Noun") {
                                pos = Pos_1.Pos.NOUN;
                            }
                            else {
                                if (wordNode.getAttributeValue("pos") == "Verb") {
                                    pos = Pos_1.Pos.VERB;
                                }
                                else {
                                    pos = Pos_1.Pos.NOUN;
                                }
                            }
                        }
                    }
                    let rootList;
                    if (this.exceptionList.has(wordName)) {
                        rootList = this.exceptionList.get(wordName);
                    }
                    else {
                        rootList = new Array();
                    }
                    rootList.push(new ExceptionalWord_1.ExceptionalWord(wordName, rootForm, pos));
                    this.exceptionList.set(wordName, rootList);
                }
                wordNode = wordNode.getNextSibling();
            }
        }
        /**
         * Adds a specified literal to the literal list.
         *
         * @param literal literal to be added
         */
        addLiteralToLiteralList(literal) {
            let literals;
            if (this.literalList.has(literal.getName())) {
                literals = this.literalList.get(literal.getName());
            }
            else {
                literals = new Array();
            }
            literals.push(literal);
            this.literalList.set(literal.getName(), literals);
        }
        /**
         * Returns the locale.
         */
        getLocale() {
            return this.locale;
        }
        /**
         * Updates the wordnet according to the situation that an old synset replaced with a new synset. There are three
         * possibilities: (i) The new synset has a relation with the old synset, then the relation is removed,
         * (ii) A synset has the same type of relation with old synset and new synset, then the relation is removed,
         * (iii) None of the above, then the old synset id in the relation is replaced with the new synset id.
         * @param oldSynSet Old synset to be replaced
         * @param newSynSet New synset replacing the old synset
         */
        updateAllRelationsAccordingToNewSynSet(oldSynSet, newSynSet) {
            for (let synSet of this.getSynSetList()) {
                for (let i = 0; i < synSet.relationSize(); i++) {
                    if (synSet.getRelation(i) instanceof SemanticRelation_1.SemanticRelation) {
                        if (synSet.getRelation(i).getName() == oldSynSet.getId()) {
                            if (synSet.getId() == newSynSet.getId() || synSet.containsRelation(new SemanticRelation_1.SemanticRelation(newSynSet.getId(), synSet.getRelation(i).getRelationType()))) {
                                synSet.removeRelation(synSet.getRelation(i));
                                i--;
                            }
                            else {
                                synSet.getRelation(i).setName(newSynSet.getId());
                            }
                        }
                    }
                }
            }
        }
        /**
         * Returns the values of the SynSet list.
         *
         * @return values of the SynSet list
         */
        getSynSetList() {
            return this.synSetList.values();
        }
        /**
         * Returns the keys of the literal list.
         *
         * @return keys of the literal list
         */
        getLiteralList() {
            return this.literalList.keys();
        }
        /**
         * Adds specified SynSet to the SynSet list.
         *
         * @param synSet SynSet to be added
         */
        addSynSet(synSet) {
            this.synSetList.set(synSet.getId(), synSet);
        }
        /**
         * Removes specified SynSet from the SynSet list.
         *
         * @param synSet SynSet to be removed
         */
        removeSynSet(synSet) {
            this.synSetList.delete(synSet.getId());
        }
        /**
         * Removes specified SynSet from the SynSet list.
         *
         * @param synSet SynSet to be removed
         */
        removeSynSetWithRelations(synSet) {
            for (let i = 0; i < synSet.relationSize(); i++) {
                if (synSet.getRelation(i) instanceof SemanticRelation_1.SemanticRelation) {
                    let relation = synSet.getRelation(i);
                    this.removeReverseRelation(synSet, relation);
                }
            }
            this.synSetList.delete(synSet.getId());
        }
        /**
         * Changes ID of a specified SynSet with the specified new ID.
         *
         * @param synSet SynSet whose ID will be updated
         * @param newId  new ID
         */
        changeSynSetId(synSet, newId) {
            this.synSetList.delete(synSet.getId());
            synSet.setId(newId);
            this.synSetList.set(newId, synSet);
        }
        /**
         * Returns SynSet with the specified SynSet ID.
         *
         * @param synSetId ID of the SynSet to be returned
         * @return SynSet with the specified SynSet ID
         */
        getSynSetWithId(synSetId) {
            if (this.synSetList.has(synSetId)) {
                return this.synSetList.get(synSetId);
            }
            return undefined;
        }
        /**
         * Returns SynSet with the specified literal and sense index.
         *
         * @param literal SynSet literal
         * @param sense   SynSet's corresponding sense index
         * @return SynSet with the specified literal and sense index
         */
        getSynSetWithLiteral(literal, sense) {
            let literals = this.literalList.get(literal);
            if (literals != undefined) {
                for (let current of literals) {
                    if (current.getSense() == sense) {
                        return this.getSynSetWithId(current.getSynSetId());
                    }
                }
            }
            return undefined;
        }
        /**
         * Returns the number of SynSets with a specified literal.
         *
         * @param literal literal to be searched in SynSets
         * @return the number of SynSets with a specified literal
         */
        numberOfSynSetsWithLiteral(literal) {
            if (this.literalList.has(literal)) {
                return this.literalList.get(literal).length;
            }
            else {
                return 0;
            }
        }
        /**
         * Returns a list of SynSets with a specified part of speech tag.
         *
         * @param pos part of speech tag to be searched in SynSets
         * @return a list of SynSets with a specified part of speech tag
         */
        getSynSetsWithPartOfSpeech(pos) {
            let result = new Array();
            for (let synSet of this.synSetList.values()) {
                if (synSet.getPos() != undefined && synSet.getPos() == pos) {
                    result.push(synSet);
                }
            }
            return result;
        }
        /**
         * Returns a list of literals with a specified literal String.
         *
         * @param literal literal String to be searched in literal list
         * @return a list of literals with a specified literal String
         */
        getLiteralsWithName(literal) {
            if (this.literalList.has(literal)) {
                return this.literalList.get(literal);
            }
            else {
                return new Array();
            }
        }
        /**
         * Finds the SynSet with specified literal String and part of speech tag and adds to the given SynSet list.
         *
         * @param result  SynSet list to add the specified SynSet
         * @param literal literal String to be searched in literal list
         * @param pos     part of speech tag to be searched in SynSets
         */
        addSynSetsWithLiteralToList(result, literal, pos) {
            for (let current of this.literalList.get(literal)) {
                let synSet = this.getSynSetWithId(current.getSynSetId());
                if (synSet != null && synSet.getPos() == pos) {
                    result.push(synSet);
                }
            }
        }
        /**
         * Finds SynSets with specified literal String and adds to the newly created SynSet list.
         *
         * @param literal literal String to be searched in literal list
         * @return returns a list of SynSets with specified literal String
         */
        getSynSetsWithLiteral(literal) {
            let result = new Array();
            if (this.literalList.has(literal)) {
                for (let current of this.literalList.get(literal)) {
                    let synSet = this.getSynSetWithId(current.getSynSetId());
                    if (synSet != undefined) {
                        result.push(synSet);
                    }
                }
            }
            return result;
        }
        /**
         * Finds literals with specified literal String and adds to the newly created literal String list. Ex: cleanest - clean
         *
         * @param literal literal String to be searched in literal list
         * @return returns a list of literals with specified literal String
         */
        getLiteralsWithPossibleModifiedLiteral(literal) {
            let result = new Array();
            result.push(literal);
            let wordWithoutLastOne = literal.substring(0, literal.length - 1);
            let wordWithoutLastTwo = literal.substring(0, literal.length - 2);
            let wordWithoutLastThree = literal.substring(0, literal.length - 3);
            if (this.exceptionList.has(literal)) {
                for (let exceptionalWord of this.exceptionList.get(literal)) {
                    result.push(exceptionalWord.getRoot());
                }
            }
            if (literal.endsWith("s") && this.literalList.has(wordWithoutLastOne)) {
                result.push(wordWithoutLastOne);
            }
            if ((literal.endsWith("es") || literal.endsWith("ed") || literal.endsWith("er")) && this.literalList.has(wordWithoutLastTwo)) {
                result.push(wordWithoutLastTwo);
            }
            if (literal.endsWith("ed") && this.literalList.has(wordWithoutLastTwo + literal.charAt(literal.length - 3))) {
                result.push(wordWithoutLastTwo + literal.charAt(literal.length - 3));
            }
            if ((literal.endsWith("ed") || literal.endsWith("er")) && this.literalList.has(wordWithoutLastTwo + "e")) {
                result.push(wordWithoutLastTwo + "e");
            }
            if ((literal.endsWith("ing") || literal.endsWith("est")) && this.literalList.has(wordWithoutLastThree)) {
                result.push(wordWithoutLastThree);
            }
            if (literal.endsWith("ing") && this.literalList.has(wordWithoutLastThree + literal.charAt(literal.length - 4))) {
                result.push(wordWithoutLastThree + literal.charAt(literal.length - 4));
            }
            if ((literal.endsWith("ing") || literal.endsWith("est")) && this.literalList.has(wordWithoutLastThree + "e")) {
                result.push(wordWithoutLastThree + "e");
            }
            if (literal.endsWith("ies") && this.literalList.has(wordWithoutLastThree + "y")) {
                result.push(wordWithoutLastThree + "y");
            }
            return result;
        }
        /**
         * Finds SynSets with specified literal String and part of speech tag, then adds to the newly created SynSet list. Ex: cleanest - clean
         *
         * @param literal literal String to be searched in literal list
         * @param pos     part of speech tag to be searched in SynSets
         * @return returns a list of SynSets with specified literal String and part of speech tag
         */
        getSynSetsWithPossiblyModifiedLiteral(literal, pos) {
            let result = new Array();
            let modifiedLiterals = this.getLiteralsWithPossibleModifiedLiteral(literal);
            for (let modifiedLiteral of modifiedLiterals) {
                if (this.literalList.has(modifiedLiteral)) {
                    this.addSynSetsWithLiteralToList(result, modifiedLiteral, pos);
                }
            }
            return result;
        }
        /**
         * Adds the reverse relations to the SynSet.
         *
         * @param synSet           SynSet to add the reverse relations
         * @param semanticRelation relation whose reverse will be added
         */
        addReverseRelation(synSet, semanticRelation) {
            let otherSynSet = this.getSynSetWithId(semanticRelation.getName());
            if (otherSynSet != undefined && SemanticRelation_1.SemanticRelation.reverse(semanticRelation.getRelationType()) != undefined) {
                let otherRelation = new SemanticRelation_1.SemanticRelation(synSet.getId(), SemanticRelation_1.SemanticRelation.reverse(semanticRelation.getRelationType()));
                if (!otherSynSet.containsRelation(otherRelation)) {
                    otherSynSet.addRelation(otherRelation);
                }
            }
        }
        /**
         * Removes the reverse relations from the SynSet.
         *
         * @param synSet           SynSet to remove the reverse relation
         * @param semanticRelation relation whose reverse will be removed
         */
        removeReverseRelation(synSet, semanticRelation) {
            let otherSynSet = this.getSynSetWithId(semanticRelation.getName());
            if (otherSynSet != null && SemanticRelation_1.SemanticRelation.reverse(semanticRelation.getRelationType()) != undefined) {
                let otherRelation = new SemanticRelation_1.SemanticRelation(synSet.getId(), SemanticRelation_1.SemanticRelation.reverse(semanticRelation.getRelationType()));
                if (otherSynSet.containsRelation(otherRelation)) {
                    otherSynSet.removeRelation(otherRelation);
                }
            }
        }
        /**
         * Loops through the SynSet list and adds the possible reverse relations.
         */
        equalizeSemanticRelations() {
            for (let synSet of this.synSetList.values()) {
                for (let i = 0; i < synSet.relationSize(); i++) {
                    if (synSet.getRelation(i) instanceof SemanticRelation_1.SemanticRelation) {
                        let relation = synSet.getRelation(i);
                        this.addReverseRelation(synSet, relation);
                    }
                }
            }
        }
        /**
         * Appends the elements of the second array to the end of the first array.
         * @param result Array to be appended to.
         * @param toBeAdded Array to be appended.
         */
        static addAll(result, toBeAdded) {
            for (let literal of toBeAdded) {
                result.push(literal);
            }
        }
        /**
         * Appends the elements of the second array to the end of the first array.
         * @param result Array to be appended to.
         * @param toBeAdded Array to be appended.
         * */
        addAll(result, toBeAdded) {
            for (let synSet of toBeAdded) {
                result.push(synSet);
            }
        }
        /**
         * Creates a list of literals with a specified word, or possible words corresponding to morphological parse.
         *
         * @param word      literal String
         * @param parse     morphological parse to get possible words
         * @param metaParse metamorphic parse to get possible words
         * @param fsm       finite state machine morphological analyzer to be used at getting possible words
         * @return a list of literal
         */
        constructLiterals(word, parse, metaParse, fsm) {
            let result = new Array();
            if (parse.size() > 0) {
                if (!parse.isPunctuation() && !parse.isCardinal() && !parse.isReal()) {
                    let possibleWords = fsm.getPossibleWords(parse, metaParse);
                    for (let possibleWord of possibleWords) {
                        WordNet.addAll(result, this.getLiteralsWithName(possibleWord));
                    }
                }
                else {
                    WordNet.addAll(result, this.getLiteralsWithName(word));
                }
            }
            else {
                WordNet.addAll(result, this.getLiteralsWithName(word));
            }
            return result;
        }
        /**
         * Creates a list of SynSets with a specified word, or possible words corresponding to morphological parse.
         *
         * @param word      literal String  to get SynSets with
         * @param parse     morphological parse to get SynSets with proper literals
         * @param metaParse metamorphic parse to get possible words
         * @param fsm       finite state machine morphological analyzer to be used at getting possible words
         * @return a list of SynSets
         */
        constructSynSets(word, parse, metaParse, fsm) {
            let result = new Array();
            if (parse.size() > 0) {
                if (parse.isProperNoun()) {
                    result.push(this.getSynSetWithLiteral("(özel isim)", 1));
                }
                if (parse.isTime()) {
                    result.push(this.getSynSetWithLiteral("(zaman)", 1));
                }
                if (parse.isDate()) {
                    result.push(this.getSynSetWithLiteral("(tarih)", 1));
                }
                if (parse.isHashTag()) {
                    result.push(this.getSynSetWithLiteral("(hashtag)", 1));
                }
                if (parse.isEmail()) {
                    result.push(this.getSynSetWithLiteral("(eposta)", 1));
                }
                if (parse.isOrdinal()) {
                    result.push(this.getSynSetWithLiteral("(sayı sıra sıfatı)", 1));
                }
                if (parse.isPercent()) {
                    result.push(this.getSynSetWithLiteral("(yüzde)", 1));
                }
                if (parse.isFraction()) {
                    result.push(this.getSynSetWithLiteral("(kesir sayı)", 1));
                }
                if (parse.isRange()) {
                    result.push(this.getSynSetWithLiteral("(sayı aralığı)", 1));
                }
                if (parse.isReal()) {
                    result.push(this.getSynSetWithLiteral("(reel sayı)", 1));
                }
                if (!parse.isPunctuation() && !parse.isCardinal() && !parse.isReal()) {
                    let possibleWords = fsm.getPossibleWords(parse, metaParse);
                    for (let possibleWord of possibleWords) {
                        let synSets = this.getSynSetsWithLiteral(possibleWord);
                        if (synSets.length > 0) {
                            for (let synSet of synSets) {
                                if (synSet.getPos() != undefined && (parse.getPos() == "NOUN" || parse.getPos() == "ADVERB" || parse.getPos() == "VERB" || parse.getPos() == "ADJ" || parse.getPos() == "CONJ")) {
                                    if (synSet.getPos() == Pos_1.Pos.NOUN) {
                                        if (parse.getPos() == "NOUN" || parse.getRootPos() == "NOUN") {
                                            result.push(synSet);
                                        }
                                    }
                                    else {
                                        if (synSet.getPos() == Pos_1.Pos.ADVERB) {
                                            if (parse.getPos() == "ADVERB" || parse.getRootPos() == "ADVERB") {
                                                result.push(synSet);
                                            }
                                        }
                                        else {
                                            if (synSet.getPos() == Pos_1.Pos.VERB) {
                                                if (parse.getPos() == "VERB" || parse.getRootPos() == "VERB") {
                                                    result.push(synSet);
                                                }
                                            }
                                            else {
                                                if (synSet.getPos() == Pos_1.Pos.ADJECTIVE) {
                                                    if (parse.getPos() == "ADJ" || parse.getRootPos() == "ADJ") {
                                                        result.push(synSet);
                                                    }
                                                }
                                                else {
                                                    if (synSet.getPos() == Pos_1.Pos.CONJUNCTION) {
                                                        if (parse.getPos() == "CONJ" || parse.getRootPos() == "CONJ") {
                                                            result.push(synSet);
                                                        }
                                                    }
                                                    else {
                                                        result.push(synSet);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                else {
                                    result.push(synSet);
                                }
                            }
                        }
                    }
                    if (result.length == 0) {
                        for (let possibleWord of possibleWords) {
                            let synSets = this.getSynSetsWithLiteral(possibleWord);
                            this.addAll(result, synSets);
                        }
                    }
                }
                else {
                    this.addAll(result, this.getSynSetsWithLiteral(word));
                }
                if (parse.isCardinal() && result.length == 0) {
                    result.push(this.getSynSetWithLiteral("(tam sayı)", 1));
                }
            }
            else {
                this.addAll(result, this.getSynSetsWithLiteral(word));
            }
            return result;
        }
        /**
         * Returns a list of literals using 5 possible words gathered with the specified morphological parses and metamorphic parses.
         *
         * @param morphologicalParse1 morphological parse to get possible words
         * @param morphologicalParse2 morphological parse to get possible words
         * @param morphologicalParse3 morphological parse to get possible words
         * @param morphologicalParse4 morphological parse to get possible words
         * @param morphologicalParse5 morphological parse to get possible words
         * @param metaParse1          metamorphic parse to get possible words
         * @param metaParse2          metamorphic parse to get possible words
         * @param metaParse3          metamorphic parse to get possible words
         * @param metaParse4         metamorphic parse to get possible words
         * @param metaParse5         metamorphic parse to get possible words
         * @param fsm                 finite state machine morphological analyzer to be used at getting possible words
         * @return a list of literals
         */
        constructIdiomLiterals(fsm, morphologicalParse1, metaParse1, morphologicalParse2, metaParse2, morphologicalParse3, metaParse3, morphologicalParse4, metaParse4, morphologicalParse5, metaParse5) {
            let result = new Array();
            let possibleWords1 = fsm.getPossibleWords(morphologicalParse1, metaParse1);
            let possibleWords2 = fsm.getPossibleWords(morphologicalParse2, metaParse2);
            let possibleWords3, possibleWords4, possibleWords5;
            if (morphologicalParse3 != undefined) {
                possibleWords3 = fsm.getPossibleWords(morphologicalParse3, metaParse3);
            }
            if (morphologicalParse4 != undefined) {
                possibleWords4 = fsm.getPossibleWords(morphologicalParse4, metaParse4);
            }
            if (morphologicalParse5 != undefined) {
                possibleWords5 = fsm.getPossibleWords(morphologicalParse5, metaParse5);
            }
            if (morphologicalParse5 != undefined) {
                for (let possibleWord1 of possibleWords1) {
                    for (let possibleWord2 of possibleWords2) {
                        for (let possibleWord3 of possibleWords3) {
                            for (let possibleWord4 of possibleWords4) {
                                for (let possibleWord5 of possibleWords5) {
                                    WordNet.addAll(result, this.getLiteralsWithName(possibleWord1 + " " + possibleWord2 +
                                        " " + possibleWord3 + " " + possibleWord4 + " " + possibleWord5));
                                }
                            }
                        }
                    }
                }
            }
            else {
                if (morphologicalParse4 != undefined) {
                    for (let possibleWord1 of possibleWords1) {
                        for (let possibleWord2 of possibleWords2) {
                            for (let possibleWord3 of possibleWords3) {
                                for (let possibleWord4 of possibleWords4) {
                                    WordNet.addAll(result, this.getLiteralsWithName(possibleWord1 + " " + possibleWord2 +
                                        " " + possibleWord3 + " " + possibleWord4));
                                }
                            }
                        }
                    }
                }
                else {
                    if (morphologicalParse3 != undefined) {
                        for (let possibleWord1 of possibleWords1) {
                            for (let possibleWord2 of possibleWords2) {
                                for (let possibleWord3 of possibleWords3) {
                                    WordNet.addAll(result, this.getLiteralsWithName(possibleWord1 + " " + possibleWord2 +
                                        " " + possibleWord3));
                                }
                            }
                        }
                    }
                    else {
                        for (let possibleWord1 of possibleWords1) {
                            for (let possibleWord2 of possibleWords2) {
                                WordNet.addAll(result, this.getLiteralsWithName(possibleWord1 + " " + possibleWord2));
                            }
                        }
                    }
                }
            }
            return result;
        }
        /**
         * Returns a list of SynSets using 5 possible words gathered with the specified morphological parses and metamorphic parses.
         *
         * @param morphologicalParse1 morphological parse to get possible words
         * @param morphologicalParse2 morphological parse to get possible words
         * @param morphologicalParse3 morphological parse to get possible words
         * @param morphologicalParse4 morphological parse to get possible words
         * @param morphologicalParse5 morphological parse to get possible words
         * @param metaParse1          metamorphic parse to get possible words
         * @param metaParse2          metamorphic parse to get possible words
         * @param metaParse3          metamorphic parse to get possible words
         * @param metaParse4          metamorphic parse to get possible words
         * @param metaParse5          metamorphic parse to get possible words
         * @param fsm                 finite state machine morphological analyzer to be used at getting possible words
         * @return a list of SynSets
         */
        constructIdiomSynSets(fsm, morphologicalParse1, metaParse1, morphologicalParse2, metaParse2, morphologicalParse3, metaParse3, morphologicalParse4, metaParse4, morphologicalParse5, metaParse5) {
            let result = new Array();
            let possibleWords1 = fsm.getPossibleWords(morphologicalParse1, metaParse1);
            let possibleWords2 = fsm.getPossibleWords(morphologicalParse2, metaParse2);
            let possibleWords3, possibleWords4, possibleWords5;
            if (morphologicalParse3 != undefined) {
                possibleWords3 = fsm.getPossibleWords(morphologicalParse3, metaParse3);
            }
            if (morphologicalParse4 != undefined) {
                possibleWords4 = fsm.getPossibleWords(morphologicalParse4, metaParse4);
            }
            if (morphologicalParse5 != undefined) {
                possibleWords5 = fsm.getPossibleWords(morphologicalParse5, metaParse5);
            }
            if (morphologicalParse5 != undefined) {
                for (let possibleWord1 of possibleWords1) {
                    for (let possibleWord2 of possibleWords2) {
                        for (let possibleWord3 of possibleWords3) {
                            for (let possibleWord4 of possibleWords4) {
                                for (let possibleWord5 of possibleWords5) {
                                    if (this.numberOfSynSetsWithLiteral(possibleWord1 + " " + possibleWord2 + " " +
                                        possibleWord3 + " " + possibleWord4 + " " + possibleWord5) > 0) {
                                        this.addAll(result, this.getSynSetsWithLiteral(possibleWord1 + " " + possibleWord2 +
                                            " " + possibleWord3 + " " + possibleWord4 + " " + possibleWord5));
                                    }
                                }
                            }
                        }
                    }
                }
            }
            else {
                if (morphologicalParse4 != undefined) {
                    for (let possibleWord1 of possibleWords1) {
                        for (let possibleWord2 of possibleWords2) {
                            for (let possibleWord3 of possibleWords3) {
                                for (let possibleWord4 of possibleWords4) {
                                    if (this.numberOfSynSetsWithLiteral(possibleWord1 + " " + possibleWord2 + " " +
                                        possibleWord3 + " " + possibleWord4) > 0) {
                                        this.addAll(result, this.getSynSetsWithLiteral(possibleWord1 + " " + possibleWord2 +
                                            " " + possibleWord3 + " " + possibleWord4));
                                    }
                                }
                            }
                        }
                    }
                }
                else {
                    if (morphologicalParse3 != undefined) {
                        for (let possibleWord1 of possibleWords1) {
                            for (let possibleWord2 of possibleWords2) {
                                for (let possibleWord3 of possibleWords3) {
                                    if (this.numberOfSynSetsWithLiteral(possibleWord1 + " " + possibleWord2 + " " +
                                        possibleWord3) > 0) {
                                        this.addAll(result, this.getSynSetsWithLiteral(possibleWord1 + " " + possibleWord2 +
                                            " " + possibleWord3));
                                    }
                                }
                            }
                        }
                    }
                    else {
                        for (let possibleWord1 of possibleWords1) {
                            for (let possibleWord2 of possibleWords2) {
                                if (this.numberOfSynSetsWithLiteral(possibleWord1 + " " + possibleWord2) > 0) {
                                    this.addAll(result, this.getSynSetsWithLiteral(possibleWord1 + " " + possibleWord2));
                                }
                            }
                        }
                    }
                }
            }
            return result;
        }
        /**
         * Sorts definitions of SynSets in SynSet list according to their lengths.
         */
        sortDefinitions() {
            for (let synSet of this.getSynSetList()) {
                synSet.sortDefinitions();
            }
        }
        /**
         * Returns a list of SynSets with the interlingual relations of a specified SynSet ID.
         *
         * @param synSetId SynSet ID to be searched
         * @return a list of SynSets with the interlingual relations of a specified SynSet ID
         */
        getInterlingual(synSetId) {
            if (this.interlingualList.has(synSetId)) {
                return this.interlingualList.get(synSetId);
            }
            else {
                return new Array();
            }
        }
        /**
         * Returns the size of the SynSet list.
         *
         * @return the size of the SynSet list
         */
        size() {
            return this.synSetList.size;
        }
        /**
         * Conduct common operations between similarity metrics.
         *
         * @param pathToRootOfSynSet1 first list of Strings
         * @param pathToRootOfSynSet2 second list of Strings
         * @return path length
         */
        findPathLength(pathToRootOfSynSet1, pathToRootOfSynSet2) {
            for (let i = 0; i < pathToRootOfSynSet1.length; i++) {
                let foundIndex = pathToRootOfSynSet2.indexOf(pathToRootOfSynSet1[i]);
                if (foundIndex != -1) {
                    // Index of two lists - 1 is equal to path length. If there is not path, return -1
                    return i + foundIndex - 1;
                }
            }
            return -1;
        }
        /**
         * Returns the depth of path.
         *
         * @param pathToRootOfSynSet1 first list of Strings
         * @param pathToRootOfSynSet2 second list of Strings
         * @return LCS depth
         */
        findLCSdepth(pathToRootOfSynSet1, pathToRootOfSynSet2) {
            let temp = this.findLCS(pathToRootOfSynSet1, pathToRootOfSynSet2);
            if (temp != undefined) {
                return temp[1];
            }
            return -1;
        }
        /**
         * Returns the ID of LCS of path.
         *
         * @param pathToRootOfSynSet1 first list of Strings
         * @param pathToRootOfSynSet2 second list of Strings
         * @return LCS ID
         */
        findLCSid(pathToRootOfSynSet1, pathToRootOfSynSet2) {
            let temp = this.findLCS(pathToRootOfSynSet1, pathToRootOfSynSet2);
            if (temp != undefined) {
                return temp[0];
            }
            return undefined;
        }
        /**
         * Returns depth and ID of the LCS.
         *
         * @param pathToRootOfSynSet1 first list of Strings
         * @param pathToRootOfSynSet2 second list of Strings
         * @return depth and ID of the LCS
         */
        findLCS(pathToRootOfSynSet1, pathToRootOfSynSet2) {
            for (let i = 0; i < pathToRootOfSynSet1.length; i++) {
                let LCSid = pathToRootOfSynSet1[i];
                if (pathToRootOfSynSet2.indexOf(LCSid) != -1) {
                    return [LCSid, pathToRootOfSynSet1.length - i + 1];
                }
            }
            return undefined;
        }
        /**
         * Finds the path to the root node of a SynSets.
         *
         * @param synSet SynSet whose root path will be found
         * @return list of String corresponding to nodes in the path
         */
        findPathToRoot(synSet) {
            let pathToRoot = new Array();
            while (synSet != null) {
                if (pathToRoot.indexOf(synSet.getId()) != -1) {
                    break;
                }
                pathToRoot.push(synSet.getId());
                synSet = this.percolateUp(synSet);
            }
            return pathToRoot;
        }
        /**
         * Finds the parent of a node. It does not move until the root, instead it goes one level up.
         *
         * @param root SynSet whose parent will be find
         * @return parent SynSet
         */
        percolateUp(root) {
            for (let i = 0; i < root.relationSize(); i++) {
                let r = root.getRelation(i);
                if (r instanceof SemanticRelation_1.SemanticRelation) {
                    if (r.getRelationType() == SemanticRelationType_1.SemanticRelationType.HYPERNYM || r.getRelationType() == SemanticRelationType_1.SemanticRelationType.INSTANCE_HYPERNYM) {
                        root = this.getSynSetWithId(r.getName());
                        // return even if one hypernym is found.
                        return root;
                    }
                }
            }
            return undefined;
        }
    }
    exports.WordNet = WordNet;
});
//# sourceMappingURL=WordNet.js.map
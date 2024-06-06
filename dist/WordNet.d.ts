import { SynSet } from "./SynSet";
import { Literal } from "./Literal";
import { Pos } from "nlptoolkit-dictionary/dist/Dictionary/Pos";
import { SemanticRelation } from "./SemanticRelation";
import { MorphologicalParse } from "nlptoolkit-morphologicalanalysis/dist/MorphologicalAnalysis/MorphologicalParse";
import { MetamorphicParse } from "nlptoolkit-morphologicalanalysis/dist/MorphologicalAnalysis/MetamorphicParse";
import { FsmMorphologicalAnalyzer } from "nlptoolkit-morphologicalanalysis/dist/MorphologicalAnalysis/FsmMorphologicalAnalyzer";
export declare class WordNet {
    private synSetList;
    private literalList;
    private locale;
    private exceptionList;
    interlingualList: Map<string, Array<SynSet>>;
    /**
     * Reads a wordnet from a Xml file. A wordnet consists of a list of synsets encapsulated inside SYNSET tag. A synset
     * has an id (represented with ID tag), a set of literals encapsulated inside SYNONYM tag, part of speech tag
     * (represented with POS tag), a set of semantic relations encapsulated inside SR tag, a definition (represented
     * with DEF tag), and a possible example (represented with EXAMPLE tag). Each literal has a name, possibly a group
     * number (represented with GROUP tag), a sense number (represented with SENSE tag) and a set of semantic relations
     * encapsulated inside SR tag. A semantic relation has a name and a type (represented with TYPE tag).
     * @param fileName File stream that contains the wordnet.
     */
    constructor(fileName?: string, locale?: string);
    /**
     * Method constructs a DOM parser using the dtd/xml schema parser configuration and using this parser it
     * reads exceptions from file and puts to exceptionList HashMap.
     *
     * @param exceptionFileName exception file to be read
     */
    readExceptionFile(exceptionFileName: string): void;
    /**
     * Adds a specified literal to the literal list.
     *
     * @param literal literal to be added
     */
    addLiteralToLiteralList(literal: Literal): void;
    /**
     * Returns the locale.
     */
    getLocale(): string;
    /**
     * Updates the wordnet according to the situation that an old synset replaced with a new synset. There are three
     * possibilities: (i) The new synset has a relation with the old synset, then the relation is removed,
     * (ii) A synset has the same type of relation with old synset and new synset, then the relation is removed,
     * (iii) None of the above, then the old synset id in the relation is replaced with the new synset id.
     * @param oldSynSet Old synset to be replaced
     * @param newSynSet New synset replacing the old synset
     */
    private updateAllRelationsAccordingToNewSynSet;
    /**
     * Returns the values of the SynSet list.
     *
     * @return values of the SynSet list
     */
    getSynSetList(): IterableIterator<SynSet>;
    /**
     * Returns the keys of the literal list.
     *
     * @return keys of the literal list
     */
    getLiteralList(): IterableIterator<string>;
    /**
     * Adds specified SynSet to the SynSet list.
     *
     * @param synSet SynSet to be added
     */
    addSynSet(synSet: SynSet): void;
    /**
     * Removes specified SynSet from the SynSet list.
     *
     * @param synSet SynSet to be removed
     */
    removeSynSet(synSet: SynSet): void;
    /**
     * Removes specified SynSet from the SynSet list.
     *
     * @param synSet SynSet to be removed
     */
    removeSynSetWithRelations(synSet: SynSet): void;
    /**
     * Changes ID of a specified SynSet with the specified new ID.
     *
     * @param synSet SynSet whose ID will be updated
     * @param newId  new ID
     */
    changeSynSetId(synSet: SynSet, newId: string): void;
    /**
     * Returns SynSet with the specified SynSet ID.
     *
     * @param synSetId ID of the SynSet to be returned
     * @return SynSet with the specified SynSet ID
     */
    getSynSetWithId(synSetId: string): SynSet;
    /**
     * Returns SynSet with the specified literal and sense index.
     *
     * @param literal SynSet literal
     * @param sense   SynSet's corresponding sense index
     * @return SynSet with the specified literal and sense index
     */
    getSynSetWithLiteral(literal: string, sense: number): SynSet;
    /**
     * Returns the number of SynSets with a specified literal.
     *
     * @param literal literal to be searched in SynSets
     * @return the number of SynSets with a specified literal
     */
    numberOfSynSetsWithLiteral(literal: string): number;
    /**
     * Returns a list of SynSets with a specified part of speech tag.
     *
     * @param pos part of speech tag to be searched in SynSets
     * @return a list of SynSets with a specified part of speech tag
     */
    getSynSetsWithPartOfSpeech(pos: Pos): Array<SynSet>;
    /**
     * Returns a list of literals with a specified literal String.
     *
     * @param literal literal String to be searched in literal list
     * @return a list of literals with a specified literal String
     */
    getLiteralsWithName(literal: string): Array<Literal>;
    /**
     * Finds the SynSet with specified literal String and part of speech tag and adds to the given SynSet list.
     *
     * @param result  SynSet list to add the specified SynSet
     * @param literal literal String to be searched in literal list
     * @param pos     part of speech tag to be searched in SynSets
     */
    private addSynSetsWithLiteralToList;
    /**
     * Finds SynSets with specified literal String and adds to the newly created SynSet list.
     *
     * @param literal literal String to be searched in literal list
     * @return returns a list of SynSets with specified literal String
     */
    getSynSetsWithLiteral(literal: string): Array<SynSet>;
    /**
     * Finds literals with specified literal String and adds to the newly created literal String list. Ex: cleanest - clean
     *
     * @param literal literal String to be searched in literal list
     * @return returns a list of literals with specified literal String
     */
    getLiteralsWithPossibleModifiedLiteral(literal: string): Array<string>;
    /**
     * Finds SynSets with specified literal String and part of speech tag, then adds to the newly created SynSet list. Ex: cleanest - clean
     *
     * @param literal literal String to be searched in literal list
     * @param pos     part of speech tag to be searched in SynSets
     * @return returns a list of SynSets with specified literal String and part of speech tag
     */
    getSynSetsWithPossiblyModifiedLiteral(literal: string, pos: Pos): Array<SynSet>;
    /**
     * Adds the reverse relations to the SynSet.
     *
     * @param synSet           SynSet to add the reverse relations
     * @param semanticRelation relation whose reverse will be added
     */
    addReverseRelation(synSet: SynSet, semanticRelation: SemanticRelation): void;
    /**
     * Removes the reverse relations from the SynSet.
     *
     * @param synSet           SynSet to remove the reverse relation
     * @param semanticRelation relation whose reverse will be removed
     */
    removeReverseRelation(synSet: SynSet, semanticRelation: SemanticRelation): void;
    /**
     * Loops through the SynSet list and adds the possible reverse relations.
     */
    private equalizeSemanticRelations;
    /**
     * Appends the elements of the second array to the end of the first array.
     * @param result Array to be appended to.
     * @param toBeAdded Array to be appended.
     */
    private static addAll;
    /**
     * Appends the elements of the second array to the end of the first array.
     * @param result Array to be appended to.
     * @param toBeAdded Array to be appended.
     * */
    private addAll;
    /**
     * Creates a list of literals with a specified word, or possible words corresponding to morphological parse.
     *
     * @param word      literal String
     * @param parse     morphological parse to get possible words
     * @param metaParse metamorphic parse to get possible words
     * @param fsm       finite state machine morphological analyzer to be used at getting possible words
     * @return a list of literal
     */
    constructLiterals(word: string, parse: MorphologicalParse, metaParse: MetamorphicParse, fsm: FsmMorphologicalAnalyzer): Array<Literal>;
    /**
     * Creates a list of SynSets with a specified word, or possible words corresponding to morphological parse.
     *
     * @param word      literal String  to get SynSets with
     * @param parse     morphological parse to get SynSets with proper literals
     * @param metaParse metamorphic parse to get possible words
     * @param fsm       finite state machine morphological analyzer to be used at getting possible words
     * @return a list of SynSets
     */
    constructSynSets(word: string, parse: MorphologicalParse, metaParse: MetamorphicParse, fsm: FsmMorphologicalAnalyzer): Array<SynSet>;
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
    constructIdiomLiterals(fsm: FsmMorphologicalAnalyzer, morphologicalParse1: MorphologicalParse, metaParse1: MetamorphicParse, morphologicalParse2: MorphologicalParse, metaParse2: MetamorphicParse, morphologicalParse3?: MorphologicalParse, metaParse3?: MetamorphicParse, morphologicalParse4?: MorphologicalParse, metaParse4?: MetamorphicParse, morphologicalParse5?: MorphologicalParse, metaParse5?: MetamorphicParse): Array<Literal>;
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
    constructIdiomSynSets(fsm: FsmMorphologicalAnalyzer, morphologicalParse1: MorphologicalParse, metaParse1: MetamorphicParse, morphologicalParse2: MorphologicalParse, metaParse2: MetamorphicParse, morphologicalParse3?: MorphologicalParse, metaParse3?: MetamorphicParse, morphologicalParse4?: MorphologicalParse, metaParse4?: MetamorphicParse, morphologicalParse5?: MorphologicalParse, metaParse5?: MetamorphicParse): Array<SynSet>;
    /**
     * Sorts definitions of SynSets in SynSet list according to their lengths.
     */
    sortDefinitions(): void;
    /**
     * Returns a list of SynSets with the interlingual relations of a specified SynSet ID.
     *
     * @param synSetId SynSet ID to be searched
     * @return a list of SynSets with the interlingual relations of a specified SynSet ID
     */
    getInterlingual(synSetId: string): Array<SynSet>;
    /**
     * Returns the size of the SynSet list.
     *
     * @return the size of the SynSet list
     */
    size(): number;
    /**
     * Conduct common operations between similarity metrics.
     *
     * @param pathToRootOfSynSet1 first list of Strings
     * @param pathToRootOfSynSet2 second list of Strings
     * @return path length
     */
    findPathLength(pathToRootOfSynSet1: Array<string>, pathToRootOfSynSet2: Array<string>): number;
    /**
     * Returns the depth of path.
     *
     * @param pathToRootOfSynSet1 first list of Strings
     * @param pathToRootOfSynSet2 second list of Strings
     * @return LCS depth
     */
    findLCSdepth(pathToRootOfSynSet1: Array<string>, pathToRootOfSynSet2: Array<string>): number;
    /**
     * Returns the ID of LCS of path.
     *
     * @param pathToRootOfSynSet1 first list of Strings
     * @param pathToRootOfSynSet2 second list of Strings
     * @return LCS ID
     */
    findLCSid(pathToRootOfSynSet1: Array<string>, pathToRootOfSynSet2: Array<string>): string;
    /**
     * Returns depth and ID of the LCS.
     *
     * @param pathToRootOfSynSet1 first list of Strings
     * @param pathToRootOfSynSet2 second list of Strings
     * @return depth and ID of the LCS
     */
    findLCS(pathToRootOfSynSet1: Array<string>, pathToRootOfSynSet2: Array<string>): [string, number];
    /**
     * Finds the path to the root node of a SynSets.
     *
     * @param synSet SynSet whose root path will be found
     * @return list of String corresponding to nodes in the path
     */
    findPathToRoot(synSet: SynSet): Array<string>;
    /**
     * Finds the parent of a node. It does not move until the root, instead it goes one level up.
     *
     * @param root SynSet whose parent will be find
     * @return parent SynSet
     */
    percolateUp(root: SynSet): SynSet;
}

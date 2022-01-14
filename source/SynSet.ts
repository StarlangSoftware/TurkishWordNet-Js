import {Pos} from "nlptoolkit-dictionary/dist/Dictionary/Pos";
import {Synonym} from "./Synonym";
import {Relation} from "./Relation";
import {
    FsmMorphologicalAnalyzer
} from "nlptoolkit-morphologicalanalysis/dist/MorphologicalAnalysis/FsmMorphologicalAnalyzer";
import {TurkishSplitter} from "nlptoolkit-corpus/dist/TurkishSplitter";
import {Literal} from "./Literal";
import {SemanticRelationType} from "./SemanticRelationType";
import {SemanticRelation} from "./SemanticRelation";

export class SynSet {

    private id: string
    private pos: Pos
    private definition: Array<string> = undefined
    private example: string = undefined
    private synonym: Synonym = new Synonym()
    private relations: Array<Relation> = new Array<Relation>()
    private note: string
    private wikiPage: string = undefined
    private bcs: number

    /**
     * Constructor initialize SynSet ID, synonym and relations list.
     *
     * @param id Synset ID
     */
    constructor(id: string) {
        this.id = id
    }

    /**
     * Accessor for the SynSet ID.
     *
     * @return SynSet ID
     */
    getId(): string{
        return this.id
    }

    /**
     * Mutator method for the SynSet ID.
     *
     * @param id SynSet ID to be set
     */
    setId(id: string){
        this.id = id;
        for (let i = 0; i < this.synonym.literalSize(); i++) {
            this.synonym.getLiteral(i).setSynSetId(id);
        }
    }

    /**
     * Mutator method for the definition.
     *
     * @param definition String definition
     */
    setDefinition(definition: string){
        this.definition = definition.split("|")
    }

    /**
     * Removes the specified definition from long definition.
     *
     * @param definition definition to be removed
     */
    removeDefinition(definition: string){
        let longDefinition = this.getLongDefinition();
        if (longDefinition.startsWith(definition + "|")) {
            this.setDefinition(longDefinition.replace(definition + "|", ""));
        } else {
            if (longDefinition.endsWith("|" + definition)) {
                this.setDefinition(longDefinition.replace("|" + definition, ""));
            } else {
                if (longDefinition.includes("|" + definition + "|")) {
                    this.setDefinition(longDefinition.replace("|" + definition, ""));
                }
            }
        }
    }

    /**
     * Returns the first literal's name.
     *
     * @return the first literal's name.
     */
    representative(): string{
        return this.getSynonym().getLiteral(0).getName();
    }

    /**
     * Returns all the definitions in the list.
     *
     * @return all the definitions
     */
    getLongDefinition(): string{
        if (this.definition != undefined) {
            let longDefinition = this.definition[0];
            for (let i = 1; i < this.definition.length; i++) {
                longDefinition = longDefinition + "|" + this.definition[i];
            }
            return longDefinition;
        } else {
            return undefined;
        }
    }

    /**
     * Sorts definitions list according to their lengths.
     */
    sortDefinitions(){
        if (this.definition != undefined) {
            for (let i = 0; i < this.definition.length; i++) {
                for (let j = i + 1; j < this.definition.length; j++) {
                    if (this.definition[i].length < this.definition[j].length) {
                        let tmp = this.definition[i];
                        this.definition[i] = this.definition[j];
                        this.definition[j] = tmp;
                    }
                }
            }
        }
    }

    /**
     * Accessor for the definition at specified index.
     *
     * @param index definition index to be accessed
     * @return definition at specified index
     */
    getDefinition(index?: number): string{
        if (index == undefined){
            if (this.definition != undefined) {
                return this.definition[0];
            } else {
                return undefined;
            }
        } else {
            if (index < this.definition.length && index >= 0) {
                return this.definition[index];
            } else {
                return undefined;
            }
        }
    }

    /**
     * Returns number of definitions in the list.
     *
     * @return number of definitions in the list.
     */
    numberOfDefinitions(): number{
        if (this.definition != undefined) {
            return this.definition.length;
        } else {
            return 0;
        }
    }

    /**
     * Mutator for the example.
     *
     * @param example String that will be used to set
     */
    setExample(example: string){
        this.example = example
    }

    /**
     * Accessor for the example.
     *
     * @return String example
     */
    getExample(): string{
        return this.example
    }

    /**
     * Returns modified version of the original example sentence where the original
     * literal of the synSet is replaced with newLiteral.
     * @param newLiteral New literal.
     * @param fsm Morphological analyzer.
     * @return Modified version of the original sentence.
     */
    getModifiedExample(newLiteral: string, fsm: FsmMorphologicalAnalyzer): string{
        let s = new TurkishSplitter();
        let newExampleSentence = s.split(this.example)[0];
        if (this.getPos() == Pos.VERB){
            newLiteral = newLiteral.substring(0, newLiteral.length - 3);
        }
        let parseList = fsm.morphologicalAnalysisFromSentence(newExampleSentence);
        for (let k = 0; k < this.synonym.literalSize(); k++){
            let searchedLiteral = this.synonym.getLiteral(k).getName();
            if (this.getPos() == Pos.VERB){
                searchedLiteral = searchedLiteral.substring(0, searchedLiteral.length - 3);
            }
            let lastWord
            if (searchedLiteral.includes(" ")){
                lastWord = searchedLiteral.split(" ")[searchedLiteral.split(" ").length - 1];
            } else {
                lastWord = searchedLiteral;
            }
            for (let fsmParseList of parseList) {
                if (fsmParseList.size() > 0 && fsmParseList.getFsmParse(0).getSurfaceForm() == lastWord){
                    return fsm.replaceWord(newExampleSentence, searchedLiteral, newLiteral).toString();
                }
                for (let j = 0; j < fsmParseList.size(); j++) {
                    if (fsmParseList.getFsmParse(j).getWord().getName() == lastWord) {
                        return fsm.replaceWord(newExampleSentence, searchedLiteral, newLiteral).toString();
                    }
                }
            }
        }
        return this.example;
    }

    /**
     * Mutator for the bcs value which enables the connection with the BalkaNet.
     *
     * @param bcs bcs value
     */
    setBcs(bcs: number){
        if (bcs >= 1 && bcs <= 3){
            this.bcs = bcs
        }
    }

    /**
     * Accessor for the bcs value
     *
     * @return bcs value
     */
    getBcs(): number{
        return this.bcs
    }

    /**
     * Mutator for the part of speech tags.
     *
     * @param pos part of speech tag
     */
    setPos(pos: Pos){
        this.pos = pos
    }

    /**
     * Accessor for the part of speech tag.
     *
     * @return part of speech tag
     */
    getPos(): Pos{
        return this.pos
    }

    /**
     * Mutator for the available notes.
     *
     * @param note String note to be set
     */
    setNote(note: string){
        this.note = note
    }

    /**
     * Accessor for the available notes.
     *
     * @return String note
     */
    getNote(): string{
        return this.note
    }

    /**
     * Mutator for the wiki pages.
     *
     * @param wikiPage String wiki page
     */
    setWikiPage(wikiPage: string){
        this.wikiPage = wikiPage
    }

    /**
     * Accessor for the wiki page.
     *
     * @return String wiki page
     */
    getWikiPage(): string{
        return this.wikiPage
    }

    /**
     * Appends the specified Relation to the end of relations list.
     *
     * @param relation element to be appended to the list
     */
    addRelation(relation: Relation){
        this.relations.push(relation)
    }

    /**
     * Removes the first occurrence of the specified element from relations list,
     * if it is present. If the list does not contain the element, it stays unchanged.
     *
     * @param relation element to be removed from the list, if present
     */
    removeRelation(relation: any){
        if (relation instanceof Relation){
            this.relations.splice(this.relations.indexOf(relation), 1)
        } else {
            for (let i = 0; i < this.relations.length; i++) {
                if (this.relations[i].getName() == relation) {
                    this.relations.splice(i, 1);
                    break;
                }
            }
        }
    }

    /**
     * Returns the element at the specified position in relations list.
     *
     * @param index index of the element to return
     * @return the element at the specified position in the list
     */
    getRelation(index: number): Relation{
        return this.relations[index]
    }

    /**
     * Returns the size of the relations list.
     *
     * @return the size of the relations list
     */
    relationSize(): number{
        return this.relations.length
    }

    /**
     * Adds a specified literal to the synonym.
     *
     * @param literal literal to be added
     */
    addLiteral(literal: Literal){
        this.synonym.addLiteral(literal)
    }

    /**
     * Accessor for the synonym.
     *
     * @return synonym
     */
    getSynonym(): Synonym{
        return this.synonym
    }

    /**
     * Compares literals of synonym and the specified SynSet, returns true if their have same literals.
     *
     * @param synSet SynSet to compare
     * @return true if SynSets have same literals, false otherwise
     */
    containsSameLiteral(synSet: SynSet): boolean{
        for (let i = 0; i < this.synonym.literalSize(); i++) {
            let literal1 = this.synonym.getLiteral(i).getName();
            for (let j = 0; j < synSet.getSynonym().literalSize(); j++) {
                let literal2 = synSet.getSynonym().getLiteral(j).getName();
                if (literal1 == literal2) {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * Returns true if relations list contains the specified relation.
     *
     * @param relation element whose presence in the list is to be tested
     * @return true if the list contains the specified element
     */
    containsRelation(relation: Relation): boolean{
        return this.relations.indexOf(relation) != -1;
    }

    /**
     * Returns true if specified semantic relation type presents in the relations list.
     *
     * @param semanticRelationType element whose presence in the list is to be tested
     * @return true if specified semantic relation type presents in the relations list
     */
    containsRelationType(semanticRelationType: SemanticRelationType): boolean{
        for (let relation of this.relations) {
            if (relation instanceof SemanticRelation && (<SemanticRelation> relation).getRelationType() == semanticRelationType) {
                return true;
            }
        }
        return false;
    }

    /**
     * Merges synonym and a specified SynSet with their definitions, relations, part of speech tags and examples.
     *
     * @param synSet SynSet to be merged
     */
    mergeSynSet(synSet: SynSet){
        for (let i = 0; i < synSet.getSynonym().literalSize(); i++) {
            if (!this.synonym.contains(synSet.getSynonym().getLiteral(i))) {
                this.synonym.addLiteral(synSet.getSynonym().getLiteral(i));
            }
        }
        if (this.definition == undefined && synSet.getDefinition() != undefined) {
            this.setDefinition(synSet.getDefinition());
        } else {
            if (this.definition != undefined && synSet.getDefinition() != null && this.getLongDefinition() != synSet.getLongDefinition()) {
                this.setDefinition(this.getLongDefinition() + "|" + synSet.getLongDefinition());
            }
        }
        if (synSet.relationSize() != 0) {
            for (let i = 0; i < synSet.relationSize(); i++) {
                if (!this.containsRelation(synSet.getRelation(i)) && synSet.getRelation(i).getName() != this.id) {
                    this.addRelation(synSet.getRelation(i));
                }
            }
        }
        if (this.pos == undefined && synSet.getPos() != undefined) {
            this.setPos(synSet.getPos());
        }
        if (this.example == undefined && synSet.getExample() != undefined) {
            this.example = synSet.getExample();
        }
    }

    /**
     * Overridden toString method to print the first definition or representative.
     *
     * @return print the first definition or representative.
     */
    toString(): string{
        if (this.definition != undefined) {
            return this.definition[0];
        } else {
            return this.representative();
        }
    }
}
import { Pos } from "nlptoolkit-dictionary/dist/Dictionary/Pos";
import { Synonym } from "./Synonym";
import { Relation } from "./Relation";
import { FsmMorphologicalAnalyzer } from "nlptoolkit-morphologicalanalysis/dist/MorphologicalAnalysis/FsmMorphologicalAnalyzer";
import { Literal } from "./Literal";
import { SemanticRelationType } from "./SemanticRelationType";
export declare class SynSet {
    private id;
    private pos;
    private definition;
    private example;
    private synonym;
    private relations;
    private note;
    private bcs;
    /**
     * Constructor initialize SynSet ID, synonym and relations list.
     *
     * @param id Synset ID
     */
    constructor(id: string);
    /**
     * Accessor for the SynSet ID.
     *
     * @return SynSet ID
     */
    getId(): string;
    /**
     * Mutator method for the SynSet ID.
     *
     * @param id SynSet ID to be set
     */
    setId(id: string): void;
    /**
     * Mutator method for the definition.
     *
     * @param definition String definition
     */
    setDefinition(definition: string): void;
    /**
     * Removes the specified definition from long definition.
     *
     * @param definition definition to be removed
     */
    removeDefinition(definition: string): void;
    /**
     * Returns the first literal's name.
     *
     * @return the first literal's name.
     */
    representative(): string;
    /**
     * Returns all the definitions in the list.
     *
     * @return all the definitions
     */
    getLongDefinition(): string;
    /**
     * Sorts definitions list according to their lengths.
     */
    sortDefinitions(): void;
    /**
     * Accessor for the definition at specified index.
     *
     * @param index definition index to be accessed
     * @return definition at specified index
     */
    getDefinition(index?: number): string;
    /**
     * Returns number of definitions in the list.
     *
     * @return number of definitions in the list.
     */
    numberOfDefinitions(): number;
    /**
     * Mutator for the example.
     *
     * @param example String that will be used to set
     */
    setExample(example: string): void;
    /**
     * Accessor for the example.
     *
     * @return String example
     */
    getExample(): string;
    /**
     * Returns modified version of the original example sentence where the original
     * literal of the synSet is replaced with newLiteral.
     * @param newLiteral New literal.
     * @param fsm Morphological analyzer.
     * @return Modified version of the original sentence.
     */
    getModifiedExample(newLiteral: string, fsm: FsmMorphologicalAnalyzer): string;
    /**
     * Mutator for the bcs value which enables the connection with the BalkaNet.
     *
     * @param bcs bcs value
     */
    setBcs(bcs: number): void;
    /**
     * Accessor for the bcs value
     *
     * @return bcs value
     */
    getBcs(): number;
    /**
     * Mutator for the part of speech tags.
     *
     * @param pos part of speech tag
     */
    setPos(pos: Pos): void;
    /**
     * Accessor for the part of speech tag.
     *
     * @return part of speech tag
     */
    getPos(): Pos;
    /**
     * Mutator for the available notes.
     *
     * @param note String note to be set
     */
    setNote(note: string): void;
    /**
     * Accessor for the available notes.
     *
     * @return String note
     */
    getNote(): string;
    /**
     * Appends the specified Relation to the end of relations list.
     *
     * @param relation element to be appended to the list
     */
    addRelation(relation: Relation): void;
    /**
     * Removes the first occurrence of the specified element from relations list,
     * if it is present. If the list does not contain the element, it stays unchanged.
     *
     * @param relation element to be removed from the list, if present
     */
    removeRelation(relation: any): void;
    /**
     * Returns the element at the specified position in relations list.
     *
     * @param index index of the element to return
     * @return the element at the specified position in the list
     */
    getRelation(index: number): Relation;
    /**
     * Returns the size of the relations list.
     *
     * @return the size of the relations list
     */
    relationSize(): number;
    /**
     * Adds a specified literal to the synonym.
     *
     * @param literal literal to be added
     */
    addLiteral(literal: Literal): void;
    /**
     * Accessor for the synonym.
     *
     * @return synonym
     */
    getSynonym(): Synonym;
    /**
     * Compares literals of synonym and the specified SynSet, returns true if their have same literals.
     *
     * @param synSet SynSet to compare
     * @return true if SynSets have same literals, false otherwise
     */
    containsSameLiteral(synSet: SynSet): boolean;
    /**
     * Returns true if relations list contains the specified relation.
     *
     * @param relation element whose presence in the list is to be tested
     * @return true if the list contains the specified element
     */
    containsRelation(relation: Relation): boolean;
    /**
     * Returns true if specified semantic relation type presents in the relations list.
     *
     * @param semanticRelationType element whose presence in the list is to be tested
     * @return true if specified semantic relation type presents in the relations list
     */
    containsRelationType(semanticRelationType: SemanticRelationType): boolean;
    /**
     * Merges synonym and a specified SynSet with their definitions, relations, part of speech tags and examples.
     *
     * @param synSet SynSet to be merged
     */
    mergeSynSet(synSet: SynSet): void;
    /**
     * Overridden toString method to print the first definition or representative.
     *
     * @return print the first definition or representative.
     */
    toString(): string;
}

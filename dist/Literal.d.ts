import { Relation } from "./Relation";
import { SemanticRelationType } from "./SemanticRelationType";
export declare class Literal {
    protected name: string;
    protected sense: number;
    protected synSetId: string;
    protected origin: string;
    protected relations: Array<Relation>;
    /**
     * A constructor that initializes name, sense, SynSet ID and the relations.
     *
     * @param name     name of a literal
     * @param sense    index of sense
     * @param synSetId ID of the SynSet
     */
    constructor(name: string, sense: number, synSetId: string);
    /**
     * Accessor method to return SynSet ID.
     *
     * @return String of SynSet ID
     */
    getSynSetId(): string;
    /**
     * Accessor method to return name of the literal.
     *
     * @return name of the literal
     */
    getName(): string;
    /**
     * Accessor method to return the index of sense of the literal.
     *
     * @return index of sense of the literal
     */
    getSense(): number;
    /**
     * Accessor method to return the origin of the literal.
     *
     * @return origin of the literal
     */
    getOrigin(): string;
    /**
     * Mutator method to set the origin with specified origin.
     *
     * @param origin origin of the literal to set
     */
    setOrigin(origin: string): void;
    /**
     * Mutator method to set the sense index of the literal.
     *
     * @param sense sense index of the literal to set
     */
    setSense(sense: number): void;
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
    removeRelation(relation: Relation): void;
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
     * Returns the element at the specified position in relations list.
     *
     * @param index index of the element to return
     * @return the element at the specified position in the list
     */
    getRelation(index: number): Relation;
    /**
     * Returns size of relations list.
     *
     * @return the size of the list
     */
    relationSize(): number;
    /**
     * Mutator method to set name of a literal.
     *
     * @param name name of the literal to set
     */
    setName(name: string): void;
    /**
     * Mutator method to set SynSet ID of a literal.
     *
     * @param synSetId SynSet ID of the literal to set
     */
    setSynSetId(synSetId: string): void;
    /**
     * Overridden toString method to print names and sense of literals.
     *
     * @return concatenated names and senses of literals
     */
    toString(): string;
}

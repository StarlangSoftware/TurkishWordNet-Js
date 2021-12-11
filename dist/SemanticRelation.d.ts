import { Relation } from "./Relation";
import { SemanticRelationType } from "./SemanticRelationType";
export declare class SemanticRelation extends Relation {
    private relationType;
    private _toIndex;
    static semanticDependency: string[];
    static semanticDependencyTags: SemanticRelationType[];
    /**
     * Accessor to retrieve semantic relation type given a specific semantic dependency tag.
     *
     * @param tag String semantic dependency tag
     * @return semantic relation type
     */
    static getSemanticTag(tag: string): SemanticRelationType;
    /**
     * Returns the reverse of a specific semantic relation type.
     *
     * @param semanticRelationType semantic relation type to be reversed
     * @return reversed version of the semantic relation type
     */
    static reverse(semanticRelationType: SemanticRelationType): SemanticRelationType;
    /**
     * Another constructor that initializes relation type, relation name, and the index.
     *
     * @param name         name of the relation
     * @param relationType String semantic dependency tag
     * @param toIndex      index of the relation
     */
    constructor(name: string, relationType: any, toIndex?: number);
    /**
     * Returns the index value.
     *
     * @return index value.
     */
    toIndex(): number;
    /**
     * Accessor for the semantic relation type.
     *
     * @return semantic relation type
     */
    getRelationType(): SemanticRelationType;
    /**
     * Mutator for the semantic relation type.
     *
     * @param relationType semantic relation type.
     */
    setRelationType(relationType: SemanticRelationType): void;
    /**
     * Accessor method to retrieve the semantic relation type as a String.
     *
     * @return String semantic relation type
     */
    getTypeAsString(): string;
    /**
     * Overridden toString method to print semantic relation types and names.
     *
     * @return semantic relation types and names
     */
    toString(): string;
}

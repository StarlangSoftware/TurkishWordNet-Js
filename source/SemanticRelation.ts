import {Relation} from "./Relation";
import {SemanticRelationType} from "./SemanticRelationType";

export class SemanticRelation extends Relation{

    private relationType: SemanticRelationType = undefined
    private _toIndex: number = 0

    static semanticDependency = ["ANTONYM", "HYPERNYM",
        "INSTANCE_HYPERNYM", "HYPONYM", "INSTANCE_HYPONYM", "MEMBER_HOLONYM", "SUBSTANCE_HOLONYM",
        "PART_HOLONYM", "MEMBER_MERONYM", "SUBSTANCE_MERONYM", "PART_MERONYM", "ATTRIBUTE",
        "DERIVATION_RELATED", "DOMAIN_TOPIC", "MEMBER_TOPIC", "DOMAIN_REGION", "MEMBER_REGION",
        "DOMAIN_USAGE", "MEMBER_USAGE", "ENTAILMENT", "CAUSE", "ALSO_SEE",
        "VERB_GROUP", "SIMILAR_TO", "PARTICIPLE_OF_VERB"];

    static semanticDependencyTags = [SemanticRelationType.ANTONYM, SemanticRelationType.HYPERNYM,
        SemanticRelationType.INSTANCE_HYPERNYM, SemanticRelationType.HYPONYM, SemanticRelationType.INSTANCE_HYPONYM, SemanticRelationType.MEMBER_HOLONYM, SemanticRelationType.SUBSTANCE_HOLONYM,
        SemanticRelationType.PART_HOLONYM, SemanticRelationType.MEMBER_MERONYM, SemanticRelationType.SUBSTANCE_MERONYM, SemanticRelationType.PART_MERONYM, SemanticRelationType.ATTRIBUTE,
        SemanticRelationType.DERIVATION_RELATED, SemanticRelationType.DOMAIN_TOPIC, SemanticRelationType.MEMBER_TOPIC, SemanticRelationType.DOMAIN_REGION, SemanticRelationType.MEMBER_REGION,
        SemanticRelationType.DOMAIN_USAGE, SemanticRelationType.MEMBER_USAGE, SemanticRelationType.ENTAILMENT, SemanticRelationType.CAUSE, SemanticRelationType.ALSO_SEE,
        SemanticRelationType.VERB_GROUP, SemanticRelationType.SIMILAR_TO, SemanticRelationType.PARTICIPLE_OF_VERB];

    /**
     * Accessor to retrieve semantic relation type given a specific semantic dependency tag.
     *
     * @param tag String semantic dependency tag
     * @return semantic relation type
     */
    static getSemanticTag(tag: string): SemanticRelationType{
        for (let j = 0; j < SemanticRelation.semanticDependencyTags.length; j++) {
            if (tag.toUpperCase() == SemanticRelation.semanticDependency[j]) {
                return SemanticRelation.semanticDependencyTags[j];
            }
        }
        return undefined;
    }

    /**
     * Returns the reverse of a specific semantic relation type.
     *
     * @param semanticRelationType semantic relation type to be reversed
     * @return reversed version of the semantic relation type
     */
    static reverse(semanticRelationType: SemanticRelationType): SemanticRelationType{
        switch (semanticRelationType) {
            case SemanticRelationType.HYPERNYM:
                return SemanticRelationType.HYPONYM;
            case SemanticRelationType.HYPONYM:
                return SemanticRelationType.HYPERNYM;
            case SemanticRelationType.ANTONYM:
                return SemanticRelationType.ANTONYM;
            case SemanticRelationType.INSTANCE_HYPERNYM:
                return SemanticRelationType.INSTANCE_HYPONYM;
            case SemanticRelationType.INSTANCE_HYPONYM:
                return SemanticRelationType.INSTANCE_HYPERNYM;
            case SemanticRelationType.MEMBER_HOLONYM:
                return SemanticRelationType.MEMBER_MERONYM;
            case SemanticRelationType.MEMBER_MERONYM:
                return SemanticRelationType.MEMBER_HOLONYM;
            case SemanticRelationType.PART_MERONYM:
                return SemanticRelationType.PART_HOLONYM;
            case SemanticRelationType.PART_HOLONYM:
                return SemanticRelationType.PART_MERONYM;
            case SemanticRelationType.SUBSTANCE_MERONYM:
                return SemanticRelationType.SUBSTANCE_HOLONYM;
            case SemanticRelationType.SUBSTANCE_HOLONYM:
                return SemanticRelationType.SUBSTANCE_MERONYM;
            case SemanticRelationType.DOMAIN_TOPIC:
                return SemanticRelationType.MEMBER_TOPIC;
            case SemanticRelationType.MEMBER_TOPIC:
                return SemanticRelationType.DOMAIN_TOPIC;
            case SemanticRelationType.DOMAIN_REGION:
                return SemanticRelationType.MEMBER_REGION;
            case SemanticRelationType.MEMBER_REGION:
                return SemanticRelationType.DOMAIN_REGION;
            case SemanticRelationType.DOMAIN_USAGE:
                return SemanticRelationType.MEMBER_USAGE;
            case SemanticRelationType.MEMBER_USAGE:
                return SemanticRelationType.DOMAIN_USAGE;
            case SemanticRelationType.DERIVATION_RELATED:
                return SemanticRelationType.DERIVATION_RELATED;
        }
        return undefined;
    }

    /**
     * Another constructor that initializes relation type, relation name, and the index.
     *
     * @param name         name of the relation
     * @param relationType String semantic dependency tag
     * @param toIndex      index of the relation
     */
    constructor(name: string, relationType: any, toIndex?: number) {
        super(name);
        if (typeof(relationType) === "string"){
            this.relationType = SemanticRelation.getSemanticTag(relationType)
        } else {
            this.relationType = relationType
        }
        if (toIndex != undefined){
            this._toIndex = toIndex
        }
    }

    /**
     * Returns the index value.
     *
     * @return index value.
     */
    toIndex(): number{
        return this._toIndex
    }

    /**
     * Accessor for the semantic relation type.
     *
     * @return semantic relation type
     */
    getRelationType(): SemanticRelationType{
        return this.relationType
    }

    /**
     * Mutator for the semantic relation type.
     *
     * @param relationType semantic relation type.
     */
    setRelationType(relationType: SemanticRelationType){
        this.relationType = relationType
    }

    /**
     * Accessor method to retrieve the semantic relation type as a String.
     *
     * @return String semantic relation type
     */
    getTypeAsString(): string{
        if (this.relationType != undefined) {
            return SemanticRelation.semanticDependency[this.relationType];
        } else {
            return undefined;
        }
    }

    /**
     * Overridden toString method to print semantic relation types and names.
     *
     * @return semantic relation types and names
     */
    toString(): string{
        return this.getTypeAsString() + "->" + this.name;
    }
}
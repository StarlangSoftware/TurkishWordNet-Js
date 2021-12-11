(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./Relation", "./SemanticRelationType"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SemanticRelation = void 0;
    const Relation_1 = require("./Relation");
    const SemanticRelationType_1 = require("./SemanticRelationType");
    class SemanticRelation extends Relation_1.Relation {
        /**
         * Another constructor that initializes relation type, relation name, and the index.
         *
         * @param name         name of the relation
         * @param relationType String semantic dependency tag
         * @param toIndex      index of the relation
         */
        constructor(name, relationType, toIndex) {
            super(name);
            this.relationType = undefined;
            this._toIndex = 0;
            if (typeof (relationType) === "string") {
                this.relationType = SemanticRelation.getSemanticTag(relationType);
            }
            else {
                this.relationType = relationType;
            }
            if (toIndex != undefined) {
                this._toIndex = toIndex;
            }
        }
        /**
         * Accessor to retrieve semantic relation type given a specific semantic dependency tag.
         *
         * @param tag String semantic dependency tag
         * @return semantic relation type
         */
        static getSemanticTag(tag) {
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
        static reverse(semanticRelationType) {
            switch (semanticRelationType) {
                case SemanticRelationType_1.SemanticRelationType.HYPERNYM:
                    return SemanticRelationType_1.SemanticRelationType.HYPONYM;
                case SemanticRelationType_1.SemanticRelationType.HYPONYM:
                    return SemanticRelationType_1.SemanticRelationType.HYPERNYM;
                case SemanticRelationType_1.SemanticRelationType.ANTONYM:
                    return SemanticRelationType_1.SemanticRelationType.ANTONYM;
                case SemanticRelationType_1.SemanticRelationType.INSTANCE_HYPERNYM:
                    return SemanticRelationType_1.SemanticRelationType.INSTANCE_HYPONYM;
                case SemanticRelationType_1.SemanticRelationType.INSTANCE_HYPONYM:
                    return SemanticRelationType_1.SemanticRelationType.INSTANCE_HYPERNYM;
                case SemanticRelationType_1.SemanticRelationType.MEMBER_HOLONYM:
                    return SemanticRelationType_1.SemanticRelationType.MEMBER_MERONYM;
                case SemanticRelationType_1.SemanticRelationType.MEMBER_MERONYM:
                    return SemanticRelationType_1.SemanticRelationType.MEMBER_HOLONYM;
                case SemanticRelationType_1.SemanticRelationType.PART_MERONYM:
                    return SemanticRelationType_1.SemanticRelationType.PART_HOLONYM;
                case SemanticRelationType_1.SemanticRelationType.PART_HOLONYM:
                    return SemanticRelationType_1.SemanticRelationType.PART_MERONYM;
                case SemanticRelationType_1.SemanticRelationType.SUBSTANCE_MERONYM:
                    return SemanticRelationType_1.SemanticRelationType.SUBSTANCE_HOLONYM;
                case SemanticRelationType_1.SemanticRelationType.SUBSTANCE_HOLONYM:
                    return SemanticRelationType_1.SemanticRelationType.SUBSTANCE_MERONYM;
                case SemanticRelationType_1.SemanticRelationType.DOMAIN_TOPIC:
                    return SemanticRelationType_1.SemanticRelationType.MEMBER_TOPIC;
                case SemanticRelationType_1.SemanticRelationType.MEMBER_TOPIC:
                    return SemanticRelationType_1.SemanticRelationType.DOMAIN_TOPIC;
                case SemanticRelationType_1.SemanticRelationType.DOMAIN_REGION:
                    return SemanticRelationType_1.SemanticRelationType.MEMBER_REGION;
                case SemanticRelationType_1.SemanticRelationType.MEMBER_REGION:
                    return SemanticRelationType_1.SemanticRelationType.DOMAIN_REGION;
                case SemanticRelationType_1.SemanticRelationType.DOMAIN_USAGE:
                    return SemanticRelationType_1.SemanticRelationType.MEMBER_USAGE;
                case SemanticRelationType_1.SemanticRelationType.MEMBER_USAGE:
                    return SemanticRelationType_1.SemanticRelationType.DOMAIN_USAGE;
                case SemanticRelationType_1.SemanticRelationType.DERIVATION_RELATED:
                    return SemanticRelationType_1.SemanticRelationType.DERIVATION_RELATED;
            }
            return undefined;
        }
        /**
         * Returns the index value.
         *
         * @return index value.
         */
        toIndex() {
            return this._toIndex;
        }
        /**
         * Accessor for the semantic relation type.
         *
         * @return semantic relation type
         */
        getRelationType() {
            return this.relationType;
        }
        /**
         * Mutator for the semantic relation type.
         *
         * @param relationType semantic relation type.
         */
        setRelationType(relationType) {
            this.relationType = relationType;
        }
        /**
         * Accessor method to retrieve the semantic relation type as a String.
         *
         * @return String semantic relation type
         */
        getTypeAsString() {
            if (this.relationType != undefined) {
                return SemanticRelation.semanticDependency[this.relationType];
            }
            else {
                return undefined;
            }
        }
        /**
         * Overridden toString method to print semantic relation types and names.
         *
         * @return semantic relation types and names
         */
        toString() {
            return this.getTypeAsString() + "->" + this.name;
        }
    }
    exports.SemanticRelation = SemanticRelation;
    SemanticRelation.semanticDependency = ["ANTONYM", "HYPERNYM",
        "INSTANCE_HYPERNYM", "HYPONYM", "INSTANCE_HYPONYM", "MEMBER_HOLONYM", "SUBSTANCE_HOLONYM",
        "PART_HOLONYM", "MEMBER_MERONYM", "SUBSTANCE_MERONYM", "PART_MERONYM", "ATTRIBUTE",
        "DERIVATION_RELATED", "DOMAIN_TOPIC", "MEMBER_TOPIC", "DOMAIN_REGION", "MEMBER_REGION",
        "DOMAIN_USAGE", "MEMBER_USAGE", "ENTAILMENT", "CAUSE", "ALSO_SEE",
        "VERB_GROUP", "SIMILAR_TO", "PARTICIPLE_OF_VERB"];
    SemanticRelation.semanticDependencyTags = [SemanticRelationType_1.SemanticRelationType.ANTONYM, SemanticRelationType_1.SemanticRelationType.HYPERNYM,
        SemanticRelationType_1.SemanticRelationType.INSTANCE_HYPERNYM, SemanticRelationType_1.SemanticRelationType.HYPONYM, SemanticRelationType_1.SemanticRelationType.INSTANCE_HYPONYM, SemanticRelationType_1.SemanticRelationType.MEMBER_HOLONYM, SemanticRelationType_1.SemanticRelationType.SUBSTANCE_HOLONYM,
        SemanticRelationType_1.SemanticRelationType.PART_HOLONYM, SemanticRelationType_1.SemanticRelationType.MEMBER_MERONYM, SemanticRelationType_1.SemanticRelationType.SUBSTANCE_MERONYM, SemanticRelationType_1.SemanticRelationType.PART_MERONYM, SemanticRelationType_1.SemanticRelationType.ATTRIBUTE,
        SemanticRelationType_1.SemanticRelationType.DERIVATION_RELATED, SemanticRelationType_1.SemanticRelationType.DOMAIN_TOPIC, SemanticRelationType_1.SemanticRelationType.MEMBER_TOPIC, SemanticRelationType_1.SemanticRelationType.DOMAIN_REGION, SemanticRelationType_1.SemanticRelationType.MEMBER_REGION,
        SemanticRelationType_1.SemanticRelationType.DOMAIN_USAGE, SemanticRelationType_1.SemanticRelationType.MEMBER_USAGE, SemanticRelationType_1.SemanticRelationType.ENTAILMENT, SemanticRelationType_1.SemanticRelationType.CAUSE, SemanticRelationType_1.SemanticRelationType.ALSO_SEE,
        SemanticRelationType_1.SemanticRelationType.VERB_GROUP, SemanticRelationType_1.SemanticRelationType.SIMILAR_TO, SemanticRelationType_1.SemanticRelationType.PARTICIPLE_OF_VERB];
});
//# sourceMappingURL=SemanticRelation.js.map
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./SemanticRelation"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Literal = void 0;
    const SemanticRelation_1 = require("./SemanticRelation");
    class Literal {
        /**
         * A constructor that initializes name, sense, SynSet ID and the relations.
         *
         * @param name     name of a literal
         * @param sense    index of sense
         * @param synSetId ID of the SynSet
         */
        constructor(name, sense, synSetId) {
            this.origin = undefined;
            this.relations = new Array();
            this.name = name;
            this.sense = sense;
            this.synSetId = synSetId;
            this.groupNo = 0;
        }
        /**
         * Accessor method to return SynSet ID.
         *
         * @return String of SynSet ID
         */
        getSynSetId() {
            return this.synSetId;
        }
        /**
         * Accessor method to return name of the literal.
         *
         * @return name of the literal
         */
        getName() {
            return this.name;
        }
        /**
         * Accessor method to return the index of sense of the literal.
         *
         * @return index of sense of the literal
         */
        getSense() {
            return this.sense;
        }
        /**
         * Accessor method to return the origin of the literal.
         *
         * @return origin of the literal
         */
        getOrigin() {
            return this.origin;
        }
        /**
         * Mutator method to set the origin with specified origin.
         *
         * @param origin origin of the literal to set
         */
        setOrigin(origin) {
            this.origin = origin;
        }
        /**
         * Accessor method to return the group no of the literal.
         *
         * @return origin of the literal
         */
        getGroupNo() {
            return this.groupNo;
        }
        /**
         * Mutator method to set the group no with specified group no.
         *
         * @param groupNo group no of the literal to set
         */
        setGroupNo(groupNo) {
            this.groupNo = groupNo;
        }
        /**
         * Mutator method to set the sense index of the literal.
         *
         * @param sense sense index of the literal to set
         */
        setSense(sense) {
            this.sense = sense;
        }
        /**
         * Appends the specified Relation to the end of relations list.
         *
         * @param relation element to be appended to the list
         */
        addRelation(relation) {
            this.relations.push(relation);
        }
        /**
         * Removes the first occurrence of the specified element from relations list,
         * if it is present. If the list does not contain the element, it stays unchanged.
         *
         * @param relation element to be removed from the list, if present
         */
        removeRelation(relation) {
            this.relations.splice(this.relations.indexOf(relation), 1);
        }
        /**
         * Returns true if relations list contains the specified relation.
         *
         * @param relation element whose presence in the list is to be tested
         * @return true if the list contains the specified element
         */
        containsRelation(relation) {
            return this.relations.indexOf(relation) != -1;
        }
        /**
         * Returns true if specified semantic relation type presents in the relations list.
         *
         * @param semanticRelationType element whose presence in the list is to be tested
         * @return true if specified semantic relation type presents in the relations list
         */
        containsRelationType(semanticRelationType) {
            for (let relation of this.relations) {
                if (relation instanceof SemanticRelation_1.SemanticRelation && relation.getRelationType() == semanticRelationType) {
                    return true;
                }
            }
            return false;
        }
        /**
         * Returns the element at the specified position in relations list.
         *
         * @param index index of the element to return
         * @return the element at the specified position in the list
         */
        getRelation(index) {
            return this.relations[index];
        }
        /**
         * Returns size of relations list.
         *
         * @return the size of the list
         */
        relationSize() {
            return this.relations.length;
        }
        /**
         * Mutator method to set name of a literal.
         *
         * @param name name of the literal to set
         */
        setName(name) {
            this.name = name;
        }
        /**
         * Mutator method to set SynSet ID of a literal.
         *
         * @param synSetId SynSet ID of the literal to set
         */
        setSynSetId(synSetId) {
            this.synSetId = synSetId;
        }
        /**
         * Overridden toString method to print names and sense of literals.
         *
         * @return concatenated names and senses of literals
         */
        toString() {
            return this.name + " " + this.sense;
        }
    }
    exports.Literal = Literal;
});
//# sourceMappingURL=Literal.js.map
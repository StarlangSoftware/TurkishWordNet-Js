"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterlingualRelation = void 0;
const Relation_1 = require("./Relation");
const InterlingualDependencyType_1 = require("./InterlingualDependencyType");
class InterlingualRelation extends Relation_1.Relation {
    dependencyType;
    static ilrDependency = ["Hypernym", "Near_antonym", "Holo_member", "Holo_part", "Holo_portion",
        "Usage_domain", "Category_domain", "Be_in_state", "Subevent", "Verb_group",
        "Similar_to", "Also_see", "Causes", "SYNONYM"];
    static interlingualDependencyTags = [InterlingualDependencyType_1.InterlingualDependencyType.HYPERNYM,
        InterlingualDependencyType_1.InterlingualDependencyType.NEAR_ANTONYM, InterlingualDependencyType_1.InterlingualDependencyType.HOLO_MEMBER, InterlingualDependencyType_1.InterlingualDependencyType.HOLO_PART,
        InterlingualDependencyType_1.InterlingualDependencyType.HOLO_PORTION, InterlingualDependencyType_1.InterlingualDependencyType.USAGE_DOMAIN, InterlingualDependencyType_1.InterlingualDependencyType.CATEGORY_DOMAIN,
        InterlingualDependencyType_1.InterlingualDependencyType.BE_IN_STATE, InterlingualDependencyType_1.InterlingualDependencyType.SUBEVENT, InterlingualDependencyType_1.InterlingualDependencyType.VERB_GROUP,
        InterlingualDependencyType_1.InterlingualDependencyType.SIMILAR_TO, InterlingualDependencyType_1.InterlingualDependencyType.ALSO_SEE, InterlingualDependencyType_1.InterlingualDependencyType.CAUSES,
        InterlingualDependencyType_1.InterlingualDependencyType.SYNONYM];
    /**
     * Compares specified {@code String} tag with the tags in InterlingualDependencyType {@code Array}, ignoring case
     * considerations.
     *
     * @param tag String to compare
     * @return interlingual dependency type according to specified tag
     */
    static getInterlingualDependencyTag(tag) {
        for (let j = 0; j < InterlingualRelation.ilrDependency.length; j++) {
            if (tag.toUpperCase() == InterlingualRelation.ilrDependency[j].toUpperCase()) {
                return InterlingualRelation.interlingualDependencyTags[j];
            }
        }
        return undefined;
    }
    /**
     * InterlingualRelation method sets its relation with the specified String name, then gets the InterlingualDependencyType
     * according to specified String dependencyType.
     *
     * @param name           relation name
     * @param dependencyType interlingual dependency type
     */
    constructor(name, dependencyType) {
        super(name);
        this.dependencyType = InterlingualRelation.getInterlingualDependencyTag(dependencyType);
    }
    /**
     * Accessor method to get the private InterlingualDependencyType.
     *
     * @return interlingual dependency type
     */
    getType() {
        return this.dependencyType;
    }
    /**
     * Method to retrieve interlingual dependency type as {@code String}.
     *
     * @return String interlingual dependency type
     */
    getTypeAsString() {
        for (let j = 0; j < InterlingualRelation.ilrDependency.length; j++) {
            if (this.dependencyType == InterlingualRelation.interlingualDependencyTags[j]) {
                return InterlingualRelation.ilrDependency[j];
            }
        }
        return undefined;
    }
    /**
     * toString method to print interlingual dependency type.
     *
     * @return String of relation name
     */
    toString() {
        return this.getTypeAsString() + "->" + name;
    }
}
exports.InterlingualRelation = InterlingualRelation;
//# sourceMappingURL=InterlingualRelation.js.map
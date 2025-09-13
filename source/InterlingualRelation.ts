import {Relation} from "./Relation";
import {InterlingualDependencyType} from "./InterlingualDependencyType";

export class InterlingualRelation extends Relation{

    private dependencyType: InterlingualDependencyType

    static ilrDependency = ["Hypernym", "Near_antonym", "Holo_member", "Holo_part", "Holo_portion",
        "Usage_domain", "Category_domain", "Be_in_state", "Subevent", "Verb_group",
        "Similar_to", "Also_see", "Causes", "SYNONYM"];

    static interlingualDependencyTags = [InterlingualDependencyType.HYPERNYM,
        InterlingualDependencyType.NEAR_ANTONYM, InterlingualDependencyType.HOLO_MEMBER, InterlingualDependencyType.HOLO_PART,
        InterlingualDependencyType.HOLO_PORTION, InterlingualDependencyType.USAGE_DOMAIN, InterlingualDependencyType.CATEGORY_DOMAIN,
        InterlingualDependencyType.BE_IN_STATE, InterlingualDependencyType.SUBEVENT, InterlingualDependencyType.VERB_GROUP,
        InterlingualDependencyType.SIMILAR_TO, InterlingualDependencyType.ALSO_SEE, InterlingualDependencyType.CAUSES,
        InterlingualDependencyType.SYNONYM];

    /**
     * Compares specified {@code String} tag with the tags in InterlingualDependencyType {@code Array}, ignoring case
     * considerations.
     *
     * @param tag String to compare
     * @return interlingual dependency type according to specified tag
     */
    static getInterlingualDependencyTag(tag: string): InterlingualDependencyType{
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
    constructor(name: string, dependencyType: string) {
        super(name);
        this.dependencyType = InterlingualRelation.getInterlingualDependencyTag(dependencyType);
    }

    /**
     * Accessor method to get the private InterlingualDependencyType.
     *
     * @return interlingual dependency type
     */
    getType(): InterlingualDependencyType{
        return this.dependencyType
    }

    /**
     * Method to retrieve interlingual dependency type as {@code String}.
     *
     * @return String interlingual dependency type
     */
    getTypeAsString(): string{
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
    toString(): string{
        return this.getTypeAsString() + "->" + name;
    }
}
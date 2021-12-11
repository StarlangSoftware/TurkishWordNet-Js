import { Relation } from "./Relation";
import { InterlingualDependencyType } from "./InterlingualDependencyType";
export declare class InterlingualRelation extends Relation {
    private dependencyType;
    static ilrDependency: string[];
    static interlingualDependencyTags: InterlingualDependencyType[];
    /**
     * Compares specified {@code String} tag with the tags in InterlingualDependencyType {@code Array}, ignoring case
     * considerations.
     *
     * @param tag String to compare
     * @return interlingual dependency type according to specified tag
     */
    static getInterlingualDependencyTag(tag: string): InterlingualDependencyType;
    /**
     * InterlingualRelation method sets its relation with the specified String name, then gets the InterlingualDependencyType
     * according to specified String dependencyType.
     *
     * @param name           relation name
     * @param dependencyType interlingual dependency type
     */
    constructor(name: string, dependencyType: string);
    /**
     * Accessor method to get the private InterlingualDependencyType.
     *
     * @return interlingual dependency type
     */
    getType(): InterlingualDependencyType;
    /**
     * Method to retrieve interlingual dependency type as {@code String}.
     *
     * @return String interlingual dependency type
     */
    getTypeAsString(): string;
    /**
     * toString method to print interlingual dependency type.
     *
     * @return String of relation name
     */
    toString(): string;
}

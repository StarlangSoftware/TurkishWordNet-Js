export declare class Relation {
    protected name: string;
    /**
     * A constructor that sets the name of the relation.
     *
     * @param name String relation name
     */
    constructor(name: string);
    /**
     * Accessor method for the relation name.
     *
     * @return String relation name
     */
    getName(): string;
    /**
     * Mutator for the relation name.
     *
     * @param name String relation name
     */
    setName(name: string): void;
}

import { Literal } from "./Literal";
export declare class Synonym {
    private literals;
    /**
     * A constructor that creates a new {@link Array} literals.
     */
    constructor();
    /**
     * Appends the specified Literal to the end of literals list.
     *
     * @param literal element to be appended to the list
     */
    addLiteral(literal: Literal): void;
    /**
     * Moves the specified literal to the first of literals list.
     *
     * @param literal element to be moved to the first element of the list
     */
    moveFirst(literal: Literal): void;
    getUniqueLiterals(): Array<Synonym>;
    /**
     * Returns the element at the specified position in literals list.
     *
     * @param index index of the element to return
     * @return the element at the specified position in the list
     */
    getLiteral(index: any): Literal;
    /**
     * Returns size of literals list.
     *
     * @return the size of the list
     */
    literalSize(): number;
    /**
     * Returns true if literals list contains the specified literal.
     *
     * @param literal element whose presence in the list is to be tested
     * @return true if the list contains the specified element
     */
    contains(literal: Literal): boolean;
    /**
     * Returns true if literals list contains the specified String literal.
     *
     * @param literalName element whose presence in the list is to be tested
     * @return true if the list contains the specified element
     */
    containsLiteral(literalName: string): boolean;
    /**
     * Removes the first occurrence of the specified element from literals list,
     * if it is present. If the list does not contain the element, it stays unchanged.
     *
     * @param toBeRemoved element to be removed from the list, if present
     */
    removeLiteral(toBeRemoved: Literal): void;
    /**
     * Overridden toString method to print literals.
     *
     * @return concatenated literals
     */
    toString(): string;
}

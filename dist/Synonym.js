"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Synonym = void 0;
class Synonym {
    literals = new Array();
    /**
     * A constructor that creates a new {@link Array} literals.
     */
    constructor() {
    }
    /**
     * Appends the specified Literal to the end of literals list.
     *
     * @param literal element to be appended to the list
     */
    addLiteral(literal) {
        this.literals.push(literal);
    }
    /**
     * Moves the specified literal to the first of literals list.
     *
     * @param literal element to be moved to the first element of the list
     */
    moveFirst(literal) {
        if (this.contains(literal)) {
            this.literals.splice(this.literals.indexOf(literal), 1);
            this.literals.splice(0, 0, literal);
        }
    }
    /**
     * Extracts literal groups as synonym lists and returns them as an array list. Each literal group consists of
     * literals with the same group number except 0 which represents single literals. For example let say 'ab', 'âb',
     * 'su' are 3 literals in the same synset, this method will return for that synset two synonyms: 'ab' and 'âb' are
     * in one synonym and 'su' is in another synonym.
     * @return Array list of literal groups represented as synonyms
     */
    getUniqueLiterals() {
        let literalGroups = Array();
        let groupNo = -1;
        let synonym = new Synonym();
        for (let literal of this.literals) {
            if (literal.getGroupNo() != groupNo) {
                if (groupNo != -1) {
                    literalGroups.push(synonym);
                }
                groupNo = literal.getGroupNo();
                synonym = new Synonym();
            }
            else {
                if (groupNo == 0) {
                    literalGroups.push(synonym);
                    synonym = new Synonym();
                }
            }
            synonym.addLiteral(literal);
        }
        literalGroups.push(synonym);
        return literalGroups;
    }
    /**
     * Returns the element at the specified position in literals list.
     *
     * @param index index of the element to return
     * @return the element at the specified position in the list
     */
    getLiteral(index) {
        if (!isNaN(index)) {
            return this.literals[index];
        }
        else {
            for (let literal of this.literals) {
                if (literal.getName() == index) {
                    return literal;
                }
            }
            return undefined;
        }
    }
    /**
     * Returns size of literals list.
     *
     * @return the size of the list
     */
    literalSize() {
        return this.literals.length;
    }
    /**
     * Returns true if literals list contains the specified literal.
     *
     * @param literal element whose presence in the list is to be tested
     * @return true if the list contains the specified element
     */
    contains(literal) {
        return this.literals.indexOf(literal) != -1;
    }
    /**
     * Returns true if literals list contains the specified String literal.
     *
     * @param literalName element whose presence in the list is to be tested
     * @return true if the list contains the specified element
     */
    containsLiteral(literalName) {
        for (let literal of this.literals) {
            if (literal.getName() == literalName) {
                return true;
            }
        }
        return false;
    }
    /**
     * Removes the first occurrence of the specified element from literals list,
     * if it is present. If the list does not contain the element, it stays unchanged.
     *
     * @param toBeRemoved element to be removed from the list, if present
     */
    removeLiteral(toBeRemoved) {
        this.literals.splice(this.literals.indexOf(toBeRemoved), 1);
    }
    /**
     * Overridden toString method to print literals.
     *
     * @return concatenated literals
     */
    toString() {
        let result = "";
        for (let literal of this.literals) {
            result = result + literal.getName() + " ";
        }
        return result;
    }
}
exports.Synonym = Synonym;
//# sourceMappingURL=Synonym.js.map
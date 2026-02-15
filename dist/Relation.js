"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Relation = void 0;
class Relation {
    name;
    /**
     * A constructor that sets the name of the relation.
     *
     * @param name String relation name
     */
    constructor(name) {
        this.name = name;
    }
    /**
     * Accessor method for the relation name.
     *
     * @return String relation name
     */
    getName() {
        return this.name;
    }
    /**
     * Mutator for the relation name.
     *
     * @param name String relation name
     */
    setName(name) {
        this.name = name;
    }
}
exports.Relation = Relation;
//# sourceMappingURL=Relation.js.map
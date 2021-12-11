(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./Similarity"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LCH = void 0;
    const Similarity_1 = require("./Similarity");
    class LCH extends Similarity_1.Similarity {
        constructor(wordNet) {
            super(wordNet);
        }
        computeSimilarity(synSet1, synSet2) {
            let pathToRootOfSynSet1 = this.wordNet.findPathToRoot(synSet1);
            let pathToRootOfSynSet2 = this.wordNet.findPathToRoot(synSet2);
            let pathLength = this.wordNet.findPathLength(pathToRootOfSynSet1, pathToRootOfSynSet2);
            let maxDepth = Math.max(pathToRootOfSynSet1.length, pathToRootOfSynSet2.length);
            return -Math.log(pathLength / (2 * maxDepth));
        }
    }
    exports.LCH = LCH;
});
//# sourceMappingURL=LCH.js.map
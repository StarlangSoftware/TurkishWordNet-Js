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
    exports.SimilarityPath = void 0;
    const Similarity_1 = require("./Similarity");
    class SimilarityPath extends Similarity_1.Similarity {
        constructor(wordNet) {
            super(wordNet);
        }
        computeSimilarity(synSet1, synSet2) {
            // Find path to root of both elements. Percolating up until root is necessary since depth is necessary to compute the score.
            let pathToRootOfSynSet1 = this.wordNet.findPathToRoot(synSet1);
            let pathToRootOfSynSet2 = this.wordNet.findPathToRoot(synSet2);
            // Find path length
            let pathLength = this.wordNet.findPathLength(pathToRootOfSynSet1, pathToRootOfSynSet2);
            let maxDepth = Math.max(pathToRootOfSynSet1.length, pathToRootOfSynSet2.length);
            return 2 * maxDepth - pathLength;
        }
    }
    exports.SimilarityPath = SimilarityPath;
});
//# sourceMappingURL=SimilarityPath.js.map
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
    exports.WuPalmer = void 0;
    const Similarity_1 = require("./Similarity");
    class WuPalmer extends Similarity_1.Similarity {
        constructor(wordNet) {
            super(wordNet);
        }
        computeSimilarity(synSet1, synSet2) {
            let pathToRootOfSynSet1 = this.wordNet.findPathToRoot(synSet1);
            let pathToRootOfSynSet2 = this.wordNet.findPathToRoot(synSet2);
            let LCSdepth = this.wordNet.findLCSdepth(pathToRootOfSynSet1, pathToRootOfSynSet2);
            return 2 * LCSdepth / (pathToRootOfSynSet1.length + pathToRootOfSynSet2.length);
        }
    }
    exports.WuPalmer = WuPalmer;
});
//# sourceMappingURL=WuPalmer.js.map
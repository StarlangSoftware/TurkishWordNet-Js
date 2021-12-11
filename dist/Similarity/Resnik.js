(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./ICSimilarity"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Resnik = void 0;
    const ICSimilarity_1 = require("./ICSimilarity");
    class Resnik extends ICSimilarity_1.ICSimilarity {
        constructor(wordNet, informationContents) {
            super(wordNet, informationContents);
        }
        computeSimilarity(synSet1, synSet2) {
            let pathToRootOfSynSet1 = this.wordNet.findPathToRoot(synSet1);
            let pathToRootOfSynSet2 = this.wordNet.findPathToRoot(synSet2);
            let LCSid = this.wordNet.findLCSid(pathToRootOfSynSet1, pathToRootOfSynSet2);
            return this.informationContents.get(LCSid);
        }
    }
    exports.Resnik = Resnik;
});
//# sourceMappingURL=Resnik.js.map
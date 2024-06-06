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
    exports.ICSimilarity = void 0;
    const Similarity_1 = require("./Similarity");
    class ICSimilarity extends Similarity_1.Similarity {
        /**
         * Abstract class constructor to set the wordnet and the information content hash map.
         * @param wordNet WordNet for which similarity metrics will be calculated.
         * @param informationContents Information content hash map.
         */
        constructor(wordNet, informationContents) {
            super(wordNet);
            this.informationContents = informationContents;
        }
    }
    exports.ICSimilarity = ICSimilarity;
});
//# sourceMappingURL=ICSimilarity.js.map
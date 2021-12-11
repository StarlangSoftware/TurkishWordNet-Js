(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Similarity = void 0;
    class Similarity {
        constructor(wordNet) {
            this.wordNet = wordNet;
        }
    }
    exports.Similarity = Similarity;
});
//# sourceMappingURL=Similarity.js.map
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./CategoryType", "./InterlingualDependencyType", "./InterlingualRelation", "./Literal", "./Relation", "./SemanticRelation", "./SemanticRelationType", "./Synonym", "./SynSet", "./WordNet", "./Similarity/ICSimilarity", "./Similarity/JCN", "./Similarity/LCH", "./Similarity/Lin", "./Similarity/Resnik", "./Similarity/Similarity", "./Similarity/SimilarityPath", "./Similarity/WuPalmer"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require("./CategoryType"), exports);
    __exportStar(require("./InterlingualDependencyType"), exports);
    __exportStar(require("./InterlingualRelation"), exports);
    __exportStar(require("./Literal"), exports);
    __exportStar(require("./Relation"), exports);
    __exportStar(require("./SemanticRelation"), exports);
    __exportStar(require("./SemanticRelationType"), exports);
    __exportStar(require("./Synonym"), exports);
    __exportStar(require("./SynSet"), exports);
    __exportStar(require("./WordNet"), exports);
    __exportStar(require("./Similarity/ICSimilarity"), exports);
    __exportStar(require("./Similarity/JCN"), exports);
    __exportStar(require("./Similarity/LCH"), exports);
    __exportStar(require("./Similarity/Lin"), exports);
    __exportStar(require("./Similarity/Resnik"), exports);
    __exportStar(require("./Similarity/Similarity"), exports);
    __exportStar(require("./Similarity/SimilarityPath"), exports);
    __exportStar(require("./Similarity/WuPalmer"), exports);
});
//# sourceMappingURL=index.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LCH = void 0;
const Similarity_1 = require("./Similarity");
class LCH extends Similarity_1.Similarity {
    /**
     * Class constructor that sets the wordnet.
     * @param wordNet WordNet for which similarity metrics will be calculated.
     */
    constructor(wordNet) {
        super(wordNet);
    }
    /**
     * Computes LCH wordnet similarity metric between two synsets.
     * @param synSet1 First synset
     * @param synSet2 Second synset
     * @return LCH wordnet similarity metric between two synsets
     */
    computeSimilarity(synSet1, synSet2) {
        let pathToRootOfSynSet1 = this.wordNet.findPathToRoot(synSet1);
        let pathToRootOfSynSet2 = this.wordNet.findPathToRoot(synSet2);
        let pathLength = this.wordNet.findPathLength(pathToRootOfSynSet1, pathToRootOfSynSet2);
        let maxDepth = Math.max(pathToRootOfSynSet1.length, pathToRootOfSynSet2.length);
        return -Math.log(pathLength / (2 * maxDepth));
    }
}
exports.LCH = LCH;
//# sourceMappingURL=LCH.js.map
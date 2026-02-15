"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JCN = void 0;
const ICSimilarity_1 = require("./ICSimilarity");
class JCN extends ICSimilarity_1.ICSimilarity {
    /**
     * Class constructor that sets the wordnet and the information content hash map.
     * @param wordNet WordNet for which similarity metrics will be calculated.
     * @param informationContents Information content hash map.
     */
    constructor(wordNet, informationContents) {
        super(wordNet, informationContents);
    }
    /**
     * Computes JCN wordnet similarity metric between two synsets.
     * @param synSet1 First synset
     * @param synSet2 Second synset
     * @return JCN wordnet similarity metric between two synsets
     */
    computeSimilarity(synSet1, synSet2) {
        let pathToRootOfSynSet1 = this.wordNet.findPathToRoot(synSet1);
        let pathToRootOfSynSet2 = this.wordNet.findPathToRoot(synSet2);
        let LCSid = this.wordNet.findLCSid(pathToRootOfSynSet1, pathToRootOfSynSet2);
        return 1 / (this.informationContents.get(synSet1.getId()) + this.informationContents.get(synSet2.getId()) - 2 * this.informationContents.get(LCSid));
    }
}
exports.JCN = JCN;
//# sourceMappingURL=JCN.js.map
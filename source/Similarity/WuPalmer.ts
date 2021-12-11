import {Similarity} from "./Similarity";
import {SynSet} from "../SynSet";
import {WordNet} from "../WordNet";

export class WuPalmer extends Similarity{

    constructor(wordNet: WordNet) {
        super(wordNet);
    }

    computeSimilarity(synSet1: SynSet, synSet2: SynSet): number {
        let pathToRootOfSynSet1 = this.wordNet.findPathToRoot(synSet1);
        let pathToRootOfSynSet2 = this.wordNet.findPathToRoot(synSet2);
        let LCSdepth = this.wordNet.findLCSdepth(pathToRootOfSynSet1, pathToRootOfSynSet2);
        return 2 * LCSdepth / (pathToRootOfSynSet1.length + pathToRootOfSynSet2.length);
    }

}
import {Similarity} from "./Similarity";
import {SynSet} from "../SynSet";
import {WordNet} from "../WordNet";

export class LCH extends Similarity{

    constructor(wordNet: WordNet) {
        super(wordNet);
    }

    computeSimilarity(synSet1: SynSet, synSet2: SynSet): number {
        let pathToRootOfSynSet1 = this.wordNet.findPathToRoot(synSet1);
        let pathToRootOfSynSet2 = this.wordNet.findPathToRoot(synSet2);
        let pathLength = this.wordNet.findPathLength(pathToRootOfSynSet1, pathToRootOfSynSet2);
        let maxDepth = Math.max(pathToRootOfSynSet1.length, pathToRootOfSynSet2.length);
        return -Math.log(pathLength / (2 * maxDepth));
    }

}
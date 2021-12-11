import {Similarity} from "./Similarity";
import {SynSet} from "../SynSet";
import {WordNet} from "../WordNet";

export class SimilarityPath extends Similarity{

    constructor(wordNet: WordNet) {
        super(wordNet);
    }

    computeSimilarity(synSet1: SynSet, synSet2: SynSet): number {
        // Find path to root of both elements. Percolating up until root is necessary since depth is necessary to compute the score.
        let pathToRootOfSynSet1 = this.wordNet.findPathToRoot(synSet1);
        let pathToRootOfSynSet2 = this.wordNet.findPathToRoot(synSet2);
        // Find path length
        let pathLength = this.wordNet.findPathLength(pathToRootOfSynSet1, pathToRootOfSynSet2);
        let maxDepth = Math.max(pathToRootOfSynSet1.length, pathToRootOfSynSet2.length);
        return 2 * maxDepth - pathLength;
    }

}
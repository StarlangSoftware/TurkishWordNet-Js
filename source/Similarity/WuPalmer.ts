import {Similarity} from "./Similarity";
import {SynSet} from "../SynSet";
import {WordNet} from "../WordNet";

export class WuPalmer extends Similarity{

    /**
     * Class constructor that sets the wordnet and the information content hash map.
     * @param wordNet WordNet for which similarity metrics will be calculated.
     */
    constructor(wordNet: WordNet) {
        super(wordNet);
    }

    /**
     * Computes Wu-Palmer wordnet similarity metric between two synsets.
     * @param synSet1 First synset
     * @param synSet2 Second synset
     * @return Wu-Palmer wordnet similarity metric between two synsets
     */
    computeSimilarity(synSet1: SynSet, synSet2: SynSet): number {
        let pathToRootOfSynSet1 = this.wordNet.findPathToRoot(synSet1);
        let pathToRootOfSynSet2 = this.wordNet.findPathToRoot(synSet2);
        let LCSdepth = this.wordNet.findLCSdepth(pathToRootOfSynSet1, pathToRootOfSynSet2);
        return 2 * LCSdepth / (pathToRootOfSynSet1.length + pathToRootOfSynSet2.length);
    }

}
import { Similarity } from "./Similarity";
import { SynSet } from "../SynSet";
import { WordNet } from "../WordNet";
export declare class WuPalmer extends Similarity {
    /**
     * Class constructor that sets the wordnet and the information content hash map.
     * @param wordNet WordNet for which similarity metrics will be calculated.
     */
    constructor(wordNet: WordNet);
    /**
     * Computes Wu-Palmer wordnet similarity metric between two synsets.
     * @param synSet1 First synset
     * @param synSet2 Second synset
     * @return Wu-Palmer wordnet similarity metric between two synsets
     */
    computeSimilarity(synSet1: SynSet, synSet2: SynSet): number;
}

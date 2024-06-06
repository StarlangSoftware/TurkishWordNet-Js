import { Similarity } from "./Similarity";
import { SynSet } from "../SynSet";
import { WordNet } from "../WordNet";
export declare class LCH extends Similarity {
    /**
     * Class constructor that sets the wordnet.
     * @param wordNet WordNet for which similarity metrics will be calculated.
     */
    constructor(wordNet: WordNet);
    /**
     * Computes LCH wordnet similarity metric between two synsets.
     * @param synSet1 First synset
     * @param synSet2 Second synset
     * @return LCH wordnet similarity metric between two synsets
     */
    computeSimilarity(synSet1: SynSet, synSet2: SynSet): number;
}

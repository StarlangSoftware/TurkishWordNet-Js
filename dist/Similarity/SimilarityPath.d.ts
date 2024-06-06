import { Similarity } from "./Similarity";
import { SynSet } from "../SynSet";
import { WordNet } from "../WordNet";
export declare class SimilarityPath extends Similarity {
    /**
     * Class constructor that sets the wordnet and the information content hash map.
     * @param wordNet WordNet for which similarity metrics will be calculated.
     */
    constructor(wordNet: WordNet);
    /**
     * Computes wordnet similarity metric based on similarity path between two synsets.
     * @param synSet1 First synset
     * @param synSet2 Second synset
     * @return Wordnet similarity metric based on similarity path between two synsets.
     */
    computeSimilarity(synSet1: SynSet, synSet2: SynSet): number;
}

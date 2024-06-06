import { ICSimilarity } from "./ICSimilarity";
import { SynSet } from "../SynSet";
import { WordNet } from "../WordNet";
export declare class JCN extends ICSimilarity {
    /**
     * Class constructor that sets the wordnet and the information content hash map.
     * @param wordNet WordNet for which similarity metrics will be calculated.
     * @param informationContents Information content hash map.
     */
    constructor(wordNet: WordNet, informationContents: Map<string, number>);
    /**
     * Computes JCN wordnet similarity metric between two synsets.
     * @param synSet1 First synset
     * @param synSet2 Second synset
     * @return JCN wordnet similarity metric between two synsets
     */
    computeSimilarity(synSet1: SynSet, synSet2: SynSet): number;
}

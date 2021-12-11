import { WordNet } from "../WordNet";
import { SynSet } from "../SynSet";
export declare abstract class Similarity {
    protected wordNet: WordNet;
    abstract computeSimilarity(synSet1: SynSet, synSet2: SynSet): number;
    constructor(wordNet: WordNet);
}

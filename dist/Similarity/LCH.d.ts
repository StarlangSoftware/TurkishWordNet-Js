import { Similarity } from "./Similarity";
import { SynSet } from "../SynSet";
import { WordNet } from "../WordNet";
export declare class LCH extends Similarity {
    constructor(wordNet: WordNet);
    computeSimilarity(synSet1: SynSet, synSet2: SynSet): number;
}

import { ICSimilarity } from "./ICSimilarity";
import { WordNet } from "../WordNet";
import { SynSet } from "../SynSet";
export declare class Resnik extends ICSimilarity {
    constructor(wordNet: WordNet, informationContents: Map<string, number>);
    computeSimilarity(synSet1: SynSet, synSet2: SynSet): number;
}

import { ICSimilarity } from "./ICSimilarity";
import { SynSet } from "../SynSet";
import { WordNet } from "../WordNet";
export declare class Lin extends ICSimilarity {
    constructor(wordNet: WordNet, informationContents: Map<string, number>);
    computeSimilarity(synSet1: SynSet, synSet2: SynSet): number;
}

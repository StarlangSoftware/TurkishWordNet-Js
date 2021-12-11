import { Similarity } from "./Similarity";
import { WordNet } from "../WordNet";
export declare abstract class ICSimilarity extends Similarity {
    protected informationContents: Map<string, number>;
    constructor(wordNet: WordNet, informationContents: Map<string, number>);
}

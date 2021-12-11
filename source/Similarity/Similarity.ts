import {WordNet} from "../WordNet";
import {SynSet} from "../SynSet";

export abstract class Similarity {

    protected wordNet: WordNet

    abstract computeSimilarity(synSet1: SynSet, synSet2: SynSet): number

    constructor(wordNet: WordNet) {
        this.wordNet = wordNet
    }
}
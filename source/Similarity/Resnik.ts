import {ICSimilarity} from "./ICSimilarity";
import {WordNet} from "../WordNet";
import {SynSet} from "../SynSet";

export class Resnik extends ICSimilarity{

    constructor(wordNet: WordNet, informationContents: Map<string, number>) {
        super(wordNet, informationContents);
    }

    computeSimilarity(synSet1: SynSet, synSet2: SynSet): number {
        let pathToRootOfSynSet1 = this.wordNet.findPathToRoot(synSet1);
        let pathToRootOfSynSet2 = this.wordNet.findPathToRoot(synSet2);
        let LCSid = this.wordNet.findLCSid(pathToRootOfSynSet1, pathToRootOfSynSet2);
        return this.informationContents.get(LCSid);
    }

}
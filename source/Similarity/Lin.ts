import {ICSimilarity} from "./ICSimilarity";
import {SynSet} from "../SynSet";
import {WordNet} from "../WordNet";

export class Lin extends ICSimilarity{

    constructor(wordNet: WordNet, informationContents: Map<string, number>) {
        super(wordNet, informationContents);
    }

    computeSimilarity(synSet1: SynSet, synSet2: SynSet): number {
        let pathToRootOfSynSet1 = this.wordNet.findPathToRoot(synSet1);
        let pathToRootOfSynSet2 = this.wordNet.findPathToRoot(synSet2);
        let LCSid = this.wordNet.findLCSid(pathToRootOfSynSet1, pathToRootOfSynSet2);
        return (2 * this.informationContents.get(LCSid))
            / (this.informationContents.get(synSet1.getId()) + this.informationContents.get(synSet2.getId()));
    }

}
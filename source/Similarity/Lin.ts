import {ICSimilarity} from "./ICSimilarity";
import {SynSet} from "../SynSet";
import {WordNet} from "../WordNet";

export class Lin extends ICSimilarity{

    /**
     * Class constructor to set the wordnet and the information content hash map.
     * @param wordNet WordNet for which similarity metrics will be calculated.
     * @param informationContents Information content hash map.
     */
    constructor(wordNet: WordNet, informationContents: Map<string, number>) {
        super(wordNet, informationContents);
    }

    /**
     * Computes Lin wordnet similarity metric between two synsets.
     * @param synSet1 First synset
     * @param synSet2 Second synset
     * @return Lin wordnet similarity metric between two synsets
     */
    computeSimilarity(synSet1: SynSet, synSet2: SynSet): number {
        let pathToRootOfSynSet1 = this.wordNet.findPathToRoot(synSet1);
        let pathToRootOfSynSet2 = this.wordNet.findPathToRoot(synSet2);
        let LCSid = this.wordNet.findLCSid(pathToRootOfSynSet1, pathToRootOfSynSet2);
        return (2 * this.informationContents.get(LCSid))
            / (this.informationContents.get(synSet1.getId()) + this.informationContents.get(synSet2.getId()));
    }

}
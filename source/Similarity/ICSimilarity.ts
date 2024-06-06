import {Similarity} from "./Similarity";
import {WordNet} from "../WordNet";

export abstract class ICSimilarity extends Similarity{

    protected informationContents: Map<string, number>

    /**
     * Abstract class constructor to set the wordnet and the information content hash map.
     * @param wordNet WordNet for which similarity metrics will be calculated.
     * @param informationContents Information content hash map.
     */
    constructor(wordNet: WordNet, informationContents: Map<string, number>) {
        super(wordNet);
        this.informationContents = informationContents
    }
}
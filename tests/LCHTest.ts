import * as assert from "assert";
import {WordNet} from "../dist/WordNet";
import {LCH} from "../dist/Similarity/LCH";

describe('LCHTest', function() {
    describe('LCHTest', function() {
        it('testComputeSimilarity', function() {
            let turkish = new WordNet();
            let lch = new LCH(turkish);
            assert.strictEqual(2.8332, lch.computeSimilarity(turkish.getSynSetWithId("TUR10-0656390"), turkish.getSynSetWithId("TUR10-0600460")));
            assert.strictEqual(0.7802, lch.computeSimilarity(turkish.getSynSetWithId("TUR10-0412120"), turkish.getSynSetWithId("TUR10-0755370")));
            assert.strictEqual(0.6241, lch.computeSimilarity(turkish.getSynSetWithId("TUR10-0195110"), turkish.getSynSetWithId("TUR10-0822980")));
        });
    });
});

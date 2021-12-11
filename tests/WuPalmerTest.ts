import * as assert from "assert";
import {WordNet} from "../dist/WordNet";
import {WuPalmer} from "../dist/Similarity/WuPalmer";

describe('WuPalmerTest', function() {
    describe('WuPalmerTest', function() {
        it('testComputeSimilarity', function() {
            let turkish = new WordNet();
            let wuPalmer = new WuPalmer(turkish);
            assert.strictEqual(0.9697, wuPalmer.computeSimilarity(turkish.getSynSetWithId("TUR10-0656390"), turkish.getSynSetWithId("TUR10-0600460")));
            assert.strictEqual(0.2857, wuPalmer.computeSimilarity(turkish.getSynSetWithId("TUR10-0412120"), turkish.getSynSetWithId("TUR10-0755370")));
            assert.strictEqual(0.3636, wuPalmer.computeSimilarity(turkish.getSynSetWithId("TUR10-0195110"), turkish.getSynSetWithId("TUR10-0822980")));
        });
    });
});

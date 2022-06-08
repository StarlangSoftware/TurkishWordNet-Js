import * as assert from "assert";
import {WordNet} from "../dist/WordNet";
import {Pos} from "nlptoolkit-dictionary/dist/Dictionary/Pos";

describe('WordNetTest', function() {
    describe('WordNetTest', function() {
        let turkish = new WordNet();
        it('testSize', function() {
            assert.strictEqual(78311, turkish.size());
        });
        it('testWikiPages', function() {
            let wikiCount = 0;
            for (let synSet of turkish.getSynSetList()){
                if (synSet.getWikiPage() != undefined){
                    wikiCount++;
                }
            }
            assert.strictEqual(10987, wikiCount);
        });
        it('testSynSetList', function() {
            let literalCount = 0;
            for (let synSet of turkish.getSynSetList()){
                literalCount += synSet.getSynonym().literalSize();
            }
            assert.strictEqual(110236, literalCount);
        });
        it('testLiteralList', function() {
            let literalCount = 0;
            for (let literal of turkish.getLiteralList()){
                literalCount++
            }
            assert.strictEqual(82255, literalCount);
        });
        it('testGetSynSetWithId', function() {
            assert.ok(undefined != turkish.getSynSetWithId("TUR10-0000040"));
            assert.ok(undefined != turkish.getSynSetWithId("TUR10-0648550"));
            assert.ok(undefined != turkish.getSynSetWithId("TUR10-1034170"));
            assert.ok(undefined != turkish.getSynSetWithId("TUR10-1047180"));
            assert.ok(undefined != turkish.getSynSetWithId("TUR10-1196250"));
        });
        it('testGetSynSetWithLiteral', function() {
            assert.ok(undefined != turkish.getSynSetWithLiteral("sıradaki", 1));
            assert.ok(undefined != turkish.getSynSetWithLiteral("Türkçesi", 2));
            assert.ok(undefined != turkish.getSynSetWithLiteral("tropikal orman", 1));
            assert.ok(undefined != turkish.getSynSetWithLiteral("mesut olmak", 1));
            assert.ok(undefined != turkish.getSynSetWithLiteral("acı badem kurabiyesi", 1));
            assert.ok(undefined != turkish.getSynSetWithLiteral("açık kapı siyaseti", 1));
            assert.ok(undefined != turkish.getSynSetWithLiteral("bir baştan bir başa", 1));
            assert.ok(undefined != turkish.getSynSetWithLiteral("eş zamanlı dil bilimi", 1));
            assert.ok(undefined != turkish.getSynSetWithLiteral("bir iğne bir iplik olmak", 1));
            assert.ok(undefined != turkish.getSynSetWithLiteral("yedi kat yerin dibine geçmek", 2));
            assert.ok(undefined != turkish.getSynSetWithLiteral("kedi gibi dört ayak üzerine düşmek", 1));
            assert.ok(undefined != turkish.getSynSetWithLiteral("bir kulağından girip öbür kulağından çıkmak", 1));
            assert.ok(undefined != turkish.getSynSetWithLiteral("anasından emdiği süt burnundan fitil fitil gelmek", 1));
            assert.ok(undefined != turkish.getSynSetWithLiteral("bir ayak üstünde kırk yalanın belini bükmek", 1));
        });
        it('testNumberOfSynSetsWithLiteral', function() {
            assert.strictEqual(1, turkish.numberOfSynSetsWithLiteral("yolcu etmek"));
            assert.strictEqual(2, turkish.numberOfSynSetsWithLiteral("açık pembe"));
            assert.strictEqual(3, turkish.numberOfSynSetsWithLiteral("bürokrasi"));
            assert.strictEqual(4, turkish.numberOfSynSetsWithLiteral("bordür"));
            assert.strictEqual(5, turkish.numberOfSynSetsWithLiteral("duygulanım"));
            assert.strictEqual(6, turkish.numberOfSynSetsWithLiteral("sarsıntı"));
            assert.strictEqual(7, turkish.numberOfSynSetsWithLiteral("kuvvetli"));
            assert.strictEqual(8, turkish.numberOfSynSetsWithLiteral("merkez"));
            assert.strictEqual(9, turkish.numberOfSynSetsWithLiteral("yüksek"));
            assert.strictEqual(10, turkish.numberOfSynSetsWithLiteral("biçim"));
            assert.strictEqual(11, turkish.numberOfSynSetsWithLiteral("yurt"));
            assert.strictEqual(12, turkish.numberOfSynSetsWithLiteral("iğne"));
            assert.strictEqual(13, turkish.numberOfSynSetsWithLiteral("kol"));
            assert.strictEqual(14, turkish.numberOfSynSetsWithLiteral("alem"));
            assert.strictEqual(15, turkish.numberOfSynSetsWithLiteral("taban"));
            assert.strictEqual(16, turkish.numberOfSynSetsWithLiteral("yer"));
            assert.strictEqual(17, turkish.numberOfSynSetsWithLiteral("ağır"));
            assert.strictEqual(18, turkish.numberOfSynSetsWithLiteral("iş"));
            assert.strictEqual(19, turkish.numberOfSynSetsWithLiteral("dökmek"));
            assert.strictEqual(20, turkish.numberOfSynSetsWithLiteral("kaldırmak"));
            assert.strictEqual(21, turkish.numberOfSynSetsWithLiteral("girmek"));
            assert.strictEqual(22, turkish.numberOfSynSetsWithLiteral("gitmek"));
            assert.strictEqual(23, turkish.numberOfSynSetsWithLiteral("vermek"));
            assert.strictEqual(24, turkish.numberOfSynSetsWithLiteral("olmak"));
            assert.strictEqual(25, turkish.numberOfSynSetsWithLiteral("bırakmak"));
            assert.strictEqual(26, turkish.numberOfSynSetsWithLiteral("çıkarmak"));
            assert.strictEqual(27, turkish.numberOfSynSetsWithLiteral("kesmek"));
            assert.strictEqual(28, turkish.numberOfSynSetsWithLiteral("açmak"));
            assert.strictEqual(33, turkish.numberOfSynSetsWithLiteral("düşmek"));
            assert.strictEqual(38, turkish.numberOfSynSetsWithLiteral("atmak"));
            assert.strictEqual(39, turkish.numberOfSynSetsWithLiteral("geçmek"));
            assert.strictEqual(44, turkish.numberOfSynSetsWithLiteral("çekmek"));
            assert.strictEqual(50, turkish.numberOfSynSetsWithLiteral("tutmak"));
            assert.strictEqual(59, turkish.numberOfSynSetsWithLiteral("çıkmak"));
        });
        it('testGetSynSetsWithPartOfSpeech', function() {
            assert.strictEqual(43869, turkish.getSynSetsWithPartOfSpeech(Pos.NOUN).length);
            assert.strictEqual(17772, turkish.getSynSetsWithPartOfSpeech(Pos.VERB).length);
            assert.strictEqual(12410, turkish.getSynSetsWithPartOfSpeech(Pos.ADJECTIVE).length);
            assert.strictEqual(2549, turkish.getSynSetsWithPartOfSpeech(Pos.ADVERB).length);
            assert.strictEqual(1552, turkish.getSynSetsWithPartOfSpeech(Pos.INTERJECTION).length);
            assert.strictEqual(68, turkish.getSynSetsWithPartOfSpeech(Pos.PRONOUN).length);
            assert.strictEqual(61, turkish.getSynSetsWithPartOfSpeech(Pos.CONJUNCTION).length);
            assert.strictEqual(30, turkish.getSynSetsWithPartOfSpeech(Pos.PREPOSITION).length);
        });
        it('testGetInterlingual', function() {
            assert.strictEqual(1, turkish.getInterlingual("ENG31-05674544-n").length);
            assert.strictEqual(2, turkish.getInterlingual("ENG31-00220161-r").length);
            assert.strictEqual(3, turkish.getInterlingual("ENG31-02294200-v").length);
            assert.strictEqual(4, turkish.getInterlingual("ENG31-06205574-n").length);
            assert.strictEqual(5, turkish.getInterlingual("ENG31-02687605-v").length);
            assert.strictEqual(6, turkish.getInterlingual("ENG31-01099197-n").length);
            assert.strictEqual(7, turkish.getInterlingual("ENG31-00587299-n").length);
            assert.strictEqual(9, turkish.getInterlingual("ENG31-02214901-v").length);
            assert.strictEqual(10, turkish.getInterlingual("ENG31-02733337-v").length);
            assert.strictEqual(19, turkish.getInterlingual("ENG31-00149403-v").length);
        });
        it('testFindPathToRoot', function() {
            assert.strictEqual(1, turkish.findPathToRoot(turkish.getSynSetWithId("TUR10-0814560")).length);
            assert.strictEqual(2, turkish.findPathToRoot(turkish.getSynSetWithId("TUR10-0755370")).length);
            assert.strictEqual(3, turkish.findPathToRoot(turkish.getSynSetWithId("TUR10-0516010")).length);
            assert.strictEqual(4, turkish.findPathToRoot(turkish.getSynSetWithId("TUR10-0012910")).length);
            assert.strictEqual(5, turkish.findPathToRoot(turkish.getSynSetWithId("TUR10-0046370")).length);
            assert.strictEqual(6, turkish.findPathToRoot(turkish.getSynSetWithId("TUR10-0186560")).length);
            assert.strictEqual(7, turkish.findPathToRoot(turkish.getSynSetWithId("TUR10-0172740")).length);
            assert.strictEqual(8, turkish.findPathToRoot(turkish.getSynSetWithId("TUR10-0195110")).length);
            assert.strictEqual(9, turkish.findPathToRoot(turkish.getSynSetWithId("TUR10-0285060")).length);
            assert.strictEqual(10, turkish.findPathToRoot(turkish.getSynSetWithId("TUR10-0066050")).length);
            assert.strictEqual(11, turkish.findPathToRoot(turkish.getSynSetWithId("TUR10-0226380")).length);
            assert.strictEqual(12, turkish.findPathToRoot(turkish.getSynSetWithId("TUR10-0490230")).length);
            assert.strictEqual(13, turkish.findPathToRoot(turkish.getSynSetWithId("TUR10-1198750")).length);
            assert.strictEqual(12, turkish.findPathToRoot(turkish.getSynSetWithId("TUR10-0412120")).length);
            assert.strictEqual(13, turkish.findPathToRoot(turkish.getSynSetWithId("TUR10-1116690")).length);
            assert.strictEqual(13, turkish.findPathToRoot(turkish.getSynSetWithId("TUR10-0621870")).length);
            assert.strictEqual(14, turkish.findPathToRoot(turkish.getSynSetWithId("TUR10-0822980")).length);
            assert.strictEqual(15, turkish.findPathToRoot(turkish.getSynSetWithId("TUR10-0178450")).length);
            assert.strictEqual(16, turkish.findPathToRoot(turkish.getSynSetWithId("TUR10-0600460")).length);
            assert.strictEqual(17, turkish.findPathToRoot(turkish.getSynSetWithId("TUR10-0656390")).length);
        });
    });
});

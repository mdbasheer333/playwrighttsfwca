
import { createJsonObjectFromFolder } from "../../utils/testdataloader";
import { test, expect } from "../baseTest";


test('add address test', { tag: ['@sanity'] }, async ({ loginPageObject, addressPageObject, testData }) => {
        await addressPageObject.addTheAddress(testData["input2"]);
});


test.describe('this is @sanityparam', async () => {
        let tJsonDataAll = await createJsonObjectFromFolder('src/data/json');
        let tJsonData=tJsonDataAll["input2"];
        for (let index = 0; index < tJsonData.length; index++) {
                const testData = tJsonData[index];
                test(`add address test ${testData["fname"]}`, { tag: ['@sanityparam'] }, async ({ loginPageObject, addressPageObject }) => {
                        await addressPageObject.addTheAddress(testData);
                });
        }
});

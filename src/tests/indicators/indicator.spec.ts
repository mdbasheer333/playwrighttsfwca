
import { createJsonObjectFromFolder } from "../../utils/testdataloader";
import { test, expect } from "../baseTest";


test('add address test', { tag: ['@sanity123'] }, async ({ loginPageObject, addressPageObject, testCsvData }) => {
        let dataObj1 = addressPageObject.getDataObjectFromCsv(testCsvData, "customers2", 1);
        let dataObj2 = addressPageObject.getDataMapFromCsv(testCsvData, "customers2", 1);
        console.log('data parsed');        
        let dataObj3 = addressPageObject.getDataObjectFromCsv(testCsvData, "customers223", 1);
        //await addressPageObject.addTheAddress(dataObj1);
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

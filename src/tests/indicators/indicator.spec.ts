
import { test, expect } from "../baseTest";


test('add address test',{tag:['@sanity']}, async ({loginPageObject, addressPageObject, testData}) => {        
        await addressPageObject.addTheAddress(testData["input2"]);
});


import { test, expect } from "./baseTest";


test('login and check the home page title',{tag:['@smoke']} ,async ({ page, loginPageObject}) => {
        expect(await page.title()).toBe('My Account');
});

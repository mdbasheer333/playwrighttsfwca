import { test, expect } from "./baseTest";

const indicatorValues = process.env["Indicators"]!
        ? process.env["Indicators"]!.split(";")
        : [];

for (const indicator of indicatorValues) {
        test(`login and check the home page title INDICATOR ${indicator}`, { tag: ['@smoke'] }, async ({ page, loginPageObject }) => {
                expect(await page.title()).toBe('My Account');
        });
}

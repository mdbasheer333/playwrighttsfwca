import { test as base, expect } from '@playwright/test';
import crypto from 'crypto';
import { secretKey, ivHex } from "../utils/passwordencrypt";
import LoginPage from '../pages/pageobjects/loginpage';
import AddressPage from "../pages/pageobjects/addresspage";
import { createJsonObjectFromFolder, createCsvDataFromFolder, createExcelDataFromFolder } from '../utils/testdataloader'

import * as allure from "allure-js-commons";
import { ContentType } from "allure-js-commons";

import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const env = process.env.NODE_ENV || 'qa';  

const envPath = resolve(__dirname, '../../config/.env.' + env);
dotenv.config({ path: envPath });

const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(secretKey, 'hex'), Buffer.from(ivHex, 'hex'));
let decrypted = decipher.update(process.env.SECRET_KEY!, 'hex', 'utf8');
decrypted += decipher.final('utf8');

const envVars = { ...process.env };

type CustomFixture={
    envConfigData:any,
    testData:any,
    testCsvData:any,
    testExlData:any,
    loginPageObject:LoginPage,
    addressPageObject:AddressPage
}

const test = base.extend<CustomFixture>({

    page: async ({ page }, use, testInfo) => {
        await page.goto(process.env.APP_URL!);
        await use(page);
        if (testInfo.status == 'failed') {
            let screenshotPath = './test-results/' + testInfo.title + '_failed_screenshot.png';
            console.log('screenshot path is ' + screenshotPath);
            let screenshot = await page.screenshot({ path: screenshotPath, fullPage: false });
            await test.info().attach('screenshot', {
                body: screenshot,
                contentType: 'image/png',
            });
        }
    },

    envConfigData: async ({ }, use: (data: any) => Promise<void>) => {
        await use(envVars);
    },

    testData: async ({}, use: (data: any) => Promise<void>) => {
        let tData = await createJsonObjectFromFolder('./src/data/json')
        await use(tData);
    },

    testCsvData: async ({ }, use: (data: any) => Promise<void>) => {
        let tCsvData = await createCsvDataFromFolder('./src/data/csv')
        await use(tCsvData);
    },

    testExlData: async ({ }, use: (data: any) => Promise<void>) => {
        let tExlData = await createExcelDataFromFolder('./src/data/excel')
        await use(tExlData);
    },

    loginPageObject: async ({ page }, use) => {
        const loginPageObject = new LoginPage(page);
        await loginPageObject.login(process.env.USER_ID!, decrypted);
        await use(loginPageObject);
        await loginPageObject.logout();
    },

    addressPageObject: async ({ page }, use) => {
        const addressPageObject = new AddressPage(page);
        await use(addressPageObject);
    }

});

export { test, expect };

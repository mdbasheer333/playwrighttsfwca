import { Page, test } from "@playwright/test";
import { attachment, step as allurestep, ContentType, logStep } from "allure-js-commons";
import AllureLogger from "../../global/logger";


export class BasePage extends AllureLogger{

    readonly page: Page;

    constructor(page: Page) {
        super();
        this.page = page;
    }

    public getDataObjectFromCsv(data: Object[], fileName: string, index: number): Object {
        if (!data.hasOwnProperty(fileName)) {
            throw new Error(`${fileName} does not exists in given test data object, pls check file exists with given name`);
        }
        if (index > data[fileName].length) {
            throw new Error(`test data of ${fileName} has max size of ${data[fileName].length} but looking for ${index}`);
        }
        let parsedData = {}
        for (const obj of Object.entries(data[fileName][index])) {
            parsedData[obj[0]] = obj[1];
        }
        return parsedData;
    }

    public getDataMapFromCsv(data: Object[], fileName: string, index: number): Map<string, any> {
        if (!data.hasOwnProperty(fileName)) {
            throw new Error(`${fileName} does not exists in given test data object, pls check file exists with given name`);
        }
        if (index > data[fileName].length) {
            throw new Error(`test data of ${fileName} has max size of ${data[fileName].length} but looking for ${index}`);
        }
        let parsedData = new Map<string, any>();
        for (const obj of Object.entries(data[fileName][index])) {
            parsedData.set(obj[0], obj[1]);
        }
        return parsedData;
    }

}

import { Page, test } from "@playwright/test";

export class BasePage {

    readonly page: Page;

    constructor(page: Page) {
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

export function step(stepName?: string) {
    return function decorator(
        target: Function,
        context: ClassMethodDecoratorContext
    ) {
        return function replacementMethod(...args: any) {
            const name = `${stepName || (context.name as string)} (${this.name})`
            return test.step(name, async () => {
                return await target.call(this, ...args)
            })
        }
    }
}

/**
 * @typedef {import('@playwright/test').Page} Page
 */

export default class BasePage {

    /**
     * @param {Page} page
     */

    constructor(page) {
        this.page = page;
    }

}

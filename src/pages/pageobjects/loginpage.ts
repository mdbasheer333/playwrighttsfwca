import { Page } from "@playwright/test";
import LoginPageLocators from '../locators/loginpagelocators';
import { BasePage } from './basepage';


export default class LoginPage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    async login(userid: string, password: string): Promise<void> {
        await this.logStep('login');
        await this.page.locator(LoginPageLocators.MY_ACCOUNT_LINK).click();
        await this.page.locator(LoginPageLocators.EMAIL_INPUT).fill(userid);
        await this.page.locator(LoginPageLocators.PASSWORD_INPUT).fill(password);
        await this.page.locator(LoginPageLocators.LOGIN_BUTTON).click();
    }

    async logout(): Promise<void> {
        await this.logStep('logout');
        await this.page.waitForTimeout(3000);
        await this.page.locator(LoginPageLocators.LOGOUT_LINK).click();
        await this.page.waitForTimeout(3000);
        await this.page.locator(LoginPageLocators.CONTINUE_BUTTON).click();
        await this.page.waitForTimeout(3000);
    }

}

import { Page} from "@playwright/test";
import LoginPageLocators from '../locators/loginpagelocators';
import {BasePage,step} from './basepage';


export default class LoginPage extends BasePage {
  
    public name = "LoginPage Page POM"

    constructor(page: Page) {        
        super(page);
    }

    @step('this is to login to application')
    async login(userid:string, password:string):Promise<void> {
        await this.page.locator(LoginPageLocators.MY_ACCOUNT_LINK).click();
        await this.page.locator(LoginPageLocators.EMAIL_INPUT).fill(userid);
        await this.page.locator(LoginPageLocators.PASSWORD_INPUT).fill(password);
        await this.page.locator(LoginPageLocators.LOGIN_BUTTON).click();
    }

    @step('this is to logout of application')
    async logout():Promise<void> {
        await this.page.waitForTimeout(3000);
        await this.page.locator(LoginPageLocators.LOGOUT_LINK).click();
        await this.page.waitForTimeout(3000);
        await this.page.locator(LoginPageLocators.CONTINUE_BUTTON).click();
        await this.page.waitForTimeout(3000);
    }

}

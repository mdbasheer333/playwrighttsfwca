import AddressPageLocators from '../locators/addresspagelocators';
import BasePage from './basepage';


export default class AddressPage extends BasePage {

    constructor(page) {
        super(page);
    }

    async addTheAddress(data) {
        await this.page.locator(AddressPageLocators.EDIT_ADDR_BOOK_LINK).click();
        await this.page.locator(AddressPageLocators.NEW_ADDR_BUTTON).click();
        await this.page.locator(AddressPageLocators.FNAME_INPUT).fill(data['fname']);
        await this.page.locator(AddressPageLocators.LNAME_INPUT).fill(data['lname']);
        await this.page.locator(AddressPageLocators.COMPANY_INPUT).fill(data['company']);
        await this.page.locator(AddressPageLocators.ADDR1_INPUT).fill(data['addr1']);
        await this.page.locator(AddressPageLocators.ADDR2_INPUT).fill(data['addr2']);
        await this.page.locator(AddressPageLocators.CITY_INPUT).fill(data['city']);
        await this.page.locator(AddressPageLocators.POSTAL_CODE_INPUT).fill(data['postal_code']);
        await this.page.locator(AddressPageLocators.COUNTRY_DRPDOWN).waitFor({ timeout: 5000 });
        await this.page.locator(AddressPageLocators.COUNTRY_DRPDOWN).selectOption({ label: data['country'] });
        await this.page.locator(AddressPageLocators.COUNTRY_DRPDOWN).waitFor({ timeout: 5000 });
        await this.page.locator(AddressPageLocators.ZONE_DRPDOWN).selectOption({ label: data['state'] });
        await this.page.locator(AddressPageLocators.CONTINUE_BUTTON).click();
    }

}

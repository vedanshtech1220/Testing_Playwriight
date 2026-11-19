import {Page} from "@playwright/test";
import {checkOutPageLocators} from "../locators/checkOutPageLocators";

export class CheckOutPage{
    constructor(private page :Page){}

    async getCheckoutElements(){
        return {
            pageInfo : this.page.locator(checkOutPageLocators.pageInfo),
            cancel : this.page.locator(checkOutPageLocators.cancelButton),
            continue : this.page.locator(checkOutPageLocators.continueButton),

        }
    }


    async fillCheckoutDetails(firstName : string, lastName : string, postalCode : string){
        await this.page.fill(checkOutPageLocators.firstName,firstName);
        await this.page.fill(checkOutPageLocators.lastName,lastName);
        await this.page.fill(checkOutPageLocators.postalCode,postalCode);

    }

    async clickOnCancel(){
        await this.page.click(checkOutPageLocators.continueButton);
    }

    async clickOnContinue(){
        await this.page.click(checkOutPageLocators.continueButton);
    }

    async getErrorMessage(){
        return await this.page.locator(checkOutPageLocators.errMsg).textContent();
    }
}


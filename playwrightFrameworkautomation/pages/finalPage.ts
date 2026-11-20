import { finalpageLocators } from "../locators/finalPageLocators";
import { Page } from "@playwright/test";

export class FinalPage{
    constructor (private page : Page){}

    async getFinalPageElements(){
        return {
            pageInfo : this.page.locator(finalpageLocators.pageInfo),
            successMsg : this.page.locator(finalpageLocators.successMsg),
            backHomeBtn : this.page.locator(finalpageLocators.backHomeBtn)
        }
    }

async getSuccessMsgText() {
    const text = await this.page.locator(finalpageLocators.successMsg).textContent();
    return text;
}

    async clickOnBackHomeBtn(){
        await this.page.locator(finalpageLocators.backHomeBtn).click();

    }
}
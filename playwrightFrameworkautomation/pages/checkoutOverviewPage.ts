import {Page} from '@playwright/test';
import { checkoutOverviewLocators } from '../locators/checkoutOverviewlocators';    

export class CheckoutOverviewPage {
    constructor(private page: Page){}

    async getCheckoutOverviewElements() {
        return {
            pageInfo : await this.page.locator(checkoutOverviewLocators.pageInfo),
            cancelButton : await this.page.locator(checkoutOverviewLocators.cancelButton),
            finishButton : await this.page.locator(checkoutOverviewLocators.finishButton),
        }
    }

    async getOverviewProducts(){
        const AllNames = await this.page.locator(checkoutOverviewLocators.productNames).allTextContents();
        const Alldescriptions = await this.page.locator(checkoutOverviewLocators.productDescriptions).allTextContents();
        const Allprices = await this.page.locator(checkoutOverviewLocators.productPrices).allTextContents();
                
        const allCartProducts = AllNames.map((_,i)=>({
        name : AllNames[i].trim(),
        description : Alldescriptions[i].trim(),
        price : Allprices[i].trim()
    }));
                
    return allCartProducts;
    }

    async getItemTotal(){
        const text = await this.page.locator(checkoutOverviewLocators.itemTotal).textContent();
        return parseFloat(text!.replace('Item total: $', "").trim());

    }

    async getTax(){
        const text = await this.page.locator(checkoutOverviewLocators.tax).textContent();
        return parseFloat(text!.replace('Item total: $', "").trim());

    }

    async getTotal(){
        const text = await this.page.locator(checkoutOverviewLocators.total).textContent();
        return parseFloat(text!.replace('Item total: $', "").trim());
    }
    async clickCancel(){
        await this.page.locator(checkoutOverviewLocators.cancelButton).click();

    }

    async clickFinish(){
        await this.page.locator(checkoutOverviewLocators.finishButton).click();
    }

}

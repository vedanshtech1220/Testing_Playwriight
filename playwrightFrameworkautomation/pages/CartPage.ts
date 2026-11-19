import {Page} from '@playwright/test';
import {cartPageLocators} from '../locators/cartPageLocators';

export class CartPage{
    constructor(private page: Page){}



    async clickOnContinueShopping(){
        await this.page.locator(cartPageLocators.continueShoppingButton).click();
    }

    async getcartPageElements( ){
        return {
            cartTittle :  this.page.locator(cartPageLocators.cartTittle),
            shoppingCart : this.page.locator(cartPageLocators.continueShoppingButton),
            checkout : this.page.locator(cartPageLocators.checkOutButton),
        }
    }

    async getCartProducts(){
                const AllNames = await this.page.locator(cartPageLocators.productNames).allTextContents();
                const Alldescriptions = await this.page.locator(cartPageLocators.productDescriptions).allTextContents();
                const Allprices = await this.page.locator(cartPageLocators.productPrices).allTextContents();
        
                const allCartProducts = AllNames.map((_,i)=>({
                    name : AllNames[i].trim(),
                    description : Alldescriptions[i].trim(),
                    price : Allprices[i].trim()
                }));
        
                return allCartProducts;
    }

    async removeFirstProduct(){
        await this.page.locator(cartPageLocators.removeButton).first().click();
    }


    async clickCheckoutButton(){
        await this.page.locator(cartPageLocators.checkOutButton).click();
    }
}

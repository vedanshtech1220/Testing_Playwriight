import {Page} from "@playwright/test";

import{ProductPageLocators} from '../locators/ProductPageLocators';

export class ProductPage
{
    constructor(private page : Page)
    {

    }

    async logout()
    {
        await this.page.click(ProductPageLocators.settingicon);
        await this.page.click(ProductPageLocators.logoutLink);
    }

    async openAboutPage()
    {
         await this.page.click(ProductPageLocators.settingicon);
         await this.page.click(ProductPageLocators.aboutLink);
    }

    async validateAllProductsDisplayed(){
        const names = await this.page.locator(ProductPageLocators.productNames).allTextContents();
        const descriptions = await this.page.locator(ProductPageLocators.productDescriptions).allTextContents();
        const prices = await this.page.locator(ProductPageLocators.productPrices).allTextContents();
        const buttonCount = await this.page.locator(ProductPageLocators.addToCartButtons).count();

        if (names.length === 0)
            throw new Error("no new product dound");

        if (names.length !== descriptions.length || names.length !== prices.length || names.length !== buttonCount)
            throw new Error("inconsistent product information");
    }

    async addOnlyFirstProductToCart(){
        await this.page.locator(ProductPageLocators.addToCartButtons).first().click();
    }

    async addAllProductsToCart(){
        const buttons = this.page.locator(ProductPageLocators.addToCartButtons);
        const count = await buttons.count();

        for (let i = 0; i<count; i++){
            await buttons.nth(i).click();
            await this.page.waitForTimeout(3000);
        }
    }

    async addSpecificProductsToCart(productName:string[]){
        const addProducts = this.page.locator(ProductPageLocators.productNames);
        const count = await addProducts.count();

        for (let i = 0; i<count; i++){
            const name = await addProducts.nth(i).textContent();
            if (name && productName.includes(name.trim())){
                await this.page.locator(ProductPageLocators.addToCartButtons).nth(i).click();
                await this.page.waitForTimeout(3000);
            }
        }
    }

    async filterByNameAtoZ(){
        await this.page.selectOption(ProductPageLocators.filterDropdown, "az");
    }
    async filterByNameZtoA(){
        await this.page.selectOption(ProductPageLocators.filterDropdown, "za");
    }
    
    async filterByPriceLowToHigh(){
        await this.page.selectOption(ProductPageLocators.filterDropdown, "lohi");
    }

    async filterByPriceHighToLow(){
        await this.page.selectOption(ProductPageLocators.filterDropdown, "hilo");
    }

    async getProductNames(){
        return await this.page.locator(ProductPageLocators.productNames).allTextContents();
    }

    async getProductPrices(){
        const prices = await this.page.locator(ProductPageLocators.productPrices).allTextContents();
        return prices.map(price => parseFloat(price.replace('$', '')));
    }


    async clickOnCartLink(){
        await this.page.click(ProductPageLocators.cartLink);
    }


    async getFirstProductDetails(){
        const name =await this.page.locator(ProductPageLocators.productNames).first().textContent();
        const description = await this.page.locator(ProductPageLocators.productDescriptions).first().textContent();
        const prices = await this.page.locator(ProductPageLocators.productPrices).first().textContent();


        return {
            name : name?.trim(),
            description :description?.trim(),
            price : prices?.trim()
        }
    }

    async getAllProductDetails(){
        const AllNames = await this.page.locator(ProductPageLocators.productNames).allTextContents();
        const Alldescription = await this.page.locator(ProductPageLocators.productDescriptions).allTextContents();
        const Allprices = await this.page.locator(ProductPageLocators.productPrices).allTextContents();

        const allProducts = AllNames.map((_,i)=>({
            name : AllNames[i].trim(),
            description : Alldescription[i].trim(),
            price : Allprices[i].trim()
        }));

        return allProducts;
        //array of object banay hai

    }
    async getSpecificProductDetails(productName:string[]){
        const AllNames = await this.page.locator(ProductPageLocators.productNames).allTextContents();
        const Alldescription = await this.page.locator(ProductPageLocators.productDescriptions).allTextContents();
        const Allprices = await this.page.locator(ProductPageLocators.productPrices).allTextContents();

        const allProducts = AllNames.map((_,i)=>({
            name : AllNames[i].trim(),
            description : Alldescription[i].trim(),
            price : Allprices[i].trim()
        }));

        return allProducts.filter(p => productName.includes(p.name));
        //array of object banay hai

    }

    }


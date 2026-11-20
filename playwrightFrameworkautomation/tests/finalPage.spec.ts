import {test,expect,Page} from '@playwright/test';
import {ProductPage} from '../pages/ProductPage';
import {LoginPage} from '../pages/LoginPage';
import {LoginLocators} from '../locators/LoginLocators';
import {BASE_URL,USERNAME,PASSWORD} from '../utils/envConfig';
import { ProductPageLocators } from '../locators/ProductPageLocators';
import { productsToCart } from '../test-data/product';
import { CartPage } from '../pages/CartPage';
import { CheckOutPage } from '../pages/checkOutPage';
import {checkoutData} from '../test-data/checkoutData'; 
import { CheckoutOverviewPage } from '../pages/checkoutOverviewPage';
import { FinalPage } from '../pages/finalPage';

test.describe('Final Page after checkout validation', ()=>{
    let loginPage : LoginPage
    let productPage: ProductPage
    let cartPage: CartPage
    let checkoutPage: CheckOutPage
    let checkoutOverview : CheckoutOverviewPage
    let finalPage : FinalPage


test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page);
        productPage = new ProductPage(page);
        cartPage = new CartPage(page);
        checkoutPage = new CheckOutPage(page);
        checkoutOverview = new CheckoutOverviewPage(page);
        finalPage = new FinalPage(page);

        await page.goto(BASE_URL);
        await loginPage.login(USERNAME,PASSWORD);
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        await productPage.addOnlyFirstProductToCart();
        await productPage.clickOnCartLink();
        await cartPage.clickCheckoutButton();
        await checkoutPage.fillCheckoutDetails(checkoutData.firstName,checkoutData.lastName,checkoutData.postalCode);
        await checkoutPage.clickOnContinue();
        await checkoutOverview.clickFinish();


    })
    test ('validate checkout overview page Ui and url', async({page})=>{
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html')
        const element = await finalPage.getFinalPageElements();
        
        await expect(element.backHomeBtn).toBeVisible()
        await expect(element.successMsg).toBeVisible()
        await expect(element.pageInfo).toBeVisible()


    })

    test.only('validate the success Message', async ({page})=>{
        const message = await finalPage.getSuccessMsgText();
        expect(message).toBe ("Thank you for your order!")
    })

    test ('validate back to Home button', async({page})=>{
        await finalPage.clickOnBackHomeBtn();
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
    })



})






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



test.describe('cart page validation', ()=>{
    let loginPage : LoginPage
    let productPage: ProductPage
    let cartPage: CartPage
    let checkoutPage: CheckOutPage


test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page);
        productPage = new ProductPage(page);
        cartPage = new CartPage(page);
        checkoutPage = new CheckOutPage(page);

        await page.goto(BASE_URL);
        await loginPage.login(USERNAME,PASSWORD);
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        await productPage.addOnlyFirstProductToCart();
        await productPage.clickOnCartLink();
})
 
test('Validate checkout page UI ELements and url', async({page})=>{
    await cartPage.clickCheckoutButton();
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
    const elements = await checkoutPage.getCheckoutElements();
    await expect(elements.cancel).toBeVisible();
    await expect(elements.pageInfo).toBeVisible();
    await expect(elements.continue).toBeVisible();
})

test ('Validate cancel button functionality', async({page})=>{
    await cartPage.clickCheckoutButton();
    await checkoutPage.clickOnCancel();
    await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");

})

test('Validate continue button functionality', async({page})=>{
    await cartPage.clickCheckoutButton();
    await checkoutPage.fillCheckoutDetails(checkoutData.firstName,checkoutData.lastName,checkoutData.postalCode);
    await checkoutPage.clickOnContinue();
})


test.only('validate error message when clicking on continue with no data', async({page}) => {
    await cartPage.clickCheckoutButton();
    await checkoutPage.clickOnContinue();
    const error = await checkoutPage.getErrorMessage();
    expect(error?.trim()).toBe("Error: First Name is required");
})


})

import {test,expect} from '@playwright/test';
import {ProductPage} from '../pages/ProductPage';
import {LoginPage} from '../pages/LoginPage';
import {LoginLocators} from '../locators/LoginLocators';
import {BASE_URL,USERNAME,PASSWORD} from '../utils/envConfig';
import { ProductPageLocators } from '../locators/ProductPageLocators';
import { productsToCart } from '../test-data/product';


test.describe('product page validation', ()=>{
    let loginPage : LoginPage
    let productPage: ProductPage

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page);
        productPage = new ProductPage(page);

        await page.goto(BASE_URL);
        await loginPage.login(USERNAME,PASSWORD);
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    })

    test('validate log out page or funtionality', async({page})=>{
        productPage.logout();
        await expect(page.locator(LoginLocators.loginButton)).toBeVisible();
    })

    test('validate about page and navigateback', async ({page})=>{
        await productPage.openAboutPage();
        await expect(page.locator(ProductPageLocators.requestDemoButton)).toBeVisible();
        await expect(page.locator(ProductPageLocators.tryifFreeButton)).toBeVisible();
        await page.goBack();
        await expect(page.locator(ProductPageLocators.settingicon)).toBeVisible();
    })

    test('validate product page',async ({page})=>{
        await productPage.validateAllProductsDisplayed();
        await productPage.addOnlyFirstProductToCart();
        await productPage.addAllProductsToCart();
    })

        test('validate adding some specific products to cart from product page',async ({page})=>{
        await productPage.addSpecificProductsToCart(productsToCart);
    })
})
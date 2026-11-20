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


test.describe('Checkout Overview  validation', ()=>{
    let loginPage : LoginPage
    let productPage: ProductPage
    let cartPage: CartPage
    let checkoutPage: CheckOutPage
    let checkoutOverview : CheckoutOverviewPage


test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page);
        productPage = new ProductPage(page);
        cartPage = new CartPage(page);
        checkoutPage = new CheckOutPage(page);
        checkoutOverview = new CheckoutOverviewPage(page);

        await page.goto(BASE_URL);
        await loginPage.login(USERNAME,PASSWORD);
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        await productPage.addOnlyFirstProductToCart();
        await productPage.clickOnCartLink();
        await cartPage.clickCheckoutButton();
        await checkoutPage.fillCheckoutDetails(checkoutData.firstName,checkoutData.lastName,checkoutData.postalCode);
        await checkoutPage.clickOnContinue();


    })

    test('validate checkout overview page UI ELements and url', async({page})=>{
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
        const elements = await checkoutOverview.getCheckoutOverviewElements();
        await expect(elements.pageInfo).toBeVisible();
        await expect(elements.cancelButton).toBeVisible();
        await expect(elements.finishButton).toBeVisible();
    })

    test('validate cancel button functionality', async({page})=>{
        await checkoutOverview.clickCancel();
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");


    })

    test('validating items total in checkout overview page',async({page}) =>{
        const overviewProducts = await checkoutOverview.getOverviewProducts(); 
        const calculatedTotal = await overviewProducts.reduce((sum,{price}) => sum + parseFloat(price.replace('$', "")),0)
        const UIItemTotal = await checkoutOverview.getItemTotal();
        expect(calculatedTotal).toBe(UIItemTotal);

    })

    test.only('validate final total (ItemTotal+tax)',async({page}) => {
        
        const itemTotal = await checkoutOverview.getItemTotal();
        const tax = await checkoutOverview.getTax();
        const finalTotal = await checkoutOverview.getTotal();

        const expectedFinalTotal = itemTotal + tax;
        expect(finalTotal).toBe(expectedFinalTotal);
    })
})






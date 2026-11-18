import {test,expect,Page} from '@playwright/test';
import {ProductPage} from '../pages/ProductPage';
import {LoginPage} from '../pages/LoginPage';
import {LoginLocators} from '../locators/LoginLocators';
import {BASE_URL,USERNAME,PASSWORD} from '../utils/envConfig';
import { ProductPageLocators } from '../locators/ProductPageLocators';
import { productsToCart } from '../test-data/product';
import { CartPage } from '../pages/CartPage';


test.describe('cart page validation', ()=>{
    let loginPage : LoginPage
    let productPage: ProductPage
    let cartPage: CartPage

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page);
        productPage = new ProductPage(page);
        cartPage = new CartPage(page);

        await page.goto(BASE_URL);
        await loginPage.login(USERNAME,PASSWORD);
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    })

    test('validate cart page and ui elements',async ({page})=>{
        await productPage.addOnlyFirstProductToCart();
        await productPage.clickOnCartLink();
        await expect(page).toHaveURL( 'https://www.saucedemo.com/cart.html');
        const ui = cartPage.getcartPageElements()
        await expect((await ui).cartTittle).toBeVisible();
        expect((await ui).shoppingCart).toBeVisible();
        expect((await ui).checkout).toBeVisible();
    })

        test('validate continue shopping',async ({page})=>{
        await productPage.addOnlyFirstProductToCart();
        await productPage.clickOnCartLink();
        await cartPage.clickOnContinueShopping();
        await expect(page).toHaveURL( 'https://www.saucedemo.com/inventory.html');

    })

        test('validate First product in cart page ',async ({page})=>{
            const firstProduct = await productPage.getFirstProductDetails();
            await productPage.addOnlyFirstProductToCart();
            await productPage.clickOnCartLink();
            const cartProducts = await cartPage.getCartProducts();
            expect(cartProducts[0]).toEqual(firstProduct);

        })

        test('validate all product in cart page',async ({page})=>{
            const allProductsDetails = await productPage.getAllProductDetails();
            await productPage.addAllProductsToCart();
            await productPage.clickOnCartLink();
            const cartProducts = await cartPage.getCartProducts();
            expect(cartProducts).toEqual(allProductsDetails);


    })

        test('validate specific product in cartPage',async ({page})=>{
            const getSpecificProductDetails = await productPage.getSpecificProductDetails(productsToCart);
            await productPage.addSpecificProductsToCart(productsToCart);
            await productPage.clickOnCartLink();
            const cartProducts = await cartPage.getCartProducts();
            expect(cartProducts).toEqual(getSpecificProductDetails);
    })

        test.only('validate remove product funtionality',async ({page})=>
            {
            await productPage.addAllProductsToCart();
            await productPage.clickOnCartLink();

                const initialProducts = await cartPage.getCartProducts();
                expect(initialProducts.length).toBeGreaterThan(0);
                await cartPage.removeFirstProduct();

                const updatedCartProduct = await cartPage.getCartProducts();
                expect(updatedCartProduct.length).toBe(initialProducts.length - 1);
                expect(updatedCartProduct).not.toEqual(initialProducts);

    })
})
import {LoginLocators} from '../locators/LoginLocators';
import {Page} from '@playwright/test';

export class LoginPage{
    constructor(private page: Page){

    }

    async login(username : string, password: string)
    {
        await this.page.locator(LoginLocators.userNameInput).fill(username);
        await this.page.locator(LoginLocators.passwordInput).fill(password);
        await this.page.locator(LoginLocators.loginButton).click();
    }
}
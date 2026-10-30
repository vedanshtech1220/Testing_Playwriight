import { test, expect } from '@playwright/test';

test('applitools login', async ({ page }) => {
  await page.goto('https://demo.applitools.com/');

  await page.getByPlaceholder('Enter your username').fill('ved');
  await page.getByPlaceholder('Enter your password').fill('1234');
  await page.locator('#log-in').click();

  await expect(page).toHaveURL(/app/);
  await expect(page.getByText('Recent Transactions')).toBeVisible();
});

test('orangehrm login', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await page.pause();
  await page.getByPlaceholder('Username').fill('Admin');
  await page.getByPlaceholder('Password').fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL(/dashboard/);
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
});
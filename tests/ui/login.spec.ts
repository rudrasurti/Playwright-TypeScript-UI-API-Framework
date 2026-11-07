import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';

test.describe('Login', () => {
  test('standard user can log in @smoke', async ({ page }) => {
    const login = new LoginPage(page);
    await login.open();
    await login.login('standard_user');
    await new InventoryPage(page).expectLoaded();
  });

  test('locked out user sees an error', async ({ page }) => {
    const login = new LoginPage(page);
    await login.open();
    await login.login('locked_out_user');
    await login.expectError('Sorry, this user has been locked out');
  });

  test('wrong password sees an error', async ({ page }) => {
    const login = new LoginPage(page);
    await login.open();
    await login.login('standard_user', 'wrong_password');
    await login.expectError('Username and password do not match');
  });
});

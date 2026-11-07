import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CheckoutPage } from '../../pages/CheckoutPage';

test.beforeEach(async ({ page }) => {
  const login = new LoginPage(page);
  await login.open();
  await login.login('standard_user');
});

test('inventory shows 6 products', async ({ page }) => {
  await expect(new InventoryPage(page).items).toHaveCount(6);
});

test('add two items updates the cart badge @smoke', async ({ page }) => {
  const inventory = new InventoryPage(page);
  await inventory.addToCart('sauce-labs-backpack');
  await inventory.addToCart('sauce-labs-bike-light');
  await expect(inventory.cartBadge).toHaveText('2');
});

test('sort by price low to high', async ({ page }) => {
  const inventory = new InventoryPage(page);
  await inventory.sort.selectOption('lohi');
  const prices = await inventory.prices();
  expect(prices).toEqual([...prices].sort((a, b) => a - b));
});

test('complete checkout end to end @smoke', async ({ page }) => {
  const inventory = new InventoryPage(page);
  const checkout = new CheckoutPage(page);
  await inventory.addToCart('sauce-labs-backpack');
  await checkout.openCart();
  await checkout.checkout('Rudra', 'Surti', '390001');
  await checkout.expectOrderComplete();
});

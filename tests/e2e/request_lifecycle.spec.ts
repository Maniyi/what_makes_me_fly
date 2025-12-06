import { test, expect } from '@playwright/test';

test('request lifecycle', async ({ page }) => {
    // 1. Create Request
    await page.goto('/requests/new');
    await page.getByRole('button', { name: 'Add' }).first().click();
    await page.getByLabel('Customer Name').fill('John Doe');
    await page.getByRole('button', { name: 'Submit Request' }).click();
    await expect(page).toHaveURL('/requests');
    await expect(page.getByText('John Doe')).toBeVisible();

    // 2. Attendant Accepts
    await page.goto('/attendant');
    await expect(page.getByText('John Doe')).toBeVisible();
    await page.getByRole('button', { name: 'Accept' }).click();
    await expect(page.getByText('accepted')).toBeVisible();

    // 3. Attendant Delivers
    await page.getByRole('button', { name: 'Mark Delivered' }).click();
    await expect(page.getByText('Completed')).toBeVisible();
});

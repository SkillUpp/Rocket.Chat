import { Page } from '@playwright/test';

import { Users } from './fixtures/userStates';
import { expect, test } from './utils/test';

test.use({ storageState: Users.admin.state });

test.describe.serial('admin-rooms', () => {
	let adminPage: Page;
	test.beforeAll(async ({ browser }) => {
		adminPage = await browser.newPage({ storageState: Users.admin.state });
		await adminPage.goto('/home');
		await adminPage.waitForSelector('[data-qa-id="home-header"]');
	});
	test('should display the Rooms Table', async ({ page }) => {
		await page.goto('/admin/rooms');

		await expect(page.locator('text=Rooms Table')).toBeVisible();
	});
});

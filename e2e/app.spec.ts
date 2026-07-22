import { expect, test } from '@playwright/test';

test.describe('People Directory', () => {
	test('landing page links to both app modes', async ({ page }) => {
		await page.goto('/');

		await expect(
			page.getByRole('heading', { name: 'Welcome to the People Directory' })
		).toBeVisible();
		await expect(
			page.getByRole('link', { name: '/appWithSSRData', exact: true })
		).toHaveAttribute('href', '/appWithSSRData');
		await expect(
			page.getByRole('link', { name: '/appWithoutSSRData', exact: true })
		).toHaveAttribute('href', '/appWithoutSSRData');
		await expect(
			page.getByRole('link', { name: '/appWithoutSSRDataPretty', exact: true })
		).toHaveAttribute('href', '/appWithoutSSRDataPretty');
		await expect(
			page.getByRole('link', { name: '/appWithSSRDataPretty', exact: true })
		).toHaveAttribute('href', '/appWithSSRDataPretty');

	});

	test('appWithoutSSRData serves the app shell and client bundle', async ({ page }) => {
		const response = await page.goto('/appWithoutSSRData');

		expect(response?.ok()).toBeTruthy();
		await expect(page.locator('#app')).toBeAttached();
		await expect(page.locator('script[src="/client.js"]')).toBeAttached();
	});
});

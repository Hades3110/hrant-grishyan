import { test, expect } from '@playwright/test';

test('home page renders correctly', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'Hrant Grishyan' })).toBeVisible();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
});

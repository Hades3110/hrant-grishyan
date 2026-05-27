import { test, expect } from '@playwright/test';

test('home page renders correctly', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('html')).toHaveAttribute('lang', /^en/);

  await expect(
    page.getByRole('heading', {
      level: 1,
      name: /senior frontend engineer/i,
    }),
  ).toBeVisible();

  await expect(page.getByText(/Hrant Grishyan · Yerevan, Armenia/)).toBeVisible();

  await expect(page.getByRole('link', { name: /view experience/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /get in touch/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /download cv/i })).toBeVisible();

  await expect(page.getByRole('contentinfo')).toBeVisible();
  await expect(page.getByRole('link', { name: /source on github/i })).toBeVisible();
});

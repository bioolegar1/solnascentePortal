import { test, expect } from '@playwright/test';

test('Não exibe Carreiras na navegação e rodapé (home)', async ({ page }) => {
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  await expect(page.getByRole('link', { name: 'Carreiras' })).toHaveCount(0);
  await expect(page.locator('footer').getByRole('link', { name: 'Carreiras' })).toHaveCount(0);
});

test('Não exibe Carreiras em Produtos', async ({ page }) => {
  await page.goto('http://localhost:3000/produtos', { waitUntil: 'networkidle' });
  await expect(page.getByRole('link', { name: 'Carreiras' })).toHaveCount(0);
  await expect(page.locator('footer').getByRole('link', { name: 'Carreiras' })).toHaveCount(0);
});

test('Não exibe Carreiras em História', async ({ page }) => {
  await page.goto('http://localhost:3000/historia', { waitUntil: 'networkidle' });
  await expect(page.getByRole('link', { name: 'Carreiras' })).toHaveCount(0);
  await expect(page.locator('footer').getByRole('link', { name: 'Carreiras' })).toHaveCount(0);
});
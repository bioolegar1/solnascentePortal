import { test, expect } from '@playwright/test';
import crypto from 'crypto';

function makeAdminToken(username: string = 'admin') {
  const secret = process.env.ADMIN_SESSION_SECRET || 'local-dev-session-secret';
  const payload = { role: 'admin', username, timestamp: Date.now() };
  const json = JSON.stringify(payload);
  const sig = crypto.createHmac('sha256', secret).update(json).digest('hex');
  const token = Buffer.from(JSON.stringify({ p: payload, s: sig })).toString('base64');
  return token;
}

async function ensureAdminSession(page) {
  const token = makeAdminToken('Admsolnascente');
  await page.context().addCookies([
    { name: 'sn_admin_token', value: token, url: 'http://localhost:3000' }
  ]);
}

async function navigate(page, path: string) {
  await page.goto(`http://localhost:3000${path}`, { waitUntil: 'networkidle' });
}

test('CRUD de produtos e filtro público (usuário deslogado)', async ({ page }) => {
  const unique = Date.now();
  const nome = `Produto Teste ${unique}`;
  const descricao = 'Descrição inicial';
  const categoriaInicial = 'Molhos';
  const categoriaEditada = 'Temperos';
  const imagemUrl = 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=300&q=80&fit=crop&crop=entropy';

  await ensureAdminSession(page);
  await navigate(page, '/admin/dashboard');
  await expect(page.getByRole('button', { name: 'Adicionar Produto' })).toBeVisible();

  await page.getByRole('button', { name: 'Adicionar Produto' }).click();
  await page.getByPlaceholder('Nome').fill(nome);
  await page.getByPlaceholder('Descrição').fill(descricao);
  await page.getByPlaceholder('Categoria').fill(categoriaInicial);
  await page.getByPlaceholder('URL da imagem 1').fill(imagemUrl);
  await page.getByRole('button', { name: 'Salvar' }).click();
  await expect(page.getByText('Produto cadastrado com sucesso')).toBeVisible();
  const row = page.locator(`tr:has-text("${nome}")`).first();
  await expect(row).toBeVisible();

  await row.locator('button').nth(1).click();
  await page.getByPlaceholder('Categoria').fill(categoriaEditada);
  const checkbox = page.locator('input[type="checkbox"]');
  if (await checkbox.isChecked()) {
    await checkbox.click();
  }
  await page.getByRole('button', { name: 'Salvar' }).click();
  await expect(page.getByText('Produto atualizado com sucesso')).toBeVisible();
  await expect(page.locator(`tr:has-text("${nome}")`).locator('td').nth(2)).toContainText('Indisponível');
  await expect(page.locator(`tr:has-text("${nome}")`).locator('td').nth(1)).toContainText(categoriaEditada);

  const sanitizeUrl = 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=300&q=80&fit=crop&crop=entropy';
  const resList = await page.request.get('http://localhost:3000/api/products');
  const jsonList = await resList.json();
  const items = Array.isArray(jsonList.data) ? jsonList.data : [];
  for (const it of items) {
    const imgs = (it.images || []).filter(Boolean);
    if (imgs.some((u: string) => u.includes('via.placeholder.com'))) {
      await page.request.put(`http://localhost:3000/api/products?id=${it.id}`, {
        data: { images: [sanitizeUrl], image: sanitizeUrl }
      });
    }
  }

  await page.context().clearCookies();
  await navigate(page, '/produtos');
  await page.waitForTimeout(1500);
  await page.getByPlaceholder('Buscar produtos...').fill(categoriaEditada);
  await expect(page.getByText(nome)).toBeVisible();
  await page.getByPlaceholder('Buscar produtos...').fill('Molhos');
  await expect(page.getByText(nome)).toHaveCount(0);

  await ensureAdminSession(page);
  await navigate(page, '/admin/dashboard');
  const row2 = page.locator(`tr:has-text("${nome}")`).first();
  await expect(row2).toBeVisible();
  await row2.locator('button').nth(2).click();
  await expect(page.locator(`tr:has-text("${nome}")`)).toHaveCount(0);

  await page.context().clearCookies();
  await navigate(page, '/produtos');
  await page.waitForTimeout(1500);
  await page.getByPlaceholder('Buscar produtos...').fill(categoriaEditada);
  await expect(page.getByText(nome)).toHaveCount(0);
});
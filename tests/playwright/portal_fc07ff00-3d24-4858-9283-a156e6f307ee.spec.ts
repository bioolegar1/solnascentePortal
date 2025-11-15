
import { test } from '@playwright/test';
import { expect } from '@playwright/test';

test('Portal_2025-11-15', async ({ page, context }) => {
  
    // Navigate to URL
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });

    // Navigate to URL
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });

    // Navigate to URL
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });

    // Navigate to URL
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
});
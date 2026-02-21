import { test, expect } from '@playwright/test';

const pages = [
  { name: 'home',          path: '/' },
  { name: 'brochures',     path: '/brochures' },
  { name: 'folders',       path: '/folders' },
  { name: 'logos',         path: '/logos-identity' },
  { name: 'newsletters',   path: '/newsletters' },
  { name: 'trade-show',    path: '/trade-show-display' },
  { name: 'contact',       path: '/contact' },
];

for (const page of pages) {
  test(`${page.name} renders without console errors`, async ({ page: p }) => {
    const errors: string[] = [];
    p.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
    p.on('pageerror', err => errors.push(err.message));
    await p.goto(page.path);
    await p.waitForLoadState('networkidle');
    expect(errors).toEqual([]);
  });

  test(`${page.name} visual snapshot`, async ({ page: p }) => {
    await p.goto(page.path);
    await p.waitForLoadState('networkidle');
    await expect(p).toHaveScreenshot(`${page.name}.png`, {
      fullPage: true,
      maxDiffPixelRatio: 0.02,
    });
  });
}

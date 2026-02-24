import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  // Desktop nav
  test.describe('Desktop (1440px)', () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
    });

    test('portfolio dropdown opens on hover', async ({ page }) => {
      await page.goto('/');
      const portfolio = page.locator('.site-nav__dropdown-toggle');
      await portfolio.hover();
      const menu = page.locator('.site-nav__dropdown-menu');
      await expect(menu).toBeVisible();
      const brochures = page.locator('.site-nav__dropdown-menu a:has-text("Brochures")');
      await expect(brochures).toBeVisible();
    });

    test('nav links navigate correctly', async ({ page }) => {
      await page.goto('/');
      await page.locator('nav a:has-text("Home")').click();
      await expect(page).toHaveURL('/');
      await page.goto('/');
      await page.locator('nav a:has-text("Contact Us")').click();
      await expect(page).toHaveURL('/contact/');
    });

    test('footer portfolio links work', async ({ page }) => {
      await page.goto('/');
      const footerLink = page.locator('.site-footer__nav a:has-text("Brochures")');
      await expect(footerLink).toBeVisible();
      await footerLink.click();
      await expect(page).toHaveURL('/brochures/');
    });
  });

  // Mobile nav
  test.describe('Mobile (390px)', () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
    });

    test('hamburger opens drawer', async ({ page }) => {
      await page.goto('/');
      const toggle = page.locator('.mobile-nav-toggle');
      await toggle.click();
      const drawer = page.locator('.mobile-nav-drawer');
      await expect(drawer).toBeVisible();
    });

    test('portfolio submenu expands', async ({ page }) => {
      await page.goto('/');
      const toggle = page.locator('.mobile-nav-toggle');
      await toggle.click();
      const portfolioBtn = page.locator('#mobile-portfolio-toggle');
      await portfolioBtn.click();
      const subitems = page.locator('.mobile-nav-subitems');
      await expect(subitems).toHaveClass(/open/);
    });

    test('nav links work', async ({ page }) => {
      await page.goto('/');
      const toggle = page.locator('.mobile-nav-toggle');
      await toggle.click();
      const contact = page.locator('.mobile-nav-links a:has-text("Contact Us")');
      await contact.click();
      await expect(page).toHaveURL('/contact/');
    });
  });
});

import { test, expect } from '@playwright/test';

/**
 * Console Error Check
 *
 * Tests the live site for console errors and warnings.
 *
 * Run against live site:
 *   TEST_URL=https://www.skrinakcreative.com npm run test:console
 *
 * Run against local:
 *   npm run test:console
 */

const PAGES = [
  '/',
  '/brochures/',
  '/contact/',
  '/folders/',
  '/logos-identity/',
  '/newsletters/',
  '/trade-show-display/',
];

test.describe('Console Errors & Warnings', () => {
  PAGES.forEach((pageRoute) => {
    test(`${pageRoute || 'home'} should have no console errors or warnings`, async ({
      page,
    }) => {
      const consoleMessages: { type: string; text: string }[] = [];

      // Capture all console messages
      page.on('console', (msg) => {
        const msgType = msg.type();
        // Only capture errors and warnings
        if (msgType === 'error' || msgType === 'warning') {
          const text = msg.text();
          // Ignore browser-level WebGL GPU driver messages from Leaflet's
          // map canvas. Matched by the browser's own [.WebGL-0x...] prefix
          // to avoid suppressing any app-generated messages that mention GL.
          if (/\[\.WebGL-.*?\].*GL Driver Message/i.test(text)) return;
          consoleMessages.push({ type: msgType, text });
        }
      });

      // Navigate to page
      await page.goto(pageRoute || '/', { waitUntil: 'networkidle' });

      // Wait for document to be fully loaded + scripts to execute
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(3000); // Wait for JS execution

      // Report findings
      if (consoleMessages.length > 0) {
        const errorCount = consoleMessages.filter((m) => m.type === 'error')
          .length;
        const warningCount = consoleMessages.filter((m) => m.type === 'warning')
          .length;

        const details = consoleMessages
          .map((m) => `[${m.type.toUpperCase()}] ${m.text}`)
          .join('\n');

        expect(consoleMessages).toEqual(
          [],
          `Found ${errorCount} error(s) and ${warningCount} warning(s):\n${details}`
        );
      }
    });
  });
});

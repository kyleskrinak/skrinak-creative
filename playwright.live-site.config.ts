import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright config for testing against the LIVE Squarespace site.
 * Use this to baseline the current production design for pixel-faithful comparison.
 *
 * Run: npx playwright test --config=playwright.live-site.config.ts --update-snapshots
 */

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  retries: 0,
  snapshotDir: './tests/live-site-baselines',
  use: {
    baseURL: 'https://skrinakcreative.com',
  },
  projects: [
    {
      name: 'live-site',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});

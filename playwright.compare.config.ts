import { defineConfig, devices } from '@playwright/test';

/**
 * Compare local Astro build against live Squarespace baselines
 * Shows visual divergences between current Astro version and target design
 *
 * Run: npx playwright test --config=playwright.compare.config.ts
 */

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  retries: 0,
  snapshotDir: './tests/live-site-baselines', // Compare AGAINST live-site baselines
  use: {
    baseURL: 'http://localhost:4321', // Test LOCAL build
  },
  projects: [
    {
      name: 'compare-desktop',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'compare-tablet',
      use: { ...devices['iPad Pro'] },
    },
    {
      name: 'compare-mobile',
      use: { ...devices['iPhone 12'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:4321',
    reuseExistingServer: true,
  },
});

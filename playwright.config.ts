import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  retries: 0,
  use: {
    baseURL: process.env.TEST_URL || 'http://localhost:4321',
  },
  projects: [
    {
      name: 'desktop',
      use: { ...devices['Desktop Chrome'] }, // 1440px
    },
    {
      name: 'mobile',
      use: { ...devices['iPhone 12'] }, // 390px (below 640px breakpoint)
    },
  ],
  webServer: process.env.TEST_URL ? undefined : {
    command: 'npm run dev',
    url: 'http://localhost:4321',
    reuseExistingServer: true,
  },
});

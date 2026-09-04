import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  retries: 0,
  // CI gets the HTML report (uploaded as an artifact on failure by the
  // weekly-maintenance workflow); `open: never` keeps it from blocking
  // the runner. Local runs keep the lightweight `list` reporter.
  reporter: process.env.CI ? [['html', { open: 'never' }], ['list']] : 'list',
  use: {
    baseURL: process.env.TEST_URL || 'http://localhost:4322',
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
  // Run against production build (not dev server) to avoid Vite 7 dep
  // pre-bundling issues (504 Outdated Optimize Dep errors). Port 4322
  // intentionally differs from dev server (4321) to prevent conflicts.
  webServer: process.env.TEST_URL ? undefined : {
    command: 'npm run build && npx astro preview --port 4322',
    url: 'http://localhost:4322',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    // Astro 7.2+ auto-daemonizes `preview` when it detects an AI coding
    // agent (e.g. Claude Code) via env vars, which makes the launcher
    // process exit immediately and breaks Playwright's webServer wait.
    // ASTRO_PREVIEW_BACKGROUND short-circuits that detection so preview
    // stays in the foreground Playwright expects.
    env: { ASTRO_PREVIEW_BACKGROUND: '1' },
  },
});

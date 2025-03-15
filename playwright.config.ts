// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({

  testDir: './src/tests/',
  testMatch: ['**/*.spec.ts'],

  /* Run tests in files in parallel */
  fullyParallel: false,

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,

  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : 1,

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['html', { open: 'never', outputFolder: './test-results/htmlreport' }], ['json', { outputFile: './test-results/jsonreport/test-results.json' }], ['allure-playwright', { detail:false, outputFolder: 'allure-results' }]],
  outputDir: './test-results/pwartifacts',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  timeout:0,
  globalTimeout:0,
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'retain-on-failure',
    screenshot:"only-on-failure",
    actionTimeout:60000,
    navigationTimeout:60000
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name:'prod_setUp',
      testDir:"src/tests",
      testMatch:"globalSetup.ts"
    },
    {
      name:'qa_setUp',
      testDir:"src/tests",
      testMatch:"globalSetup.ts"
    },
    {
      name:'stage_setUp',
      testDir:"src/tests",
      testMatch:"globalSetup.ts"
    },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'stage_chromium',
      dependencies:["stage_setUp"],
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'qa_chromium',
      dependencies:["qa_setUp"],
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'prod_chromium',
      dependencies:["prod_setUp"],
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* Test against mobile viewports. */
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },

    /* Test against branded browsers. */
    {
      name: 'Microsoft Edge',
      use: { ...devices['Desktop Edge'], channel: 'msedge' },
    },
    {
      name: 'Google Chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },

});

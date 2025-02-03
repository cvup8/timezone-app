import { defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [["html", { outputFolder: "timezone-app/test-results" }]],
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "firefox",
      use: { 
        ...devices["Desktop Firefox"],
        isMobile: false
      },
    },
    {
      name: "webkit",
      use: { 
        ...devices["Desktop Safari"],
        isMobile: false
      },
    },
    {
      name: "Mobile Chrome",
      use: { 
        ...devices["Pixel 5"],
        isMobile: true
      },
    },
    {
      name: "Mobile Safari",
      use: {
        ...devices["iPhone 12"],
        isMobile: true
      },
    },
    {
      name: "Microsoft Edge",
      use: {
        ...devices["Desktop Edge"],
        channel: "msedge",
        isMobile: false
      },
    },
    {
      name: "Google Chrome",
      use: {
        ...devices["Desktop Chrome"],
        channel: "chrome",
        isMobile: false
      },
    },
  ],
});

import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    retries: {
      // Configure retry attempts for different modes
      runMode: 2, // Number of test retries to run in runMode (CI environments)
      openMode: 0, // Number of test retries in openMode (during cypress open)
    },
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 60000
  },
});

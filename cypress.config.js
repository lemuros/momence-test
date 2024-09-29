import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
    setupNodeEvents(on, config) {
      // https://stackoverflow.com/a/77661343
      on("before:browser:launch", (_browser, launchOptions) => {
        launchOptions.args = launchOptions.args.map((arg) => {
          if (arg.startsWith("--proxy-bypass-list")) {
            return "--proxy-bypass-list=<-loopback>";
          }

          return arg;
        });

        return launchOptions;
      });
    },
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});

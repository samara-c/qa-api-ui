import js from "@eslint/js";
import globals from "globals";

export default [
  {
    ignores: [
      "**/node_modules/**",
      "reports/**",
      "cypress/screenshots/**",
      "cypress/videos/**",
      "mobile/apps/**",
    ],
  },

  js.configs.recommended,

  {
    files: ["**/*.js"],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs",

      globals: {
        ...globals.node,
        ...globals.mocha,
        ...globals.browser,

        // Cypress
        cy: "readonly",
        Cypress: "readonly",
        expect: "readonly",

        // WebdriverIO
        $: "readonly",
        $$: "readonly",
        browser: "readonly",
        driver: "readonly",
      },
    },
  },
];
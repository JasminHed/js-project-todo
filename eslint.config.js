import js from "@eslint/js";
import globals from "globals";

export default [
  {
    ignores: ["node_modules", "dist", "build", "coverage"],
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    rules: {
      indent: ["error", 2]
    }
  }
];




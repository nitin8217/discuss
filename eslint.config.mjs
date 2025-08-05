import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "src/generated/**",
      "*.min.js",
      "dist/",
      "build/",
      ".next/",
      "node_modules/",
    ],
    rules: {
      "@next/next/no-img-element": "warn",
      "jsx-a11y/alt-text": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
      "react-hooks/exhaustive-deps": "warn"
    }
  },
];

export default eslintConfig;

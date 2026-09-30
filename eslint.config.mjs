import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // three.js scenes run an imperative frame loop: React Three Fiber's
  // useFrame mutates cameras, materials and buffers every frame by design,
  // and particle systems seed themselves with Math.random() once. The React
  // Compiler purity rules do not model that, so they are relaxed here and
  // only here. Everything outside components/scenes keeps the full rules.
  {
    files: ["components/scenes/**/*.tsx"],
    rules: {
      "react-hooks/purity": "off",
      "react-hooks/immutability": "off",
      "react-hooks/refs": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;

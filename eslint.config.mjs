import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    // Override eslint-config-next's "detect" setting with a static version so
    // eslint-plugin-react never calls the removed context.getFilename() API
    // (dropped in ESLint v10).
    settings: {
      react: { version: "19" },
    },
  },
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
];

export default eslintConfig;

import { createRequire } from "node:module";
const require = createRequire(import.meta.url);

/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
export const prettierConfig = {
  arrowParens: "avoid",
  bracketSameLine: false,
  bracketSpacing: true,
  endOfLine: "lf",
  jsxSingleQuote: false,
  printWidth: 120,
  proseWrap: "preserve",
  quoteProps: "as-needed",
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  tailwindFunctions: ["tv", "clsx", "cn"],
  trailingComma: "all",
  plugins: [
    require.resolve("@trivago/prettier-plugin-sort-imports"),
    require.resolve("prettier-plugin-sort-re-exports"),
    require.resolve("prettier-plugin-tailwindcss"),
  ],
  importOrder: [
    "^vitest",
    "^es-toolkit",
    "<THIRD_PARTY_MODULES>",
    "^@(.*)$",
    "^[.]/",
    "^[.]{2,}/",
  ],
  importOrderSortSpecifiers: true,
  importOrderCaseInsensitive: true,
  overrides: [
    {
      files: "src/**/{index,compat}.ts",
      options: {
        plugins: [require.resolve("prettier-plugin-sort-re-exports")],
      },
    },
  ],
};

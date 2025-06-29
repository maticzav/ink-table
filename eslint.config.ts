import eslint from "@eslint/js";
import nPlugin from "eslint-plugin-n";
import tsEslint from "typescript-eslint";
import vitest from "@vitest/eslint-plugin";
import stylistic from "@stylistic/eslint-plugin";
import perfectionist from "eslint-plugin-perfectionist";
import unusedImports from "eslint-plugin-unused-imports";

export default tsEslint.config(
	eslint.configs.recommended,
	tsEslint.configs.recommended,
	nPlugin.configs["flat/recommended-module"],
	{
		ignores: [
			"**/lib",
			"**/build",
			"**/.nadle",
			"**/__temp__",
			"**/node_modules/",
			"**/.docusaurus",
			"packages/nadle/test/__fixtures__/mixed-ts-js/nadle.config.js"
		]
	},
	{
		linterOptions: {
			reportUnusedDisableDirectives: "error"
		},
		plugins: {
			stylistic,
			perfectionist,
			unusedImports
		},
		languageOptions: {
			parserOptions: {
				project: ["**/tsconfig.eslint.json"]
			}
		},
		rules: {
			curly: "error",
			"sort-keys": "off",
			"no-console": "warn",
			"max-params": ["error", 4],
			"no-restricted-imports": ["error", { patterns: ["consola"] }],

			"n/hashbang": "off",
			"n/no-missing-import": "off",
			"n/no-unpublished-import": "off",
			"n/prefer-node-protocol": "error",
			"n/no-unsupported-features/node-builtins": "off",

			"unusedImports/no-unused-imports": "error",

			"@typescript-eslint/no-namespace": "off",
			"@typescript-eslint/no-explicit-any": "warn",
			"@typescript-eslint/no-empty-object-type": "off",
			"@typescript-eslint/explicit-member-accessibility": "error",
			"@typescript-eslint/consistent-type-imports": ["error", { prefer: "type-imports", fixStyle: "inline-type-imports" }],
			"@typescript-eslint/no-unused-vars": [
				"error",
				{ argsIgnorePattern: "^_", ignoreRestSiblings: true, destructuredArrayIgnorePattern: "^_", caughtErrorsIgnorePattern: "^error$" }
			],

			"perfectionist/sort-named-imports": ["error", { type: "line-length" }],
			"perfectionist/sort-objects": ["error", { type: "line-length", partitionByNewLine: true }],
			"perfectionist/sort-exports": ["error", { type: "line-length", partitionByNewLine: true }],
			"perfectionist/sort-interfaces": ["error", { type: "line-length", partitionByNewLine: true }],
			"perfectionist/sort-object-types": ["error", { type: "line-length", partitionByNewLine: true }],
			"perfectionist/sort-imports": [
				"error",
				{ type: "line-length", newlinesBetween: "always", groups: ["side-effect", "builtin", "external", ["parent", "sibling", "index"]] }
			],

			"stylistic/padding-line-between-statements": [
				"error",
				{ prev: "*", blankLine: "always", next: ["if", "while", "for", "switch", "try", "do", "return"] },
				{ next: "*", prev: "block-like", blankLine: "always" }
			]
		}
	},
	{
		files: ["packages/nadle/src/**"],
		rules: {
			"no-restricted-properties": [
				"error",
				{
					property: "cwd",
					object: "process",
					message: "Avoid using process.cwd()"
				},
				{
					property: "cwd",
					object: "Process",
					message: "Avoid using Process.cwd()"
				}
			]
		}
	},
	{
		rules: {
			"no-console": "off"
		},
		files: ["packages/sample-app/**", "packages/nadle/test/**", "packages/validators/**", "packages/examples/**"]
	},
	{
		files: ["packages/nadle/test/fixtures/**"],
		rules: {
			"no-restricted-imports": ["error", { patterns: ["../**/src/*"] }]
		}
	},
	{
		plugins: {
			vitest
		},
		files: ["**/test/**/*.test.ts"],
		rules: {
			...vitest.configs.recommended.rules,
			"vitest/expect-expect": [
				"error",
				{
					assertFunctionNames: ["expectPass", "expectFail", "expect"]
				}
			]
		}
	}
);

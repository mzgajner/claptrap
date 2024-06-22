import svelte from 'eslint-plugin-svelte'
import prettier from 'eslint-config-prettier'
import ts from 'typescript-eslint'
import eslint from '@eslint/js'
import globals from 'globals'

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  eslint.configs.recommended,
  ...ts.configs.recommended,
  ...svelte.configs['flat/recommended'],
  prettier,
  ...svelte.configs['flat/prettier'],
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    files: ['**/*.svelte'],
    languageOptions: {
      parserOptions: {
        parser: ts.parser,
      },
    },
  },
  {
    ignores: ['build/', '.svelte-kit/', 'dist/'],
  },
]

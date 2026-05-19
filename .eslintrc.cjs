/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  env: {
    es2021: true
  },
  overrides: [
    {
      files: ['api/**/*.ts'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: 'api/tsconfig.json',
        tsconfigRootDir: __dirname,
        sourceType: 'module'
      },
      plugins: ['@typescript-eslint/eslint-plugin'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended'
      ],
      env: {
        node: true,
        jest: true
      },
      rules: {
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off'
      }
    },
    {
      files: ['web/**/*.{vue,js,jsx,cjs,mjs,ts,tsx,cts,mts}'],
      extends: [
        'plugin:vue/vue3-essential',
        'eslint:recommended',
        '@vue/eslint-config-typescript',
        '@vue/eslint-config-prettier/skip-formatting'
      ],
      parserOptions: {
        ecmaVersion: 'latest',
        parser: '@typescript-eslint/parser'
      }
    }
  ]
}

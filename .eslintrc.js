/* eslint-disable no-magic-numbers */
const prodError = process.env.NODE_ENV === 'production' ? 'error' : 'off'
const devWarnProdError =
  process.env.NODE_ENV === 'production' ? 'error' : 'warn'
const prodWarn = process.env.NODE_ENV === 'production' ? 'warn' : 'off'
const paths = require('./config/paths')
module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2018,
    ecmaFeatures: {
      jsx: true,
      modules: true,
    },
    sourceType: 'module',
    allowImportExportEverywhere: true,
    babelOptions: {
      configFile: 'config/babel.config.js',
    },
  },
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },
  globals: {
    process: true,
  },
  settings: {
    'import/resolver': {
      node: {
        paths: paths.resolveModules,
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
    react: {
      version: 'detect',
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:unicorn/recommended',
    'prettier/react',
  ],
  plugins: ['compat', 'html', 'react-hooks'],
  rules: {
    curly: ['error', 'all'],
    'array-callback-return': 'error',
    camelcase: ['error', { properties: 'always' }],
    'compat/compat': 'error',
    complexity: ['error', 10],
    'consistent-return': 'error',
    'consistent-this': ['error', 'self'],
    'default-case': 'error',
    eqeqeq: ['error', 'smart'],
    'func-names': 'error',
    'func-style': ['error', 'declaration', { allowArrowFunctions: true }],
    'id-blacklist': ['error', 'cb'],
    'id-length': ['error', { exceptions: ['e', '_', '$', 'i'] }],
    'import/no-named-as-default': 'off',
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
      },
    ],
    'max-depth': ['error', 4],
    'max-nested-callbacks': ['error', 3],
    'max-statements': ['error', 30],
    'no-alert': 'error',
    'no-bitwise': 'error',
    'no-case-declarations': 'error',
    'no-class-assign': 'error',
    'no-console': 'off',
    'no-duplicate-imports': ['error', { includeExports: true }],
    'no-div-regex': 'error',
    'no-else-return': 'error',
    'no-empty': 'error',
    'no-empty-function': 'error',
    'no-eq-null': 'off',
    'no-extra-label': 'error',
    'no-implicit-coercion': 'error',
    'no-implicit-globals': 'error',
    'no-invalid-this': 'error',
    'no-loop-func': 'error',
    'no-lonely-if': 'error',
    'no-magic-numbers': ['error', { ignore: [-1, 0, 1, 100] }],
    'no-script-url': 'error',
    'no-shadow': 'error',
    'no-underscore-dangle': 'error',
    'no-useless-concat': 'error',
    'no-warning-comments': [
      prodWarn,
      {
        terms: ['todo', 'fixme'],
        location: 'start',
      },
    ],
    'no-var': 'error',
    'object-shorthand': ['error', 'always'],
    'operator-assignment': ['error', 'always'],
    'prefer-const': 'error',
    'prefer-rest-params': 'error',
    'prefer-spread': 'error',
    'prefer-template': 'error',
    'prettier/prettier': prodError,
    'react/prop-types': 'off',
    'react-hooks/exhaustive-deps': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'require-yield': 'error',
    'spaced-comment': 'off',
    'standard/computed-property-even-spacing': 'off',
    'standard/object-curly-even-spacing': 'off',
    'unicorn/prevent-abbreviations': 'off',
    'unicorn/filename-case': 'off',
    'unicorn/no-process-exit': 'off',
    'unicorn/explicit-length-check': 'off',
    'unicorn/catch-error-name': 'off',
    'jsx-a11y/no-autofocus': 'off',
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
        warnOnUnsupportedTypeScriptVersion: true,
      },
      plugins: ['@typescript-eslint/eslint-plugin'],
      settings: {
        'import/parsers': {
          '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
        'import/resolver': {
          typescript: {},
        },
      },
      rules: {
        // TODO these two cause trouble with type imports. disable until these are resolved:
        // https://github.com/alexgorbatchev/eslint-import-resolver-typescript/issues/17
        'import/no-unresolved': 'off',
        // https://github.com/benmosher/eslint-plugin-import/issues/1341
        'import/named': 'off',
        'import/default': 'off',
        'no-array-constructor': 'off',
        'no-useless-constructor': 'off',
        'no-unused-vars': 'off',
        'no-undef': 'off',
        '@typescript-eslint/no-angle-bracket-type-assertion': 'error',
        '@typescript-eslint/no-array-constructor': 'error',
        '@typescript-eslint/no-namespace': 'error',
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/no-unused-vars': [
          devWarnProdError,
          {
            args: 'none',
            ignoreRestSiblings: true,
          },
        ],
        '@typescript-eslint/no-useless-constructor': 'error',
      },
    },
    {
      files: ['.d.ts'],
      rules: {
        'import/export': 'off',
        'no-redeclare': 'off',
      },
    },
  ],
}

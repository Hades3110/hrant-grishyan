import { defineConfig, globalIgnores } from 'eslint/config';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';
import globals from 'globals';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

// eslint-config-next/core-web-vitals already registers:
// react, react-hooks, import, jsx-a11y, @next/next, @typescript-eslint
// We must NOT re-register those plugins — only extend with additional rules.

export default defineConfig([
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    'coverage/**',
    'playwright-report/**',
    'test-results/**',
    '.lighthouseci/**',
  ]),

  js.configs.recommended,
  ...nextVitals,
  ...nextTs,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,

  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        projectService: {
          allowDefaultProject: ['*.mjs', '*.js', 'lighthouserc.js'],
        },
      },
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      // TypeScript strictness beyond next/typescript defaults
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/ban-ts-comment': 'error',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'separate-type-imports' },
      ],

      // React
      'react/jsx-no-leaked-render': 'error',
      'react/self-closing-comp': 'warn',

      // Accessibility
      'jsx-a11y/no-autofocus': 'error',
      'jsx-a11y/anchor-is-valid': 'error',

      // Named exports for components; default only for Next.js file conventions
      'import/no-default-export': 'error',
    },
  },

  // Allow default exports in Next.js file conventions and config files
  {
    files: [
      'app/**/page.tsx',
      'app/**/layout.tsx',
      'app/**/loading.tsx',
      'app/**/error.tsx',
      'app/**/not-found.tsx',
      'app/**/opengraph-image.tsx',
      'app/**/robots.ts',
      'app/**/sitemap.ts',
      'app/**/icon.tsx',
      'next.config.ts',
      'vitest.config.ts',
      'playwright.config.ts',
      'commitlint.config.mjs',
      'lint-staged.config.mjs',
      'eslint.config.mjs',
    ],
    rules: {
      'import/no-default-export': 'off',
    },
  },

  prettierConfig,
]);

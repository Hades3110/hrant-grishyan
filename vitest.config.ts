import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    exclude: ['node_modules', 'e2e/**', '.next/**'],
    coverage: {
      provider: 'v8',
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
      exclude: [
        'app/**/layout.tsx',
        'app/**/page.tsx',
        'app/**/error.tsx',
        'app/**/loading.tsx',
        'app/**/not-found.tsx',
        'next.config.ts',
        '**/*.config.*',
        '.next/**',
        'e2e/**',
        'coverage/**',
      ],
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, '.'),
    },
  },
});

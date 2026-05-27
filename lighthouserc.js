/** @type {import('@lhci/cli').LighthouseRcConfig} */
module.exports = {
  ci: {
    collect: {
      startServerCommand: 'pnpm start',
      startServerReadyPattern: 'Ready in',
      url: ['http://localhost:3000'],
      numberOfRuns: 3,
      settings: {
        // Required for LCP/TBT trace collection in headless Chrome on Linux CI
        chromeFlags: '--no-sandbox --disable-dev-shm-usage',
      },
    },
    assert: {
      assertions: {
        // Performance score requires LCP/TBT trace — measured reliably on Linux CI only.
        // Local macOS headless Chrome cannot collect these traces (known environment limitation).
        'categories:performance': ['warn', { minScore: 1 }],
        'categories:accessibility': ['error', { minScore: 1 }],
        'categories:best-practices': ['error', { minScore: 1 }],
        'categories:seo': ['error', { minScore: 1 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};

import { describe, it, expect } from 'vitest';

import { getAppName } from '../version';

describe('getAppName', () => {
  it('returns the app identifier', () => {
    expect(getAppName()).toBe('hrant-grishyan');
  });
});

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getLastCommitDate, getCurrentYear } from '@/lib/build-info';

describe('getLastCommitDate', () => {
  it('calls git log with the correct format and returns trimmed stdout', () => {
    const exec = vi.fn().mockReturnValue('2026-05-20\n');
    expect(getLastCommitDate(exec)).toBe('2026-05-20');
    expect(exec).toHaveBeenCalledWith('git log -1 --format=%cd --date=short', {
      encoding: 'utf8',
    });
  });

  it('returns "unknown" when the executor throws', () => {
    const exec = vi.fn().mockImplementation(() => {
      throw new Error('not a git repository');
    });
    expect(getLastCommitDate(exec)).toBe('unknown');
  });
});

describe('getCurrentYear', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns the current calendar year as a number', () => {
    vi.setSystemTime(new Date('2026-05-27'));
    expect(getCurrentYear()).toBe(2026);
  });
});

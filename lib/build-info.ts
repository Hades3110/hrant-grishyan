import { execSync } from 'child_process';

type Executor = (cmd: string, opts: { encoding: 'utf8' }) => string;

export function getLastCommitDate(exec: Executor = execSync): string {
  try {
    return exec('git log -1 --format=%cd --date=short', { encoding: 'utf8' }).trim();
  } catch {
    return 'unknown';
  }
}

export function getCurrentYear(): number {
  return new Date().getFullYear();
}

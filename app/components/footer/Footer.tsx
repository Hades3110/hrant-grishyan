import { getLastCommitDate, getCurrentYear } from '@/lib/build-info';
import { GITHUB_URL } from '@/lib/constants';
import styles from './Footer.module.css';

export function Footer() {
  const commitDate = getLastCommitDate();
  const year = getCurrentYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <span className={styles.meta}>
          {'Built with Next.js · '}
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className={styles.link}>
            Source on GitHub
          </a>
        </span>
        <span className={styles.meta}>
          {commitDate !== 'unknown' && (
            <>
              {'Last updated '}
              <time dateTime={commitDate}>{commitDate}</time>
              {' · '}
            </>
          )}
          {'© '}
          {year}
        </span>
      </div>
    </footer>
  );
}

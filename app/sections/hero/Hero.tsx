import { CV_PATH } from '@/lib/constants';
import styles from './Hero.module.css';

const TECH_STACK = ['React', 'Next.js', 'TypeScript', 'Node.js'] as const;

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className={styles.hero}>
      <div className={styles.copy}>
        <p className={styles.eyebrow}>Hrant Grishyan · Yerevan, Armenia · Open to remote</p>

        <h1 id="hero-heading" className={styles.headline}>
          Senior Frontend Engineer building performance-critical React applications at enterprise
          scale.
        </h1>

        <p className={styles.intro}>
          Five years at EPAM Systems, where I built and maintained frontend for FindLaw (one of the
          largest US consumer legal information platforms), Westlaw (a legal research tool with
          40,000+ databases), and TVH (an e-commerce platform for industrial parts distribution). My
          focus has been Core Web Vitals — getting INP, LCP, and CLS to where they belong on
          high-traffic production sites — alongside payment integrations with Stripe, Recurly, and
          CyberSource, and accessibility compliance to WCAG and Section 508. I have stepped in as
          acting Team Lead during the lead&apos;s absence — owning delivery, reviewing architecture
          decisions, and getting junior engineers unstuck. The code in this repository is a
          demonstration of how I approach engineering when there are no constraints on doing it
          properly.
        </p>
      </div>

      <nav className={styles.actions} aria-label="Primary actions">
        <a href="#experience" className={styles.actionLink}>
          View experience <span aria-hidden="true">↓</span>
        </a>
        <a href="#contact" className={styles.actionLink}>
          Get in touch <span aria-hidden="true">↓</span>
        </a>
        <a
          href={CV_PATH}
          className={styles.actionLink}
          aria-label="Download CV (PDF)"
          download
          target="_blank"
          rel="noopener noreferrer"
        >
          Download CV
        </a>
      </nav>

      <ul className={styles.stack} aria-label="Tech stack">
        {TECH_STACK.map((tech) => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>
    </section>
  );
}

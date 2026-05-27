import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { Hero } from '@/app/sections/hero/Hero';
import { CV_PATH } from '@/lib/constants';

describe('Hero', () => {
  it('renders the h1 headline', () => {
    render(<Hero />);
    expect(
      screen.getByRole('heading', { level: 1, name: /senior frontend engineer/i }),
    ).toBeInTheDocument();
  });

  it('renders the eyebrow line', () => {
    render(<Hero />);
    expect(
      screen.getByText(/Hrant Grishyan · Yerevan, Armenia · Open to remote/),
    ).toBeInTheDocument();
  });

  it('renders the intro paragraph with key content', () => {
    render(<Hero />);
    const intro = screen.getByText(/Five years at EPAM Systems/);
    expect(intro).toBeInTheDocument();
    expect(intro.textContent).toContain('Core Web Vitals');
    expect(intro.textContent).toContain('CyberSource');
  });

  it('renders "View experience" CTA as anchor pointing to #experience', () => {
    render(<Hero />);
    const link = screen.getByRole('link', { name: /view experience/i });
    expect(link).toHaveAttribute('href', '#experience');
  });

  it('renders "Get in touch" CTA as anchor pointing to #contact', () => {
    render(<Hero />);
    const link = screen.getByRole('link', { name: /get in touch/i });
    expect(link).toHaveAttribute('href', '#contact');
  });

  it('renders "Download CV" CTA with correct href, aria-label, and download attributes', () => {
    render(<Hero />);
    const link = screen.getByRole('link', { name: /download cv/i });
    expect(link).toHaveAttribute('href', CV_PATH);
    expect(link).toHaveAttribute('aria-label', 'Download CV (PDF)');
    expect(link).toHaveAttribute('download');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders the tech stack list with four items', () => {
    render(<Hero />);
    const list = screen.getByRole('list', { name: /tech stack/i });
    const items = within(list).getAllByRole('listitem');
    expect(items).toHaveLength(4);
    const text = items.map((i) => i.textContent);
    expect(text).toEqual(expect.arrayContaining(['React', 'Next.js', 'TypeScript', 'Node.js']));
  });
});

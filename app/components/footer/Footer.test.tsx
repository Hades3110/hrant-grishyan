import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { GITHUB_URL } from '@/lib/constants';

vi.mock('@/lib/build-info', () => ({
  getLastCommitDate: () => '2026-05-20',
  getCurrentYear: () => 2026,
}));

async function renderFooter() {
  const { Footer } = await import('@/app/components/footer/Footer');
  render(<Footer />);
}

describe('Footer', () => {
  it('renders the footer landmark', async () => {
    await renderFooter();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('renders the mocked commit date', async () => {
    await renderFooter();
    expect(screen.getByText(/2026-05-20/)).toBeInTheDocument();
  });

  it('renders the mocked current year', async () => {
    await renderFooter();
    expect(screen.getByText(/© 2026/)).toBeInTheDocument();
  });

  it('renders "Built with Next.js" text', async () => {
    await renderFooter();
    expect(screen.getByText(/Built with Next\.js/i)).toBeInTheDocument();
  });

  it('renders the GitHub link with correct attributes', async () => {
    await renderFooter();
    const link = screen.getByRole('link', { name: /source on github/i });
    expect(link).toHaveAttribute('href', GITHUB_URL);
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});

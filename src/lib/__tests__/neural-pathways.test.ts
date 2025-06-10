import { render, screen } from '@testing-library/react';
import InvestmentPitch from '../components/InvestmentPitch';
import { act } from 'react-dom/test-utils';

describe('InvestmentPitch Component', () => {
  it('renders the Crisis section when currentSection is 0', () => {
    render(<InvestmentPitch />);

    // Ensure Crisis section content is rendered
    expect(screen.getByText(/Lives lost today/i)).toBeInTheDocument();
    expect(screen.getByText(/Every 11 minutes, someone dies by suicide/i)).toBeInTheDocument();
  });

  it('renders the Problem section when currentSection is 1', () => {
    render(<InvestmentPitch />);

    // Simulate scrolling to section 1
    act(() => {
      window.scrollY = window.innerHeight; // Move scroll to next section
      window.dispatchEvent(new Event('scroll'));
    });

    // Ensure Problem section content is rendered
    expect(screen.getByText(/The System Is BROKEN/i)).toBeInTheDocument();
    expect(screen.getByText(/Average crisis hotline wait time/i)).toBeInTheDocument();
    expect(screen.getByText(/Wait for therapy appointment/i)).toBeInTheDocument();
  });

  it('renders the Solution section when currentSection is 2', () => {
    render(<InvestmentPitch />);

    // Simulate scrolling to section 2
    act(() => {
      window.scrollY = 2 * window.innerHeight; // Move scroll to next section
      window.dispatchEvent(new Event('scroll'));
    });

    // Ensure Solution section content is rendered
    expect(screen.getByText(/FRANK/i)).toBeInTheDocument();
    expect(screen.getByText(/Friendly Robotic Anti-Nihilism Kompanion/i)).toBeInTheDocument();
    expect(screen.getByText(/0.3 Second Response/i)).toBeInTheDocument();
    expect(screen.getByText(/94% Crisis Detection/i)).toBeInTheDocument();
  });

  it('renders the Ask section when currentSection is 7', () => {
    render(<InvestmentPitch />);

    // Simulate scrolling to the last section
    act(() => {
      window.scrollY = 7 * window.innerHeight; // Move scroll to the final section
      window.dispatchEvent(new Event('scroll'));
    });

    // Ensure Ask section content is rendered
    expect(screen.getByText(/\$50M Series A/i)).toBeInTheDocument();
    expect(screen.getByText(/To save 10,000 lives in the next 12 months/i)).toBeInTheDocument();
    expect(screen.getByText(/Every second we wait, another life hangs in the balance./i)).toBeInTheDocument();
  });

  it('handles section transitions correctly using AnimatePresence', () => {
    render(<InvestmentPitch />);

    // Initial section (Crisis)
    expect(screen.getByText(/Lives lost today/i)).toBeInTheDocument();

    // Simulate scrolling to section 1 (Problem)
    act(() => {
      window.scrollY = window.innerHeight; // Move scroll to next section
      window.dispatchEvent(new Event('scroll'));
    });

    // Ensure Crisis section is removed and Problem section is rendered
    expect(screen.queryByText(/Lives lost today/i)).not.toBeInTheDocument();
    expect(screen.getByText(/The System Is BROKEN/i)).toBeInTheDocument();

    // Simulate scrolling to section 2 (Solution)
    act(() => {
      window.scrollY = 2 * window.innerHeight; // Move scroll to next section
      window.dispatchEvent(new Event('scroll'));
    });

    // Ensure Problem section is removed and Solution section is rendered
    expect(screen.queryByText(/The System Is BROKEN/i)).not.toBeInTheDocument();
    expect(screen.getByText(/FRANK/i)).toBeInTheDocument();
  });
});
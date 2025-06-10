import React from 'react';

const Financials: React.FC = () => {
  return (
    <section className="financials">
      <div style={{ padding: '60px 50px', textAlign: 'center' }}>
        <h1>Financial Metrics</h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--gray)' }}>
          FRANK combines SaaS-like unit economics with hardware defensibility, creating a venture-scale business addressing a massive humanitarian crisis.
        </p>
      </div>
      <div className="metrics-grid">
        {/* Financial metrics cards */}
      </div>
    </section>
  );
};

export default Financials;
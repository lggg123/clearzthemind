import React from 'react';

const ExecutiveSummary: React.FC = () => {
  return (
    <section className="executive-summary">
      <div style={{ padding: '60px 50px', textAlign: 'center' }}>
        <h1>Executive Summary</h1>
        <ul style={{ listStyleType: 'none', margin: '20px 0', padding: 0, fontSize: '1.2rem', color: 'var(--gray)' }}>
          <li><strong>Problem:</strong> 47,000 Americans die by suicide annually (one every 11 minutes).</li>
          <li><strong>Solution:</strong> 24/7 humanoid companion with 0.3s response time.</li>
          <li><strong>Market:</strong> $14.2B addressable market.</li>
          <li><strong>Traction:</strong> 94% crisis detection accuracy in testing.</li>
          <li><strong>Team:</strong> George Lugo.</li>
          <li><strong>Ask:</strong> $15M Series A.</li>
          <li><strong>Use:</strong> Manufacturing (200 units) + FDA approval.</li>
        </ul>
      </div>
    </section>
  );
};

export default ExecutiveSummary;
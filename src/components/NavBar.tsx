import React from 'react';

const NavigationBar: React.FC = () => {
  return (
    <nav className="nav">
      <div className="nav-content">
        <div className="logo">
          <h2 style={{ fontWeight: 900, color: 'var(--electric-blue)' }}>FRANK</h2>
        </div>
        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#product">Product</a>
          <a href="#financials" className="active">Financials</a>
          <a href="#team">Team</a>
          <a href="#contact">Contact</a>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
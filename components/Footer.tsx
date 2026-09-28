import React from 'react';

export default function Footer() {
  return (
    <footer className="editorial-footer-bar">
      <div className="editorial-container">
        <div className="footer-content-row">
          <div>AAKASH K — © <span id="current-year">2026</span>. ALL RIGHTS RESERVED.</div>
          <div className="footer-quote">“Nothing changes if nothing changes.”</div>
          <div>
            <a href="#hero" style={{ color: 'rgba(255, 255, 255, 0.6)', textDecoration: 'none' }}>
              BACK TO TOP ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

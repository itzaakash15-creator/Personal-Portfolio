import React from 'react';

export default function RoleHistory() {
  return (
    <div className="identity-history-row" id="identity-history-row" aria-hidden="true">
      <div className="history-grid-container">
        <div className="history-slot" id="history-slot-1"></div>
        <div className="history-slot" id="history-slot-2"></div>
        <div className="history-slot" id="history-slot-3"></div>
        <div className="history-slot" id="history-slot-4"></div>
      </div>
      <div className="history-collective-line" id="history-collective-line"></div>
    </div>
  );
}

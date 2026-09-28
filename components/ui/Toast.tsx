'use client';

import React from 'react';

interface ToastProps {
  message: string | null;
}

export default function Toast({ message }: ToastProps) {
  return (
    <div
      className={`toast-msg ${message ? 'show' : ''}`}
      id="toast"
      role="status"
      aria-live="polite"
    >
      {message || ''}
    </div>
  );
}

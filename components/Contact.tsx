'use client';

import React from 'react';
import { contactDetails } from '../data/socials';

interface ContactProps {
  onShowToast?: (msg: string) => void;
}

export default function Contact({ onShowToast }: ContactProps) {
  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contactDetails.email);
      onShowToast?.(`Email copied: ${contactDetails.email}`);
    } catch {
      onShowToast?.(contactDetails.email);
    }
  };

  const handleCopyPhone = async () => {
    try {
      await navigator.clipboard.writeText(contactDetails.phoneClean);
      onShowToast?.(`Phone copied: ${contactDetails.phone}`);
    } catch {
      onShowToast?.(contactDetails.phone);
    }
  };

  return (
    <section className="editorial-contact-section" id="contact">
      <div className="editorial-container">
        <div className="contact-hero-lockup">
          <span className="hook-kicker">INITIATE COLLABORATION</span>
          <h2 className="contact-main-headline">
            READY TO BUILD<br />
            SOMETHING EXTRAORDINARY?
          </h2>
          <p className="contact-subtitle">
            Direct, zero-friction connection. Whether you represent an agency, a growing brand, or need high-trust strategic positioning.
          </p>
        </div>

        {/* Direct Zero-Friction Channels */}
        <div className="contact-direct-channels">
          {/* Email Card */}
          <div
            className="contact-channel-card copy-email-btn"
            role="button"
            tabIndex={0}
            title="Click to copy email address"
            onClick={handleCopyEmail}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') handleCopyEmail();
            }}
          >
            <span className="channel-tag">DIRECT EMAIL // 1-CLICK COPY</span>
            <div className="channel-value">{contactDetails.email}</div>
            <div className="channel-action-hint">
              <span>CLICK TO COPY ADDRESS</span>
              <span>↗</span>
            </div>
          </div>

          {/* Phone Card */}
          <div
            className="contact-channel-card copy-phone-btn"
            role="button"
            tabIndex={0}
            title="Click to copy phone number"
            onClick={handleCopyPhone}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') handleCopyPhone();
            }}
          >
            <span className="channel-tag">DIRECT TELEPHONE // 1-CLICK COPY</span>
            <div className="channel-value">{contactDetails.phone}</div>
            <div className="channel-action-hint">
              <span>CLICK TO COPY NUMBER</span>
              <span>↗</span>
            </div>
          </div>
        </div>

        {/* Secondary Social Links */}
        <div className="contact-secondary-links">
          <a
            href="https://www.linkedin.com/in/aakashk15/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-editorial-outline"
          >
            LINKEDIN ↗
          </a>
          <a
            href="https://www.instagram.com/itzaakash_15?igsh=MWF5ODJ2dWR3ZzVpdA=="
            target="_blank"
            rel="noopener noreferrer"
            className="btn-editorial-outline"
          >
            INSTAGRAM ↗
          </a>
          <a href="/resume.html" className="btn-editorial">
            DOWNLOAD RESUME ↗
          </a>
        </div>
      </div>
    </section>
  );
}

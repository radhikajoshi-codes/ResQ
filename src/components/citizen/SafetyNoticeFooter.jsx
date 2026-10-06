import React from 'react';
import { Shield, AlertCircle, Heart, PhoneCall } from 'lucide-react';

export default function SafetyNoticeFooter({ onOpenSos, onReset }) {
  return (
    <footer style={{
      background: 'var(--navy-950)',
      borderTop: '1px solid var(--border-subtle)',
      padding: '2.5rem 0 3rem 0',
      marginTop: 'auto'
    }}>
      <div className="citizen-container">
        
        {/* Safety Disclaimer Banner */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.7)',
          border: '1px solid var(--border-card)',
          borderRadius: '14px',
          padding: '1.25rem 1.5rem',
          marginBottom: '2rem',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '1rem'
        }}>
          <div style={{ color: '#38bdf8', flexShrink: 0, marginTop: '2px' }}>
            <AlertCircle size={22} />
          </div>
          <div>
            <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.25rem' }}>
              Official Safety & Prototype Disclosure
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              <strong>ResQ is a prototype using simulated disaster data for demonstration purposes. It does not provide official emergency warnings or replace local emergency authorities.</strong> For live emergencies, follow sirens, civil defense orders, and directives from official first responders.
            </p>
          </div>
        </div>

        {/* Footer Brand & Links */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.25rem',
          fontSize: '0.85rem',
          color: 'var(--text-dim)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <img 
              src="/resq-logo.png" 
              alt="ResQ AI Disaster Intelligence" 
              style={{
                width: '30px',
                height: '30px',
                borderRadius: '8px',
                objectFit: 'cover',
                border: '1px solid rgba(56, 189, 248, 0.3)'
              }}
            />
            <span style={{ fontWeight: 700, color: '#ffffff' }}>ResQ</span>
            <span>—</span>
            <span style={{ color: 'var(--text-muted)' }}>"Know your risk. Know what to do."</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <button
              type="button"
              onClick={onReset}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#38bdf8',
                cursor: 'pointer',
                fontSize: '0.82rem',
                fontWeight: 600,
                textDecoration: 'underline'
              }}
            >
              Start New Assessment
            </button>

            <button
              type="button"
              onClick={onOpenSos}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#ef4444',
                cursor: 'pointer',
                fontSize: '0.82rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem'
              }}
            >
              <PhoneCall size={13} />
              <span>Emergency SOS</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}

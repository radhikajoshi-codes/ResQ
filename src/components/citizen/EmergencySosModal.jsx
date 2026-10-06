import React from 'react';
import { PhoneCall, X, AlertTriangle, ShieldAlert, HeartPulse, Flame } from 'lucide-react';

export default function EmergencySosModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const contacts = [
    {
      name: 'National Emergency Services (US / Global)',
      number: '911',
      desc: 'Immediate life-threatening fire, police, or medical emergency',
      color: '#ef4444',
      icon: ShieldAlert
    },
    {
      name: 'European Emergency Number',
      number: '112',
      desc: 'International emergency dispatch',
      color: '#f97316',
      icon: PhoneCall
    },
    {
      name: 'Disaster Relief & Evacuation Hotline',
      number: '1-800-RED-CROSS',
      tel: '18007332767',
      desc: 'Shelter intake, missing persons & emergency relief',
      color: '#3b82f6',
      icon: HeartPulse
    },
    {
      name: 'Poison Control Center',
      number: '1-800-222-1222',
      tel: '18002221222',
      desc: 'Toxic fumes, chemical spills, contaminated water',
      color: '#eab308',
      icon: AlertTriangle
    }
  ];

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      background: 'rgba(3, 7, 18, 0.85)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.25rem'
    }}>
      <div 
        className="citizen-card"
        style={{
          width: '100%',
          maxWidth: '480px',
          background: 'var(--navy-900)',
          border: '1.5px solid var(--risk-severe)',
          boxShadow: '0 12px 40px rgba(239, 68, 68, 0.25)',
          padding: '1.5rem',
          position: 'relative'
        }}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          style={{
            position: 'absolute',
            right: '1rem',
            top: '1rem',
            background: 'var(--navy-800)',
            border: '1px solid var(--border-subtle)',
            color: 'var(--text-muted)',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            background: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid var(--risk-severe)',
            color: '#ef4444',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <PhoneCall size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.2 }}>
              Emergency Direct SOS
            </h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              If in immediate mortal danger, call emergency services directly:
            </p>
          </div>
        </div>

        {/* Contact List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
          {contacts.map((c, i) => {
            const Icon = c.icon;
            return (
              <a
                key={i}
                href={`tel:${c.tel || c.number}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.85rem 1rem',
                  background: 'var(--navy-850)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = c.color;
                  e.currentTarget.style.background = 'var(--navy-800)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-subtle)';
                  e.currentTarget.style.background = 'var(--navy-850)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ color: c.color }}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#ffffff' }}>
                      {c.name}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                      {c.desc}
                    </div>
                  </div>
                </div>

                <div style={{
                  fontSize: '1.1rem',
                  fontWeight: 800,
                  color: c.color,
                  letterSpacing: '0.04em'
                }}>
                  {c.number}
                </div>
              </a>
            );
          })}
        </div>

        {/* Disclaimer in modal */}
        <p style={{ fontSize: '0.72rem', color: 'var(--text-dim)', textAlign: 'center', lineHeight: 1.4 }}>
          ResQ does not replace 911 or official civil defense broadcasts. In case of immediate life hazard, prioritize dial contact over application usage.
        </p>
      </div>
    </div>
  );
}

import React from 'react';
import { 
  AlertOctagon, 
  MapPin, 
  Users, 
  Radio, 
  ShieldAlert, 
  ArrowUpRight,
  TrendingUp,
  Cpu
} from 'lucide-react';

export default function SituationBanner({ 
  disaster, 
  selectedZone, 
  onSelectZone, 
  onOpenRiskEngine,
  onOpenAssistant
}) {
  const isCritical = disaster.riskLevel === 'CRITICAL';

  return (
    <section 
      className="tactical-panel corner-bracket"
      style={{
        padding: '16px 20px',
        marginBottom: '16px',
        background: 'linear-gradient(90deg, rgba(17, 26, 48, 0.95) 0%, rgba(13, 21, 39, 0.9) 100%)',
        borderLeft: `4px solid ${disaster.severityColor}`,
        boxShadow: isCritical ? '0 0 25px rgba(239, 68, 68, 0.15)' : 'none'
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        {/* Left: Situation Identity & Critical Threat Readout */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', minWidth: '320px', flex: '1 1 340px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '10px',
            background: isCritical ? 'rgba(239, 68, 68, 0.15)' : 'rgba(249, 115, 22, 0.15)',
            border: `1px solid ${disaster.severityColor}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: `0 0 15px ${disaster.severityColor}40`
          }}
          className={isCritical ? 'pulse-red' : ''}
          >
            <AlertOctagon size={26} color={disaster.severityColor} />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span style={{
                fontSize: '0.68rem',
                fontFamily: 'var(--font-mono)',
                color: '#94a3b8',
                letterSpacing: '0.1em',
                textTransform: 'uppercase'
              }}>
                CURRENT SITUATION TELEMETRY
              </span>
              <span className={`badge ${isCritical ? 'badge-critical' : 'badge-high'}`}>
                {disaster.status}
              </span>
            </div>

            <h1 style={{
              fontSize: '1.28rem',
              fontWeight: 700,
              color: '#ffffff',
              letterSpacing: '-0.01em',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              {disaster.summaryTitle}
            </h1>

            <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '3px' }}>
              {disaster.summaryDescription}
            </p>
          </div>
        </div>

        {/* Center: Risk Level & Score Badge */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '18px',
          padding: '8px 18px',
          background: 'rgba(9, 14, 26, 0.75)',
          borderRadius: '8px',
          border: '1px solid #1a2947'
        }}>
          {/* Overall Risk Score */}
          <div>
            <span style={{ fontSize: '0.66rem', color: '#64748b', fontFamily: 'var(--font-mono)', display: 'block' }}>
              OVERALL RISK SCORE
            </span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
              <span style={{
                fontSize: '1.9rem',
                fontWeight: 800,
                color: disaster.severityColor,
                fontFamily: 'var(--font-mono)',
                lineHeight: 1
              }}>
                {disaster.overallRisk}
              </span>
              <span style={{ fontSize: '0.8rem', color: '#64748b', fontFamily: 'var(--font-mono)' }}>/100</span>
            </div>
          </div>

          {/* Status Level */}
          <div style={{ borderLeft: '1px solid #182642', paddingLeft: '14px' }}>
            <span style={{ fontSize: '0.66rem', color: '#64748b', fontFamily: 'var(--font-mono)', display: 'block' }}>
              SEVERITY LEVEL
            </span>
            <span style={{
              fontSize: '1rem',
              fontWeight: 800,
              color: disaster.severityColor,
              letterSpacing: '0.04em'
            }}>
              {disaster.riskLevel}
            </span>
          </div>

          {/* Epicenter Zone */}
          <div style={{ borderLeft: '1px solid #182642', paddingLeft: '14px' }}>
            <span style={{ fontSize: '0.66rem', color: '#64748b', fontFamily: 'var(--font-mono)', display: 'block' }}>
              PRIMARY DANGER ZONE
            </span>
            <button
              onClick={() => onSelectZone(disaster.primaryZone)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                background: 'transparent',
                border: 'none',
                color: '#38bdf8',
                fontWeight: 700,
                fontSize: '0.95rem',
                cursor: 'pointer',
                padding: 0
              }}
            >
              <MapPin size={14} /> {disaster.primaryZone}
              <ArrowUpRight size={13} />
            </button>
          </div>
        </div>

        {/* Right: Quick Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={onOpenRiskEngine}
            className="btn-tactical btn-outline-cyan"
            style={{ fontSize: '0.78rem' }}
          >
            <Cpu size={14} /> AI Analysis Engine
          </button>
          <button
            onClick={() => onOpenAssistant(`What are the immediate priorities for ${disaster.primaryZone}?`)}
            className="btn-tactical btn-primary"
            style={{ fontSize: '0.78rem' }}
          >
            <ShieldAlert size={14} /> Triage Directives
          </button>
        </div>
      </div>
    </section>
  );
}

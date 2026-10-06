import React, { useEffect, useState } from 'react';
import { 
  AlertTriangle, 
  ShieldAlert, 
  MapPin, 
  CheckCircle2, 
  Info, 
  TrendingUp, 
  ArrowDown, 
  RefreshCw,
  ExternalLink
} from 'lucide-react';

export default function Screen3RiskResult({
  riskResult,
  onRecalculate,
  onJumpToSection
}) {
  const {
    disasterId,
    disasterName,
    location,
    score,
    riskLevel,
    badgeColor,
    badgeBg,
    levelDescription,
    driverExplanations,
    impact
  } = riskResult;

  // Animated score count-up
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1000;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.round(ease * score);
      setAnimatedScore(currentVal);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [score]);

  // SVG Gauge calculations
  const radius = 86;
  const strokeWidth = 14;
  const circumference = 2 * Math.PI * radius;
  // Use a 260-degree arc for a clean automotive / tactical dial feel
  const arcLength = circumference * 0.75;
  const strokeDashoffset = arcLength - (arcLength * (animatedScore / 100));

  return (
    <div style={{ marginBottom: '2.5rem' }}>
      
      {/* Top Header Card */}
      <div 
        className="citizen-card citizen-card-highlight"
        style={{
          borderTop: `4px solid ${badgeColor}`,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Prototype Watermark Notice */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.5rem',
          marginBottom: '1.5rem',
          paddingBottom: '0.85rem',
          borderBottom: '1px solid var(--border-subtle)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.82rem', color: '#38bdf8' }}>
            <MapPin size={15} />
            <span style={{ fontWeight: 600 }}>{location}</span>
          </div>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid var(--border-subtle)',
            padding: '0.2rem 0.65rem',
            borderRadius: '6px',
            fontSize: '0.72rem',
            color: 'var(--text-dim)'
          }}>
            <Info size={12} />
            <span>Prototype Assessment (Simulated Data)</span>
          </div>
        </div>

        {/* Centerpiece Gauge */}
        <div style={{ textAlign: 'center', padding: '1rem 0 1.5rem 0' }}>
          
          <div className="gauge-wrapper" style={{ height: '220px' }}>
            <svg 
              className="gauge-svg" 
              width="230" 
              height="230" 
              viewBox="0 0 220 220"
            >
              {/* Background Arc */}
              <circle
                className="gauge-bg-circle"
                cx="110"
                cy="110"
                r={radius}
                strokeWidth={strokeWidth}
                strokeDasharray={`${arcLength} ${circumference}`}
                strokeDashoffset="0"
                transform="rotate(135 110 110)"
              />
              {/* Active Progress Arc */}
              <circle
                className="gauge-fill-circle"
                cx="110"
                cy="110"
                r={radius}
                strokeWidth={strokeWidth}
                stroke={badgeColor}
                strokeDasharray={`${arcLength} ${circumference}`}
                strokeDashoffset={strokeDashoffset}
                transform="rotate(135 110 110)"
                style={{
                  filter: `drop-shadow(0 0 10px ${badgeColor}66)`
                }}
              />
            </svg>

            {/* Gauge Number & Text in Center */}
            <div className="gauge-content">
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '2px' }}>
                <span className="gauge-number" style={{ color: badgeColor }}>
                  {animatedScore}
                </span>
                <span className="gauge-max">/100</span>
              </div>

              <div 
                className="gauge-level-badge"
                style={{
                  background: badgeBg,
                  color: badgeColor,
                  border: `1px solid ${badgeColor}66`
                }}
              >
                <span>{riskLevel} RISK</span>
              </div>
            </div>
          </div>

          {/* Subtitle */}
          <h2 style={{ 
            fontSize: '1.45rem', 
            fontWeight: 800, 
            color: '#ffffff', 
            marginTop: '1rem',
            marginBottom: '0.35rem' 
          }}>
            {disasterName} risk in your location
          </h2>

          <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', maxWidth: '520px', margin: '0 auto' }}>
            {levelDescription}
          </p>
        </div>

        {/* WHY IS MY RISK HIGH? / CONTRIBUTORS */}
        <div style={{ 
          background: 'var(--navy-900)', 
          borderRadius: '14px', 
          border: '1px solid var(--border-subtle)',
          padding: '1.25rem 1.4rem',
          marginBottom: '1.5rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: badgeColor }}></div>
            <h3 style={{ 
              fontSize: '1rem', 
              fontWeight: 800, 
              letterSpacing: '0.04em', 
              color: '#ffffff', 
              textTransform: 'uppercase' 
            }}>
              Why is my risk {riskLevel.toLowerCase()}?
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {driverExplanations.length > 0 ? (
              driverExplanations.map((driver, index) => (
                <div 
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.65rem',
                    fontSize: '0.92rem',
                    color: 'var(--text-main)'
                  }}
                >
                  <span style={{ 
                    color: driver.severity === 'critical' ? 'var(--risk-severe)' : 'var(--risk-high)',
                    fontSize: '1rem',
                    lineHeight: 1.2
                  }}>
                    •
                  </span>
                  <div>
                    <strong style={{ color: '#ffffff' }}>{driver.label}: </strong>
                    <span style={{ color: 'var(--text-muted)' }}>{driver.detail}</span>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                Baseline environmental conditions in your selected location indicate low physical exposure.
              </div>
            )}
          </div>
        </div>

        {/* POSSIBLE IMPACT */}
        <div style={{
          background: 'rgba(59, 130, 246, 0.08)',
          border: '1px solid rgba(59, 130, 246, 0.25)',
          borderRadius: '14px',
          padding: '1.25rem 1.4rem',
          marginBottom: '1.25rem'
        }}>
          <h4 style={{ 
            fontSize: '0.85rem', 
            fontWeight: 800, 
            letterSpacing: '0.05em', 
            color: '#38bdf8', 
            textTransform: 'uppercase',
            marginBottom: '0.45rem'
          }}>
            Possible Impact
          </h4>
          <p style={{ fontSize: '0.95rem', color: '#f1f5f9', lineHeight: 1.5 }}>
            "{impact}"
          </p>
        </div>

        {/* Prototype notice badge */}
        <div style={{ 
          fontSize: '0.78rem', 
          color: 'var(--text-dim)', 
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.35rem'
        }}>
          <span>Note: Prototype assessment generated from user inputs and simulated local risk engines.</span>
        </div>

      </div>

      {/* Quick Anchor Navigation to Sections */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        flexWrap: 'wrap', 
        gap: '0.65rem',
        marginTop: '1.5rem'
      }}>
        <button
          type="button"
          onClick={() => onJumpToSection('actions')}
          className="btn-secondary-resq"
          style={{ fontSize: '0.85rem', padding: '0.5rem 0.9rem' }}
        >
          <span>🚨 What To Do Now</span>
        </button>

        <button
          type="button"
          onClick={() => onJumpToSection('safe-options')}
          className="btn-secondary-resq"
          style={{ fontSize: '0.85rem', padding: '0.5rem 0.9rem' }}
        >
          <span>🧭 Safe Options & Map</span>
        </button>

        <button
          type="button"
          onClick={() => onJumpToSection('what-if')}
          className="btn-secondary-resq"
          style={{ fontSize: '0.85rem', padding: '0.5rem 0.9rem' }}
        >
          <span>📈 What-If Simulation</span>
        </button>

        <button
          type="button"
          onClick={() => onJumpToSection('ask-resq')}
          className="btn-secondary-resq"
          style={{ fontSize: '0.85rem', padding: '0.5rem 0.9rem' }}
        >
          <span>💬 Ask ResQ</span>
        </button>
      </div>

    </div>
  );
}

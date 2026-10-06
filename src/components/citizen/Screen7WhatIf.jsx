import React, { useState } from 'react';
import { 
  TrendingUp, 
  Sliders, 
  Info, 
  RefreshCw, 
  AlertTriangle,
  ArrowRight
} from 'lucide-react';

export default function Screen7WhatIf({ whatIfConfig, baseScore, disasterName }) {
  const {
    parameter,
    unit,
    baseValue,
    simulatedValue: defaultSimValue,
    minValue,
    maxValue,
    step,
    calculateSimulatedRisk,
    explanation
  } = whatIfConfig;

  const [simValue, setSimValue] = useState(defaultSimValue);

  const simulatedRisk = calculateSimulatedRisk(simValue);
  const delta = simulatedRisk - baseScore;

  // Determine badge color for simulated risk
  let simColor = '#22c55e';
  let simLevel = 'LOW';
  if (simulatedRisk >= 81) {
    simColor = '#ef4444';
    simLevel = 'SEVERE';
  } else if (simulatedRisk >= 66) {
    simColor = '#f97316';
    simLevel = 'HIGH';
  } else if (simulatedRisk >= 36) {
    simColor = '#eab308';
    simLevel = 'MODERATE';
  }

  // Base color
  let baseColor = '#22c55e';
  let baseLevel = 'LOW';
  if (baseScore >= 81) {
    baseColor = '#ef4444';
    baseLevel = 'SEVERE';
  } else if (baseScore >= 66) {
    baseColor = '#f97316';
    baseLevel = 'HIGH';
  } else if (baseScore >= 36) {
    baseColor = '#eab308';
    baseLevel = 'MODERATE';
  }

  const handleReset = () => {
    setSimValue(defaultSimValue);
  };

  return (
    <section id="what-if" style={{ marginBottom: '2.5rem', scrollMarginTop: '80px' }}>
      
      {/* Section Header */}
      <div style={{ marginBottom: '1.25rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.35rem' }}>
          <span style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: '#38bdf8',
            background: 'rgba(56, 189, 248, 0.12)',
            padding: '0.2rem 0.6rem',
            borderRadius: '6px'
          }}>
            Simulation Feature
          </span>
        </div>

        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.35rem' }}>
          What if {parameter.toLowerCase()} increases?
        </h2>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
          Test hypothetical escalation scenarios to understand how weather shifts change your vulnerability.
        </p>
      </div>

      {/* Main Simulation Card */}
      <div 
        className="citizen-card"
        style={{
          background: 'var(--navy-850)',
          border: '1.5px solid var(--border-card)',
          padding: '1.5rem'
        }}
      >
        {/* Slider Controls */}
        <div style={{ marginBottom: '1.75rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff' }}>
              Simulate {parameter}:
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#38bdf8' }}>
                {simValue} {unit}
              </span>
              <button
                type="button"
                onClick={handleReset}
                title="Reset simulation"
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-dim)',
                  cursor: 'pointer',
                  padding: '2px'
                }}
              >
                <RefreshCw size={14} />
              </button>
            </div>
          </div>

          {/* Range Slider */}
          <input
            type="range"
            min={minValue}
            max={maxValue}
            step={step}
            value={simValue}
            onChange={(e) => setSimValue(Number(e.target.value))}
            style={{
              width: '100%',
              accentColor: '#3b82f6',
              cursor: 'pointer',
              height: '6px',
              borderRadius: '3px'
            }}
          />

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '0.35rem' }}>
            <span>Current baseline: {baseValue} {unit}</span>
            <span>Maximum test: {maxValue} {unit}</span>
          </div>
        </div>

        {/* Side-by-Side Comparison */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr auto 1fr', 
          alignItems: 'center', 
          gap: '1rem',
          padding: '1.25rem',
          background: 'var(--navy-900)',
          borderRadius: '12px',
          border: '1px solid var(--border-subtle)',
          marginBottom: '1.25rem',
          textAlign: 'center'
        }}>
          {/* Current Risk */}
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
              Current Risk
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: baseColor, lineHeight: 1.1 }}>
              {baseScore} <span style={{ fontSize: '1rem', color: 'var(--text-dim)' }}>/ 100</span>
            </div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: baseColor, marginTop: '0.2rem' }}>
              {baseLevel} RISK
            </div>
          </div>

          {/* Arrow */}
          <div style={{ color: 'var(--text-dim)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <ArrowRight size={22} color="#38bdf8" />
            {delta !== 0 && (
              <span style={{ 
                fontSize: '0.75rem', 
                fontWeight: 700, 
                color: delta > 0 ? '#ef4444' : '#10b981',
                marginTop: '0.2rem'
              }}>
                {delta > 0 ? `+${delta}` : delta}
              </span>
            )}
          </div>

          {/* Simulated Risk */}
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
              Simulated Risk
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: simColor, lineHeight: 1.1 }}>
              {simulatedRisk} <span style={{ fontSize: '1rem', color: 'var(--text-dim)' }}>/ 100</span>
            </div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: simColor, marginTop: '0.2rem' }}>
              {simLevel} RISK
            </div>
          </div>
        </div>

        {/* Explanation text */}
        <div style={{
          background: 'rgba(59, 130, 246, 0.08)',
          borderLeft: '3px solid var(--blue-primary)',
          padding: '0.85rem 1rem',
          borderRadius: '8px',
          marginBottom: '1rem'
        }}>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: 1.45 }}>
            <strong style={{ color: '#ffffff' }}>Simulation Impact: </strong>
            {explanation}
          </p>
        </div>

        {/* Notice badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: 'var(--text-dim)' }}>
          <Info size={13} />
          <span>This scenario simulation is a prototype calculation and does not guarantee real-world atmospheric thresholds.</span>
        </div>

      </div>

    </section>
  );
}

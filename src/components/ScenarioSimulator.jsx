import React, { useState } from 'react';
import { 
  Sliders, 
  TrendingUp, 
  AlertTriangle, 
  ArrowRight, 
  Sparkles, 
  RotateCcw,
  Zap,
  Waves,
  Activity,
  Flame,
  Wind
} from 'lucide-react';
import { DISASTER_SCENARIOS } from '../data/disasters';

export default function ScenarioSimulator({ 
  currentDisaster,
  onApplyScenario 
}) {
  const [selectedDisasterId, setSelectedDisasterId] = useState(currentDisaster.id || 'flood');
  const scenario = DISASTER_SCENARIOS[selectedDisasterId] || DISASTER_SCENARIOS.flood;
  const sim = scenario.whatIfSimulation;

  const [simValue, setSimValue] = useState(sim.simulatedValue);

  // Compute dynamic simulated risk from base
  const calculateSimRisk = (val) => {
    const range = (val - sim.baseValue) / (sim.simulatedValue - sim.baseValue || 1);
    const calculated = Math.round(sim.baseRisk + range * (sim.simulatedRisk - sim.baseRisk));
    return Math.min(Math.max(calculated, 10), 99);
  };

  const currentSimRisk = calculateSimRisk(simValue);
  const delta = currentSimRisk - sim.baseRisk;

  const handleReset = () => {
    setSimValue(sim.baseValue);
  };

  const handleLoadDemo = () => {
    setSimValue(sim.simulatedValue);
  };

  return (
    <div className="tactical-panel corner-bracket" style={{ padding: '20px', marginTop: '16px' }}>
      <div className="panel-header" style={{ margin: '-20px -20px 16px -20px' }}>
        <span className="panel-title">
          <Zap size={14} color="#f59e0b" /> Predictive What-If Scenario Simulator
        </span>
        <span className="badge badge-high">Predictive Intelligence</span>
      </div>

      {/* Intro Description */}
      <p style={{ fontSize: '0.78rem', color: '#94a3b8', marginBottom: '16px' }}>
        Simulate environmental stress vectors to test forward-looking vulnerability before disaster thresholds are breached.
      </p>

      {/* Disaster Selector for Simulator */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
        {[
          { id: 'flood', label: 'Flood Scenario', icon: Waves },
          { id: 'earthquake', label: 'Earthquake Shock', icon: Activity },
          { id: 'wildfire', label: 'Wildfire Front', icon: Flame },
          { id: 'storm', label: 'Cyclone Surge', icon: Wind }
        ].map(item => {
          const Icon = item.icon;
          const isSelected = selectedDisasterId === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                setSelectedDisasterId(item.id);
                setSimValue(DISASTER_SCENARIOS[item.id].whatIfSimulation.simulatedValue);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                borderRadius: '6px',
                border: isSelected ? '1px solid #f59e0b' : '1px solid #1a2948',
                background: isSelected ? 'rgba(245, 158, 11, 0.15)' : 'rgba(13, 21, 39, 0.6)',
                color: isSelected ? '#ffffff' : '#94a3b8',
                fontSize: '0.74rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              <Icon size={13} color={isSelected ? '#f59e0b' : '#64748b'} />
              {item.label}
            </button>
          );
        })}
      </div>

      {/* Simulator Control Board */}
      <div style={{
        background: 'rgba(9, 14, 26, 0.8)',
        borderRadius: '8px',
        border: '1px solid #1c2b4a',
        padding: '16px',
        marginBottom: '16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
          <div>
            <span style={{ fontSize: '0.72rem', color: '#64748b', fontFamily: 'var(--font-mono)' }}>
              SIMULATION VARIABLE:
            </span>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff' }}>
              {sim.label} ({sim.parameter})
            </h4>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={handleLoadDemo}
              className="btn-tactical btn-outline-cyan"
              style={{ fontSize: '0.72rem', padding: '5px 10px' }}
            >
              <Sparkles size={13} /> Load Demo Peak Surge ({sim.simulatedValue} {sim.unit})
            </button>
            <button
              onClick={handleReset}
              className="btn-tactical btn-secondary"
              style={{ fontSize: '0.72rem', padding: '5px 10px' }}
            >
              <RotateCcw size={13} /> Reset Base
            </button>
          </div>
        </div>

        {/* Dynamic Range Slider */}
        <div style={{ marginBottom: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '6px' }}>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
              Baseline: <strong style={{ color: '#ffffff' }}>{sim.baseValue} {sim.unit}</strong>
            </span>
            <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#38bdf8', fontFamily: 'var(--font-mono)' }}>
              Simulated: {simValue} {sim.unit}
            </span>
          </div>

          <input
            type="range"
            min={sim.baseValue * 0.8}
            max={sim.simulatedValue * 1.3}
            step={sim.unit === 'm' || sim.unit === 'Richter' ? '0.1' : '1'}
            value={simValue}
            onChange={(e) => setSimValue(parseFloat(e.target.value))}
          />
        </div>
      </div>

      {/* Comparison Scoreboard: Current vs Simulated */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        gap: '16px',
        alignItems: 'center',
        background: 'rgba(13, 21, 39, 0.65)',
        padding: '18px 24px',
        borderRadius: '8px',
        border: '1px solid #1f3154',
        marginBottom: '16px'
      }}>
        {/* Left: Current Risk */}
        <div style={{ textAlign: 'center' }}>
          <span style={{ fontSize: '0.7rem', color: '#94a3b8', fontFamily: 'var(--font-mono)', letterSpacing: '0.05em' }}>
            CURRENT BASELINE RISK
          </span>
          <div style={{ fontSize: '2.4rem', fontWeight: 900, color: '#f59e0b', fontFamily: 'var(--font-mono)', lineHeight: 1.1 }}>
            {sim.baseRisk}
          </div>
          <span className="badge badge-medium" style={{ marginTop: '4px' }}>
            BASELINE CONDITION
          </span>
          <p style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '6px' }}>
            Normal drainage flow ({sim.baseValue} {sim.unit})
          </p>
        </div>

        {/* Center: Shift Arrow */}
        <div style={{ textAlign: 'center', padding: '0 12px' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            background: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid #ef4444',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 6px auto'
          }}>
            <ArrowRight size={20} color="#ef4444" />
          </div>
          <span style={{
            fontSize: '0.88rem',
            fontWeight: 800,
            color: delta >= 0 ? '#f87171' : '#4ade80',
            fontFamily: 'var(--font-mono)'
          }}>
            {delta >= 0 ? `+${delta}` : delta} PTS
          </span>
        </div>

        {/* Right: Simulated Risk */}
        <div style={{ textAlign: 'center' }}>
          <span style={{ fontSize: '0.7rem', color: '#94a3b8', fontFamily: 'var(--font-mono)', letterSpacing: '0.05em' }}>
            SIMULATED RISK UNDER SURGE
          </span>
          <div style={{ fontSize: '2.4rem', fontWeight: 900, color: '#ef4444', fontFamily: 'var(--font-mono)', lineHeight: 1.1 }}>
            {currentSimRisk}
          </div>
          <span className="badge badge-critical" style={{ marginTop: '4px' }}>
            CRITICAL ESCALATION
          </span>
          <p style={{ fontSize: '0.72rem', color: '#f87171', marginTop: '6px' }}>
            Surge Stress ({simValue} {sim.unit})
          </p>
        </div>
      </div>

      {/* AI Predictive Insight Explanation Box */}
      <div style={{
        background: 'rgba(239, 68, 68, 0.08)',
        borderLeft: '4px solid #ef4444',
        padding: '12px 16px',
        borderRadius: '4px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
          <Sparkles size={14} color="#ef4444" />
          <strong style={{ fontSize: '0.78rem', color: '#f87171', letterSpacing: '0.04em' }}>
            AI PREDICTIVE CONSEQUENCE ENGINE
          </strong>
        </div>
        <p style={{ fontSize: '0.8rem', color: '#e2e8f0', lineHeight: 1.45 }}>
          "{sim.explanation}"
        </p>
      </div>
    </div>
  );
}

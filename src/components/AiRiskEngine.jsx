import React, { useState, useEffect } from 'react';
import { 
  Cpu, 
  Sparkles, 
  AlertTriangle, 
  MapPin, 
  Sliders, 
  CheckCircle2, 
  XCircle, 
  Eye, 
  Clock, 
  ShieldCheck, 
  Users,
  Flame,
  Waves,
  Wind,
  Activity,
  Thermometer,
  CloudRain
} from 'lucide-react';
import { DISASTER_SCENARIOS } from '../data/disasters';
import { ZONES } from '../data/zones';

export default function AiRiskEngine({ 
  currentDisaster, 
  onDisasterChange,
  selectedZoneId,
  onSelectZone 
}) {
  const [disasterType, setDisasterType] = useState(currentDisaster.id || 'flood');
  const [selectedZone, setSelectedZone] = useState(selectedZoneId || 'Zone A');
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisDone, setAnalysisDone] = useState(true);
  
  // Dynamic environmental inputs state
  const [envInputs, setEnvInputs] = useState(() => {
    const base = DISASTER_SCENARIOS[currentDisaster.id || 'flood'].environmentalInputs;
    const initial = {};
    Object.keys(base).forEach(k => {
      initial[k] = base[k].value;
    });
    return initial;
  });

  // Keep inputs synced when disaster type changes
  useEffect(() => {
    const scenario = DISASTER_SCENARIOS[disasterType] || DISASTER_SCENARIOS.flood;
    const newInputs = {};
    Object.keys(scenario.environmentalInputs).forEach(k => {
      newInputs[k] = scenario.environmentalInputs[k].value;
    });
    setEnvInputs(newInputs);
    setSelectedZone(scenario.primaryZone);
  }, [disasterType]);

  const activeScenario = DISASTER_SCENARIOS[disasterType] || DISASTER_SCENARIOS.flood;
  const currentInputsConfig = activeScenario.environmentalInputs;

  const handleInputChange = (key, val) => {
    setEnvInputs(prev => ({ ...prev, [key]: parseFloat(val) }));
  };

  const runAnalysis = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setAnalysisDone(true);
    }, 850);
  };

  // Calculate dynamic risk score based on active inputs
  const calculateDynamicScore = () => {
    let score = activeScenario.overallRisk;
    if (disasterType === 'flood' && envInputs.rainfall) {
      const delta = (envInputs.rainfall - 110) * 0.25;
      score = Math.round(Math.min(Math.max(score + delta, 15), 98));
    } else if (disasterType === 'earthquake' && envInputs.magnitude) {
      const delta = (envInputs.magnitude - 6.0) * 15;
      score = Math.round(Math.min(Math.max(score + delta, 20), 99));
    } else if (disasterType === 'wildfire' && envInputs.windSpeed) {
      const delta = (envInputs.windSpeed - 40) * 0.4;
      score = Math.round(Math.min(Math.max(score + delta, 25), 96));
    } else if (disasterType === 'storm' && envInputs.stormSurge) {
      const delta = (envInputs.stormSurge - 2.5) * 8;
      score = Math.round(Math.min(Math.max(score + delta, 30), 98));
    }
    return score;
  };

  const dynamicScore = calculateDynamicScore();

  let dynamicLevel = 'LOW';
  let dynamicColor = '#22c55e';
  if (dynamicScore >= 75) {
    dynamicLevel = 'CRITICAL';
    dynamicColor = '#ef4444';
  } else if (dynamicScore >= 50) {
    dynamicLevel = 'HIGH';
    dynamicColor = '#f97316';
  } else if (dynamicScore >= 25) {
    dynamicLevel = 'MEDIUM';
    dynamicColor = '#eab308';
  }

  // Circular Gauge Calculations (Radius 70, Arc 240 degrees)
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const arcLength = circumference * 0.75; // 270 degree sweep
  const strokeDashoffset = arcLength - (arcLength * (dynamicScore / 100));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Engine Controls Header */}
      <div className="tactical-panel corner-bracket" style={{ padding: '16px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="badge badge-cyan">AI INFERENCE ENGINE</span>
              <span style={{ fontSize: '0.68rem', color: '#64748b', fontFamily: 'var(--font-mono)' }}>MODEL: RESQ-HYDRO-SEISMIC-V4</span>
            </div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff', marginTop: '3px' }}>
              AI Risk Analysis & Threat Prediction
            </h2>
          </div>

          <button
            onClick={runAnalysis}
            disabled={analyzing}
            className="btn-tactical btn-primary"
            style={{ padding: '10px 20px', fontSize: '0.85rem' }}
          >
            {analyzing ? (
              <>
                <Sparkles size={16} className="pulse-cyan" />
                Computing Neural Risk Vectors...
              </>
            ) : (
              <>
                <Cpu size={16} />
                ANALYZE RISK
              </>
            )}
          </button>
        </div>

        {/* Disaster Type Selector */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 600, display: 'block', marginBottom: '8px', letterSpacing: '0.05em' }}>
            SELECT DISASTER HAZARD TYPE:
          </label>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {[
              { id: 'flood', label: 'Flood', icon: Waves },
              { id: 'earthquake', label: 'Earthquake', icon: Activity },
              { id: 'wildfire', label: 'Wildfire', icon: Flame },
              { id: 'storm', label: 'Storm / Cyclone', icon: Wind },
              { id: 'rainfall', label: 'Extreme Rainfall', icon: CloudRain, cloneOf: 'flood' },
              { id: 'heatwave', label: 'Heatwave', icon: Thermometer, cloneOf: 'wildfire' }
            ].map((t) => {
              const Icon = t.icon;
              const isSelected = disasterType === t.id || (t.cloneOf && disasterType === t.cloneOf);
              return (
                <button
                  key={t.id}
                  onClick={() => {
                    const targetId = t.cloneOf || t.id;
                    setDisasterType(targetId);
                    if (onDisasterChange) onDisasterChange(targetId);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 14px',
                    borderRadius: '6px',
                    border: isSelected ? '1px solid #38bdf8' : '1px solid #1a2845',
                    background: isSelected ? 'rgba(14, 165, 233, 0.2)' : 'rgba(13, 21, 39, 0.6)',
                    color: isSelected ? '#ffffff' : '#94a3b8',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <Icon size={14} color={isSelected ? '#38bdf8' : '#64748b'} />
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Operational Zone Selector */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 600, display: 'block', marginBottom: '8px', letterSpacing: '0.05em' }}>
            SELECT TARGET OPERATIONAL SECTOR:
          </label>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {ZONES.map((z) => {
              const isSelected = selectedZone === z.id;
              return (
                <button
                  key={z.id}
                  onClick={() => {
                    setSelectedZone(z.id);
                    if (onSelectZone) onSelectZone(z.id);
                  }}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '6px',
                    border: isSelected ? `1px solid ${z.color}` : '1px solid #1a2845',
                    background: isSelected ? 'rgba(30, 58, 138, 0.35)' : 'rgba(9, 14, 26, 0.7)',
                    color: isSelected ? '#ffffff' : '#94a3b8',
                    fontSize: '0.74rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  <MapPin size={12} color={z.color} style={{ display: 'inline', marginRight: '4px' }} />
                  {z.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Environmental Input Sliders */}
        <div style={{
          background: 'rgba(9, 14, 26, 0.6)',
          borderRadius: '8px',
          padding: '14px',
          border: '1px solid #182642'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.74rem', fontWeight: 700, color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Sliders size={14} /> DYNAMIC ENVIRONMENTAL SENSORY INPUTS ({activeScenario.shortName.toUpperCase()})
            </span>
            <span style={{ fontSize: '0.65rem', color: '#64748b' }}>
              Adjust variables to test predictive sensitivity
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
            {Object.entries(currentInputsConfig).map(([key, config]) => {
              const val = envInputs[key] ?? config.value;
              const isOverThreshold = config.inverted ? val < config.threshold : val > config.threshold;
              
              return (
                <div key={key} style={{ background: 'rgba(13, 21, 39, 0.7)', padding: '10px 12px', borderRadius: '6px', border: '1px solid #182744' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ fontSize: '0.72rem', color: '#cbd5e1', fontWeight: 600 }}>
                      {config.label}
                    </span>
                    <span style={{
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      fontFamily: 'var(--font-mono)',
                      color: isOverThreshold ? '#ef4444' : '#38bdf8'
                    }}>
                      {val} {config.unit}
                    </span>
                  </div>

                  <input
                    type="range"
                    min={config.min}
                    max={config.max}
                    step={config.unit === 'm' || config.unit === 'Richter M' ? '0.1' : '1'}
                    value={val}
                    onChange={(e) => handleInputChange(key, e.target.value)}
                  />

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.62rem', color: '#64748b', marginTop: '4px' }}>
                    <span>Min: {config.min} {config.unit}</span>
                    <span style={{ color: '#f59e0b' }}>Threshold: {config.threshold} {config.unit}</span>
                    <span>Max: {config.max} {config.unit}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Analysis Results Display: Gauge + Reasoning + Actions */}
      <div style={{ display: 'grid', gridTemplateColumns: '360px 1fr', gap: '16px' }}>
        {/* Left: High-Tech Circular Risk Gauge */}
        <div className="tactical-panel corner-bracket" style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
          <span style={{ fontSize: '0.7rem', color: '#94a3b8', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', marginBottom: '12px' }}>
            PREDICTED THREAT SEVERITY INDEX
          </span>

          {/* SVG Circular Dial Gauge */}
          <div style={{ position: 'relative', width: '200px', height: '170px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="200" height="170" viewBox="0 0 200 170">
              {/* Background Track */}
              <circle
                cx="100"
                cy="95"
                r={radius}
                fill="none"
                stroke="#142038"
                strokeWidth="12"
                strokeDasharray={`${arcLength} ${circumference}`}
                strokeDashoffset="0"
                strokeLinecap="round"
                transform="rotate(135 100 95)"
              />
              {/* Active Animated Value Arc */}
              <circle
                cx="100"
                cy="95"
                r={radius}
                fill="none"
                stroke={dynamicColor}
                strokeWidth="12"
                strokeDasharray={`${arcLength} ${circumference}`}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                transform="rotate(135 100 95)"
                style={{
                  transition: 'stroke-dashoffset 0.6s cubic-bezier(0.4, 0, 0.2, 1), stroke 0.3s ease',
                  filter: `drop-shadow(0 0 8px ${dynamicColor}80)`
                }}
              />
            </svg>

            {/* Center Gauge Text Readout */}
            <div style={{ position: 'absolute', top: '55px', textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, fontFamily: 'var(--font-mono)', color: dynamicColor, lineHeight: 1 }}>
                {dynamicScore}
              </div>
              <div style={{ fontSize: '0.72rem', color: '#64748b', fontFamily: 'var(--font-mono)' }}>
                OUT OF 100
              </div>
            </div>
          </div>

          <div style={{ marginTop: '4px' }}>
            <span className={`badge ${
              dynamicLevel === 'CRITICAL' ? 'badge-critical' :
              dynamicLevel === 'HIGH' ? 'badge-high' : 'badge-medium'
            }`} style={{ fontSize: '0.82rem', padding: '4px 12px' }}>
              {dynamicLevel} RISK
            </span>
          </div>

          {/* Target Impact Readouts */}
          <div style={{
            width: '100%',
            marginTop: '16px',
            paddingTop: '14px',
            borderTop: '1px solid #1a2948',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '8px',
            textAlign: 'left'
          }}>
            <div style={{ background: 'rgba(9, 14, 26, 0.6)', padding: '8px', borderRadius: '4px' }}>
              <span style={{ fontSize: '0.62rem', color: '#64748b', display: 'block' }}>TARGET SECTOR</span>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#38bdf8' }}>{selectedZone}</span>
            </div>
            <div style={{ background: 'rgba(9, 14, 26, 0.6)', padding: '8px', borderRadius: '4px' }}>
              <span style={{ fontSize: '0.62rem', color: '#64748b', display: 'block' }}>EXPOSED POPULATION</span>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#ffffff' }}>{activeScenario.affectedPopulation.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Right: AI Reasoning & Predicted Impact */}
        <div className="tactical-panel" style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
              <Sparkles size={14} color="#38bdf8" />
              <h3 style={{ fontSize: '0.88rem', fontWeight: 700, color: '#38bdf8', letterSpacing: '0.04em' }}>
                AI REASONING: WHY THIS RISK SCORE WAS PRODUCED
              </h3>
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px', paddingLeft: '4px' }}>
              {activeScenario.reasoning.map((item, idx) => (
                <li key={idx} style={{
                  fontSize: '0.78rem',
                  color: '#cbd5e1',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '8px',
                  lineHeight: 1.4
                }}>
                  <span style={{ color: dynamicColor, fontWeight: 700 }}>•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Predicted Impact Card */}
          <div style={{
            background: 'rgba(239, 68, 68, 0.08)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '6px',
            padding: '12px 14px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
              <AlertTriangle size={14} color="#ef4444" />
              <span style={{ fontSize: '0.76rem', fontWeight: 700, color: '#f87171', letterSpacing: '0.04em' }}>
                PREDICTED IMPACT HORIZON
              </span>
            </div>
            <p style={{ fontSize: '0.78rem', color: '#f1f5f9', lineHeight: 1.4 }}>
              {activeScenario.predictedImpact}
            </p>
          </div>

          {/* Action Recommendations Matrix */}
          <div>
            <span style={{ fontSize: '0.74rem', fontWeight: 700, color: '#94a3b8', display: 'block', marginBottom: '8px' }}>
              AI-GENERATED ACTION DIRECTIVES MATRIX
            </span>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px' }}>
              {/* DO NOW */}
              <div style={{ background: 'rgba(13, 21, 39, 0.6)', padding: '10px', borderRadius: '6px', borderLeft: '3px solid #ef4444' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#f87171', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '6px' }}>
                  <CheckCircle2 size={12} /> DO NOW
                </span>
                <ul style={{ listStyle: 'none', fontSize: '0.72rem', color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {activeScenario.actions.doNow.slice(0, 2).map((a, i) => (
                    <li key={i}>• {a}</li>
                  ))}
                </ul>
              </div>

              {/* AVOID */}
              <div style={{ background: 'rgba(13, 21, 39, 0.6)', padding: '10px', borderRadius: '6px', borderLeft: '3px solid #f97316' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#fb923c', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '6px' }}>
                  <XCircle size={12} /> AVOID
                </span>
                <ul style={{ listStyle: 'none', fontSize: '0.72rem', color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {activeScenario.actions.avoid.slice(0, 2).map((a, i) => (
                    <li key={i}>• {a}</li>
                  ))}
                </ul>
              </div>

              {/* MONITOR */}
              <div style={{ background: 'rgba(13, 21, 39, 0.6)', padding: '10px', borderRadius: '6px', borderLeft: '3px solid #eab308' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#facc15', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '6px' }}>
                  <Eye size={12} /> MONITOR
                </span>
                <ul style={{ listStyle: 'none', fontSize: '0.72rem', color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {activeScenario.actions.monitor.slice(0, 2).map((a, i) => (
                    <li key={i}>• {a}</li>
                  ))}
                </ul>
              </div>

              {/* RESPONSE PRIORITY */}
              <div style={{ background: 'rgba(13, 21, 39, 0.6)', padding: '10px', borderRadius: '6px', borderLeft: '3px solid #38bdf8' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '6px' }}>
                  <ShieldCheck size={12} /> RESPONSE PRIORITY
                </span>
                <ul style={{ listStyle: 'none', fontSize: '0.72rem', color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {activeScenario.actions.responsePriority.slice(0, 2).map((a, i) => (
                    <li key={i}>• {a}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

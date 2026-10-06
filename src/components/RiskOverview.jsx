import React from 'react';
import { 
  Waves, 
  Wind, 
  Flame, 
  Activity, 
  Layers, 
  ChevronRight,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { DISASTER_SCENARIOS } from '../data/disasters';

export default function RiskOverview({ 
  selectedDisasterId, 
  onSelectDisaster 
}) {
  const disasters = [
    { ...DISASTER_SCENARIOS.flood, iconComp: Waves },
    { ...DISASTER_SCENARIOS.storm, iconComp: Wind },
    { ...DISASTER_SCENARIOS.wildfire, iconComp: Flame },
    { ...DISASTER_SCENARIOS.earthquake, iconComp: Activity }
  ];

  return (
    <div className="tactical-panel" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="panel-header">
        <span className="panel-title">
          <Layers size={14} color="#38bdf8" /> Risk Overview
        </span>
        <span className="badge badge-blue">4 Active Vectors</span>
      </div>

      <div style={{ padding: '10px', display: 'flex', flexDirection: 'column', gap: '8px', flex: 1, overflowY: 'auto' }}>
        <p style={{ fontSize: '0.7rem', color: '#64748b', margin: '2px 4px 4px 4px' }}>
          Select vector to synchronize map, alerts & models:
        </p>

        {disasters.map((d) => {
          const Icon = d.iconComp;
          const isSelected = selectedDisasterId === d.id;
          
          let badgeClass = 'badge-low';
          if (d.riskLevel === 'CRITICAL') badgeClass = 'badge-critical';
          else if (d.riskLevel === 'HIGH') badgeClass = 'badge-high';
          else if (d.riskLevel === 'MEDIUM') badgeClass = 'badge-medium';

          return (
            <div
              key={d.id}
              onClick={() => onSelectDisaster(d.id)}
              style={{
                padding: '12px',
                borderRadius: '6px',
                background: isSelected 
                  ? 'linear-gradient(135deg, rgba(30, 58, 138, 0.4) 0%, rgba(15, 23, 42, 0.8) 100%)' 
                  : 'rgba(13, 21, 39, 0.5)',
                border: isSelected ? `1px solid ${d.severityColor}` : '1px solid #1a2845',
                boxShadow: isSelected ? `0 0 14px ${d.severityColor}30` : 'none',
                cursor: 'pointer',
                transition: 'all 0.18s ease',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.borderColor = '#2563eb';
                  e.currentTarget.style.background = 'rgba(23, 37, 84, 0.3)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.borderColor = '#1a2845';
                  e.currentTarget.style.background = 'rgba(13, 21, 39, 0.5)';
                }
              }}
            >
              {/* Top Row: Icon + Name + Severity Badge */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '6px',
                    background: `${d.severityColor}18`,
                    border: `1px solid ${d.severityColor}40`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Icon size={15} color={d.severityColor} />
                  </div>
                  <div>
                    <h2 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff', lineHeight: 1.1 }}>
                      {d.shortName}
                    </h2>
                    <span style={{ fontSize: '0.65rem', color: '#64748b' }}>
                      {d.category}
                    </span>
                  </div>
                </div>

                <span className={`badge ${badgeClass}`} style={{ fontSize: '0.65rem', padding: '2px 6px' }}>
                  {d.riskLevel}
                </span>
              </div>

              {/* Middle Row: Score Bar & Value */}
              <div style={{ marginBottom: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{ fontSize: '0.68rem', color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>
                    Risk Index
                  </span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 800, color: d.severityColor, fontFamily: 'var(--font-mono)' }}>
                    {d.overallRisk} / 100
                  </span>
                </div>
                {/* Visual score bar */}
                <div style={{ height: '4px', background: '#141f36', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%',
                    width: `${d.overallRisk}%`,
                    background: `linear-gradient(90deg, #3b82f6 0%, ${d.severityColor} 100%)`,
                    borderRadius: '2px'
                  }} />
                </div>
              </div>

              {/* Bottom Row: Primary Zone & Trend */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.68rem',
                color: '#94a3b8',
                paddingTop: '6px',
                borderTop: '1px solid #142038'
              }}>
                <span style={{ color: '#38bdf8', fontWeight: 600 }}>
                  {d.primaryZone} Focus
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', color: '#cbd5e1', fontSize: '0.65rem' }}>
                  <TrendingUp size={11} color={d.severityColor} />
                  {d.activeAlertsCount} alerts
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Safety Notice Footer */}
      <div style={{
        padding: '8px 12px',
        borderTop: '1px solid #142038',
        background: 'rgba(8, 12, 22, 0.8)',
        fontSize: '0.65rem',
        color: '#64748b',
        display: 'flex',
        alignItems: 'center',
        gap: '6px'
      }}>
        <AlertCircle size={12} color="#f59e0b" />
        <span>Syncs telemetry across 4 operational zones</span>
      </div>
    </div>
  );
}

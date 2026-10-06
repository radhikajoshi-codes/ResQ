import React from 'react';
import { 
  AlertTriangle, 
  MapPin, 
  Users, 
  ArrowUpRight,
  ShieldAlert,
  Flame,
  ChevronRight
} from 'lucide-react';
import { ZONES } from '../data/zones';

export default function HighRiskAreas({ 
  selectedZoneId, 
  onSelectZone 
}) {
  return (
    <div className="tactical-panel" style={{ display: 'flex', flexDirection: 'column' }}>
      <div className="panel-header">
        <span className="panel-title">
          <AlertTriangle size={14} color="#f97316" /> High-Risk Areas
        </span>
        <span className="badge badge-cyan">4 Sectors Ranked</span>
      </div>

      <div style={{ padding: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {ZONES.map((zone) => {
          const isSelected = selectedZoneId === zone.id;
          
          let badgeClass = 'badge-low';
          if (zone.riskLevel === 'CRITICAL') badgeClass = 'badge-critical';
          else if (zone.riskLevel === 'HIGH') badgeClass = 'badge-high';
          else if (zone.riskLevel === 'MEDIUM') badgeClass = 'badge-medium';

          return (
            <div
              key={zone.id}
              onClick={() => onSelectZone(zone.id)}
              style={{
                padding: '10px 12px',
                borderRadius: '6px',
                background: isSelected 
                  ? 'linear-gradient(135deg, rgba(30, 58, 138, 0.4) 0%, rgba(13, 21, 39, 0.85) 100%)' 
                  : 'rgba(13, 21, 39, 0.45)',
                border: isSelected ? `1px solid ${zone.color}` : '1px solid #1a2845',
                boxShadow: isSelected ? `0 0 12px ${zone.glowColor}` : 'none',
                cursor: 'pointer',
                transition: 'all 0.18s ease'
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
                  e.currentTarget.style.background = 'rgba(13, 21, 39, 0.45)';
                }
              }}
            >
              {/* Header: Zone Name & Severity Badge */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <MapPin size={13} color={zone.color} />
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#ffffff' }}>
                    {zone.shortName}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span className={`badge ${badgeClass}`} style={{ fontSize: '0.62rem', padding: '1px 5px' }}>
                    {zone.riskLevel}
                  </span>
                  <span style={{ fontSize: '0.82rem', fontWeight: 800, color: zone.color, fontFamily: 'var(--font-mono)' }}>
                    {zone.riskScore}
                  </span>
                </div>
              </div>

              {/* Location description */}
              <p style={{ fontSize: '0.68rem', color: '#94a3b8', marginBottom: '6px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {zone.name}
              </p>

              {/* Population & Priority Readout */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.65rem',
                color: '#64748b',
                fontFamily: 'var(--font-mono)',
                paddingTop: '4px',
                borderTop: '1px solid #142038'
              }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#94a3b8' }}>
                  <Users size={11} color="#38bdf8" /> {zone.population.toLocaleString()} pop
                </span>
                <span style={{ color: zone.riskLevel === 'CRITICAL' ? '#f87171' : '#38bdf8', fontWeight: 600 }}>
                  {zone.responsePriority}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

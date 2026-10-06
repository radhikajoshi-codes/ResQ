import React, { useState } from 'react';
import { 
  Bell, 
  AlertTriangle, 
  Clock, 
  MapPin, 
  CheckCircle, 
  ChevronRight,
  ShieldCheck,
  Info,
  ArrowRight
} from 'lucide-react';
import { INITIAL_ALERTS } from '../data/alerts';

export default function LiveAlerts({ 
  onSelectZone, 
  selectedZoneId,
  selectedDisasterId,
  onOpenAssistant
}) {
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [alerts, setAlerts] = useState(INITIAL_ALERTS);

  // Filter or prioritize based on current disaster or show active stream
  const filteredAlerts = alerts.filter(a => 
    !selectedDisasterId || a.disasterId === selectedDisasterId || a.zoneId === selectedZoneId
  );
  const displayAlerts = filteredAlerts.length > 0 ? filteredAlerts : alerts;

  const handleAlertClick = (alert) => {
    setSelectedAlert(alert.id === selectedAlert?.id ? null : alert);
    if (alert.zoneId) {
      onSelectZone(alert.zoneId);
    }
  };

  return (
    <div className="tactical-panel" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div className="panel-header">
        <span className="panel-title">
          <Bell size={14} color="#ef4444" /> Live Alerts Stream
        </span>
        <span className="badge badge-critical" style={{ fontSize: '0.62rem' }}>
          {displayAlerts.length} Active
        </span>
      </div>

      <div style={{
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        flex: 1,
        overflowY: 'auto',
        maxHeight: '440px'
      }}>
        {displayAlerts.map((alert) => {
          const isSelected = selectedAlert?.id === alert.id;
          const isZoneMatch = selectedZoneId === alert.zoneId;

          let badgeClass = 'badge-low';
          if (alert.severity === 'CRITICAL') badgeClass = 'badge-critical';
          else if (alert.severity === 'HIGH') badgeClass = 'badge-high';
          else if (alert.severity === 'MEDIUM') badgeClass = 'badge-medium';

          return (
            <div
              key={alert.id}
              onClick={() => handleAlertClick(alert)}
              style={{
                padding: '9px 11px',
                borderRadius: '6px',
                background: isSelected 
                  ? 'rgba(30, 58, 138, 0.35)' 
                  : isZoneMatch 
                    ? 'rgba(14, 165, 233, 0.08)' 
                    : 'rgba(13, 21, 39, 0.5)',
                border: isSelected 
                  ? '1px solid #38bdf8' 
                  : isZoneMatch 
                    ? '1px solid #0284c7' 
                    : '1px solid #1a2948',
                borderLeft: `3px solid ${alert.severityColor}`,
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                if (!isSelected) e.currentTarget.style.borderColor = '#2563eb';
              }}
              onMouseLeave={(e) => {
                if (!isSelected && !isZoneMatch) e.currentTarget.style.borderColor = '#1a2948';
              }}
            >
              {/* Alert Meta Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span className={`badge ${badgeClass}`} style={{ fontSize: '0.62rem', padding: '1px 5px' }}>
                  {alert.severity}
                </span>
                <span style={{
                  fontSize: '0.65rem',
                  color: '#64748b',
                  fontFamily: 'var(--font-mono)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '3px'
                }}>
                  <Clock size={10} /> {alert.timestamp}
                </span>
              </div>

              {/* Alert Title */}
              <h4 style={{
                fontSize: '0.78rem',
                fontWeight: 600,
                color: '#ffffff',
                marginBottom: '3px',
                lineHeight: 1.25
              }}>
                {alert.title}
              </h4>

              {/* Alert Location & Status */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.68rem',
                color: '#94a3b8'
              }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', color: '#38bdf8' }}>
                  <MapPin size={11} /> {alert.location}
                </span>
                <span style={{ color: '#cbd5e1', fontFamily: 'var(--font-mono)', fontSize: '0.63rem' }}>
                  {alert.status}
                </span>
              </div>

              {/* Expanded Alert Detail Drawer */}
              {isSelected && (
                <div style={{
                  marginTop: '8px',
                  paddingTop: '8px',
                  borderTop: '1px solid #1e3a8a',
                  animation: 'fadeIn 0.2s ease'
                }}>
                  <p style={{ fontSize: '0.72rem', color: '#cbd5e1', marginBottom: '6px', lineHeight: 1.35 }}>
                    {alert.details}
                  </p>
                  
                  <div style={{
                    background: 'rgba(9, 14, 26, 0.75)',
                    padding: '6px 8px',
                    borderRadius: '4px',
                    borderLeft: `2px solid ${alert.severityColor}`,
                    fontSize: '0.7rem',
                    color: '#e2e8f0',
                    marginBottom: '8px'
                  }}>
                    <strong style={{ color: '#38bdf8' }}>Action:</strong> {alert.recommendedAction}
                  </div>

                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectZone(alert.zoneId);
                      }}
                      className="btn-tactical btn-secondary"
                      style={{ fontSize: '0.68rem', padding: '3px 8px', flex: 1 }}
                    >
                      Locate On Map
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenAssistant(`What should be done regarding alert "${alert.title}" in ${alert.location}?`);
                      }}
                      className="btn-tactical btn-outline-cyan"
                      style={{ fontSize: '0.68rem', padding: '3px 8px' }}
                    >
                      AI Triage
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

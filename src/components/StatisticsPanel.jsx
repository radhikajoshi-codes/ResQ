import React from 'react';
import { 
  Bell, 
  MapPin, 
  Users, 
  CheckCircle2, 
  TrendingUp, 
  TrendingDown, 
  Activity,
  AlertTriangle,
  ShieldCheck
} from 'lucide-react';

export default function StatisticsPanel({ 
  disaster, 
  onFilterAlerts, 
  onSelectCriticalZone,
  onOpenEvac,
  onOpenResolved
}) {
  const cards = [
    {
      id: 'alerts',
      label: 'ACTIVE ALERTS',
      value: String(disaster.activeAlertsCount).padStart(2, '0'),
      icon: AlertTriangle,
      color: '#ef4444',
      trend: disaster.trend || '+12% from previous assessment',
      trendUp: true,
      onClick: onFilterAlerts,
      hint: 'Click to filter live alerts'
    },
    {
      id: 'critical-zones',
      label: 'CRITICAL ZONES',
      value: String(disaster.criticalZonesCount).padStart(2, '0'),
      icon: MapPin,
      color: '#f97316',
      trend: 'Sector A, B1, River Valley',
      trendUp: false,
      onClick: onSelectCriticalZone,
      hint: 'Click to target Zone A'
    },
    {
      id: 'affected-pop',
      label: 'PEOPLE POTENTIALLY AFFECTED',
      value: disaster.affectedPopulation.toLocaleString(),
      icon: Users,
      color: '#38bdf8',
      trend: 'Evacuation advisory active',
      trendUp: true,
      onClick: onOpenEvac,
      hint: 'Click for evacuation plan'
    },
    {
      id: 'resolved',
      label: 'RESOLVED / SHELTERED',
      value: '17',
      icon: ShieldCheck,
      color: '#22c55e',
      trend: '+4,200 individuals secured',
      trendUp: false,
      onClick: onOpenResolved,
      hint: 'Click to view shelter status'
    }
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
      gap: '12px',
      marginBottom: '16px'
    }}>
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            onClick={card.onClick}
            className="tactical-panel"
            style={{
              padding: '14px 16px',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'transform 0.15s ease, border-color 0.2s ease',
              borderTop: `2px solid ${card.color}`
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.borderColor = card.color;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'var(--border-subtle)';
              e.currentTarget.style.borderTop = `2px solid ${card.color}`;
            }}
            title={card.hint}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{
                fontSize: '0.68rem',
                fontFamily: 'var(--font-mono)',
                color: '#94a3b8',
                letterSpacing: '0.08em',
                fontWeight: 600
              }}>
                {card.label}
              </span>
              <div style={{
                width: '30px',
                height: '30px',
                borderRadius: '6px',
                background: `${card.color}18`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: `1px solid ${card.color}35`
              }}>
                <Icon size={16} color={card.color} />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '6px' }}>
              <span style={{
                fontSize: '1.85rem',
                fontWeight: 800,
                color: '#ffffff',
                fontFamily: 'var(--font-mono)',
                lineHeight: 1
              }}>
                {card.value}
              </span>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.72rem',
              color: '#94a3b8',
              fontFamily: 'var(--font-mono)'
            }}>
              {card.trendUp ? (
                <TrendingUp size={13} color="#f87171" />
              ) : (
                <TrendingDown size={13} color="#4ade80" />
              )}
              <span>{card.trend}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

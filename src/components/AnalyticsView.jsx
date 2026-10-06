import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  ShieldCheck, 
  AlertTriangle, 
  Activity, 
  Truck, 
  CheckCircle,
  Clock,
  Layers
} from 'lucide-react';
import { 
  RISK_TREND_24H, 
  POPULATION_BY_ZONE, 
  ALERT_SEVERITY_BREAKDOWN, 
  RESPONSE_ACTIVITY_METRICS 
} from '../data/analyticsData';

export default function AnalyticsView({ currentDisaster }) {
  // SVG Area / Line Chart Points for 24h risk trend
  // Width 700, Height 200, padding 40
  const width = 640;
  const height = 180;
  const paddingX = 40;
  const paddingY = 25;

  const points = RISK_TREND_24H.map((d, i) => {
    const x = paddingX + (i / (RISK_TREND_24H.length - 1)) * (width - 2 * paddingX);
    const y = height - paddingY - (d.composite / 100) * (height - 2 * paddingY);
    return { x, y, ...d };
  });

  const polylineStr = points.map(p => `${p.x},${p.y}`).join(' ');
  const areaStr = `${points[0].x},${height - paddingY} ` + polylineStr + ` ${points[points.length - 1].x},${height - paddingY}`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Top Analytics Banner */}
      <div className="tactical-panel corner-bracket" style={{ padding: '16px 20px' }}>
        <div className="panel-header" style={{ margin: '-16px -20px 14px -20px' }}>
          <span className="panel-title">
            <BarChart3 size={15} color="#38bdf8" /> Incident Analytics & Operational Telemetry
          </span>
          <span className="badge badge-cyan">24H Assessment Log</span>
        </div>
        <p style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
          Aggregated quantitative risk analytics, demographic exposure curves, and multi-agency response metrics across Sector 7.
        </p>
      </div>

      {/* Row 1: Risk Trend Chart + Alert Severity Distribution */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '16px' }}>
        {/* Risk Trend 24H SVG Chart */}
        <div className="tactical-panel" style={{ padding: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <div>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <TrendingUp size={15} color="#ef4444" /> 24-HOUR COMPOSITE RISK TREND
              </h4>
              <span style={{ fontSize: '0.68rem', color: '#64748b' }}>Hourly sensor aggregation</span>
            </div>
            <span className="badge badge-critical">+148% surge since 03:00</span>
          </div>

          {/* SVG Chart */}
          <div style={{ width: '100%', height: '210px', background: 'rgba(9, 14, 26, 0.6)', borderRadius: '6px', padding: '10px' }}>
            <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: '100%' }}>
              <defs>
                <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              {[25, 50, 75, 100].map(val => {
                const y = height - paddingY - (val / 100) * (height - 2 * paddingY);
                return (
                  <g key={val}>
                    <line x1={paddingX} y1={y} x2={width - paddingX} y2={y} stroke="#182642" strokeWidth="1" strokeDasharray="3,3" />
                    <text x={paddingX - 8} y={y + 3} textAnchor="end" fill="#64748b" fontSize="8" fontFamily="var(--font-mono)">
                      {val}
                    </text>
                  </g>
                );
              })}

              {/* Area Fill */}
              <polygon points={areaStr} fill="url(#trendGradient)" />

              {/* Trend Line */}
              <polyline
                points={polylineStr}
                fill="none"
                stroke="#ef4444"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Data points */}
              {points.map((p, idx) => (
                <g key={idx}>
                  <circle cx={p.x} cy={p.y} r="4" fill="#090e1a" stroke="#ef4444" strokeWidth="2" />
                  {idx === points.length - 1 && (
                    <circle cx={p.x} cy={p.y} r="8" fill="none" stroke="#ef4444" strokeWidth="1.5" className="pulse-red" />
                  )}
                  {/* Time label below */}
                  <text x={p.x} y={height - 6} textAnchor="middle" fill="#94a3b8" fontSize="8.5" fontFamily="var(--font-mono)">
                    {p.time}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>

        {/* Alert Severity Distribution */}
        <div className="tactical-panel" style={{ padding: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <AlertTriangle size={15} color="#f59e0b" /> ALERT SEVERITY DISTRIBUTION
            </h4>
            <span className="badge badge-blue">8 Total Active</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
            {ALERT_SEVERITY_BREAKDOWN.map((item, idx) => (
              <div key={idx} style={{ background: 'rgba(9, 14, 26, 0.6)', padding: '10px 14px', borderRadius: '6px', border: '1px solid #16243d' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: '0.78rem', color: '#ffffff', fontWeight: 600 }}>{item.level}</span>
                  <span style={{ fontSize: '0.78rem', color: item.color, fontWeight: 800, fontFamily: 'var(--font-mono)' }}>
                    {item.count} alerts ({item.percent}%)
                  </span>
                </div>
                <div style={{ height: '6px', background: '#141f36', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${item.percent}%`, background: item.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2: Population Impact Breakdown */}
      <div className="tactical-panel" style={{ padding: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Users size={15} color="#38bdf8" /> POPULATION EXPOSURE & EVACUATION PROGRESS BY SECTOR
          </h4>
          <span className="badge badge-cyan">Census & Drone Estimation</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
          {POPULATION_BY_ZONE.map(zone => (
            <div key={zone.zone} style={{
              background: 'rgba(13, 21, 39, 0.7)',
              padding: '12px',
              borderRadius: '6px',
              borderLeft: `4px solid ${zone.color}`,
              border: '1px solid #1a2845'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                <strong style={{ fontSize: '0.88rem', color: '#ffffff' }}>{zone.zone}</strong>
                <span className={`badge ${
                  zone.severity === 'CRITICAL' ? 'badge-critical' :
                  zone.severity === 'HIGH' ? 'badge-high' :
                  zone.severity === 'MEDIUM' ? 'badge-medium' : 'badge-low'
                }`} style={{ fontSize: '0.62rem' }}>
                  {zone.severity}
                </span>
              </div>

              <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginBottom: '4px' }}>
                Total Pop: {zone.total.toLocaleString()} | At Risk: <strong style={{ color: zone.color }}>{zone.atRisk.toLocaleString()}</strong>
              </div>

              <div style={{ fontSize: '0.7rem', color: '#38bdf8', marginBottom: '6px' }}>
                Evacuated: {zone.evacuated.toLocaleString()} ({Math.round((zone.evacuated / zone.total) * 100)}%)
              </div>

              <div style={{ height: '5px', background: '#141f36', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  width: `${(zone.evacuated / zone.total) * 100}%`,
                  background: '#22c55e'
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Row 3: Response Activity Operational Metrics */}
      <div className="tactical-panel" style={{ padding: '16px' }}>
        <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
          <ShieldCheck size={15} color="#22c55e" /> MULTI-AGENCY INCIDENT RESPONSE ACTIVITY
        </h4>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
          {[
            { label: 'TEAMS DEPLOYED', val: RESPONSE_ACTIVITY_METRICS.teamsDeployed, icon: Truck, color: '#38bdf8' },
            { label: 'SHELTERS ACTIVATED', val: RESPONSE_ACTIVITY_METRICS.sheltersActivated, icon: ShieldCheck, color: '#22c55e' },
            { label: 'ALERTS ISSUED TODAY', val: RESPONSE_ACTIVITY_METRICS.alertsIssuedToday, icon: AlertTriangle, color: '#f59e0b' },
            { label: 'AREAS ASSESSED', val: RESPONSE_ACTIVITY_METRICS.areasAssessed, icon: Activity, color: '#a855f7' },
            { label: 'RESOLVED INCIDENTS', val: RESPONSE_ACTIVITY_METRICS.resolvedAlerts, icon: CheckCircle, color: '#4ade80' },
            { label: 'AIR RECON SORTIES', val: RESPONSE_ACTIVITY_METRICS.airReconSorties, icon: Layers, color: '#06b6d4' }
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} style={{
                background: 'rgba(9, 14, 26, 0.7)',
                padding: '12px',
                borderRadius: '6px',
                border: '1px solid #16243d',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <div style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '6px',
                  background: `${stat.color}15`,
                  border: `1px solid ${stat.color}35`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Icon size={18} color={stat.color} />
                </div>
                <div>
                  <span style={{ fontSize: '0.62rem', color: '#64748b', display: 'block', fontFamily: 'var(--font-mono)' }}>
                    {stat.label}
                  </span>
                  <span style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-mono)' }}>
                    {stat.val}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

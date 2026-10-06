import React, { useState } from 'react';
import { 
  Radio, 
  Shield, 
  Cross, 
  Truck, 
  Navigation, 
  AlertTriangle, 
  Users, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  ArrowRight,
  Compass,
  PhoneCall
} from 'lucide-react';
import { SHELTERS, HOSPITALS, RESCUE_TEAMS, EVACUATION_ROUTES, EMERGENCY_CONTACTS } from '../data/resources';
import { ZONES } from '../data/zones';

export default function EmergencyResponse({ 
  onSelectZone, 
  onOpenAssistant 
}) {
  const [selectedSubTab, setSelectedSubTab] = useState('all');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Top Banner: Incident Command & Response Priority */}
      <div className="tactical-panel corner-bracket" style={{ padding: '18px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="badge badge-cyan">INCIDENT COMMAND SYSTEM</span>
              <span style={{ fontSize: '0.68rem', color: '#64748b', fontFamily: 'var(--font-mono)' }}>ICS-204 RESOURCE MATRIX</span>
            </div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', marginTop: '4px' }}>
              Emergency Operations & Resource Allocation
            </h2>
            <p style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
              Algorithmic prioritization directing emergency assets to where human life is most acutely endangered.
            </p>
          </div>

          <div style={{
            background: 'rgba(239, 68, 68, 0.12)',
            border: '1px solid rgba(239, 68, 68, 0.4)',
            padding: '8px 16px',
            borderRadius: '6px',
            textAlign: 'right'
          }}>
            <span style={{ fontSize: '0.62rem', color: '#f87171', fontFamily: 'var(--font-mono)', display: 'block' }}>PRIMARY OBJECTIVE</span>
            <strong style={{ fontSize: '0.9rem', color: '#ffffff' }}>WHAT TO DO FIRST: ZONE A RESCUE</strong>
          </div>
        </div>

        {/* Tactical Response Priority Ranking Board */}
        <div style={{
          background: 'rgba(9, 14, 26, 0.75)',
          borderRadius: '8px',
          border: '1px solid #1a2948',
          padding: '12px 16px'
        }}>
          <div style={{ fontSize: '0.72rem', color: '#38bdf8', fontWeight: 700, letterSpacing: '0.05em', marginBottom: '10px' }}>
            OPERATIONAL RESPONSE PRIORITY MATRIX (RANKED BY SEVERITY & POPULATION VULNERABILITY):
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px' }}>
            {[
              { rank: '1', zone: 'Zone A (Delta Basin)', priority: 'IMMEDIATE', reason: 'Active levee overtopping, 14,200 exposed', color: '#ef4444' },
              { rank: '2', zone: 'Zone B (Metro Core)', priority: 'HIGH', reason: 'Subway water ingress & culvert saturation', color: '#f97316' },
              { rank: '3', zone: 'Zone C (Port Terminal)', priority: 'MODERATE', reason: 'Chemical facility containment & storm surge', color: '#eab308' },
              { rank: '4', zone: 'Zone D (North Ridge)', priority: 'STAGING', reason: 'Designated reception sanctuary & command base', color: '#22c55e' }
            ].map(item => (
              <div 
                key={item.rank}
                style={{
                  background: 'rgba(13, 21, 39, 0.8)',
                  border: `1px solid ${item.color}40`,
                  borderLeft: `4px solid ${item.color}`,
                  borderRadius: '6px',
                  padding: '10px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px'
                }}
              >
                <div style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '50%',
                  background: `${item.color}25`,
                  color: item.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '0.82rem',
                  fontFamily: 'var(--font-mono)'
                }}>
                  {item.rank}
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <strong style={{ fontSize: '0.8rem', color: '#ffffff' }}>{item.zone}</strong>
                  </div>
                  <span style={{ fontSize: '0.7rem', color: item.color, fontWeight: 700 }}>
                    Priority: {item.priority}
                  </span>
                  <p style={{ fontSize: '0.68rem', color: '#94a3b8', marginTop: '2px' }}>
                    {item.reason}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Evacuation Intelligence Section */}
      <div className="tactical-panel corner-bracket" style={{ padding: '18px 20px' }}>
        <div className="panel-header" style={{ margin: '-18px -20px 14px -20px' }}>
          <span className="panel-title">
            <Navigation size={14} color="#06b6d4" /> Evacuation Intelligence & Corridors
          </span>
          <span className="badge badge-cyan">Transit Analysis</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px', marginBottom: '16px' }}>
          <div style={{ background: 'rgba(13, 21, 39, 0.7)', padding: '12px', borderRadius: '6px', border: '1px solid #1a2948' }}>
            <span style={{ fontSize: '0.68rem', color: '#64748b', display: 'block', marginBottom: '2px' }}>HIGHEST RISK AREA</span>
            <strong style={{ fontSize: '0.95rem', color: '#ef4444' }}>Zone A (Delta Basin Inundation)</strong>
            <p style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '4px' }}>Water cresting at 4.8m; mandatory vertical evacuation.</p>
          </div>

          <div style={{ background: 'rgba(13, 21, 39, 0.7)', padding: '12px', borderRadius: '6px', border: '1px solid #1a2948' }}>
            <span style={{ fontSize: '0.68rem', color: '#64748b', display: 'block', marginBottom: '2px' }}>RECOMMENDED EVACUATION VECTOR</span>
            <strong style={{ fontSize: '0.95rem', color: '#22c55e', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Compass size={15} /> Northeast via Corridor Alpha
            </strong>
            <p style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '4px' }}>Elevated Ridgeway Viaduct (Elev 45–85m).</p>
          </div>

          <div style={{ background: 'rgba(13, 21, 39, 0.7)', padding: '12px', borderRadius: '6px', border: '1px solid #1a2948' }}>
            <span style={{ fontSize: '0.68rem', color: '#64748b', display: 'block', marginBottom: '2px' }}>ESTIMATED POPULATION REQUIRING EVAC</span>
            <strong style={{ fontSize: '0.95rem', color: '#ffffff' }}>14,200 Residents</strong>
            <p style={{ fontSize: '0.72rem', color: '#38bdf8', marginTop: '4px' }}>6,400 successfully relocated (45%).</p>
          </div>

          <div style={{ background: 'rgba(13, 21, 39, 0.7)', padding: '12px', borderRadius: '6px', border: '1px solid #1a2948' }}>
            <span style={{ fontSize: '0.68rem', color: '#64748b', display: 'block', marginBottom: '2px' }}>NEAREST SAFE HAVEN</span>
            <strong style={{ fontSize: '0.95rem', color: '#38bdf8' }}>North Ridge Civic Auditorium</strong>
            <p style={{ fontSize: '0.72rem', color: '#4ade80', marginTop: '4px' }}>1,080 spaces available | 3.4 km.</p>
          </div>
        </div>

        {/* Evacuation Corridors Status */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 600 }}>MONITORED EVACUATION CORRIDORS:</span>
          {EVACUATION_ROUTES.map(route => (
            <div key={route.id} style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 14px',
              background: 'rgba(9, 14, 26, 0.6)',
              borderRadius: '6px',
              borderLeft: `4px solid ${route.badgeColor}`,
              border: '1px solid #16243d'
            }}>
              <div>
                <strong style={{ fontSize: '0.82rem', color: '#ffffff' }}>{route.name}</strong>
                <p style={{ fontSize: '0.7rem', color: '#94a3b8' }}>From {route.fromZone} → {route.toShelter}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '0.72rem', color: '#cbd5e1', fontFamily: 'var(--font-mono)' }}>Speed: {route.trafficSpeed}</span>
                <span className={`badge ${route.isSafe ? 'badge-low' : 'badge-critical'}`}>
                  {route.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Resource Allocation Three Columns: Shelters, Hospitals, Rescue Teams */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
        {/* Column 1: Safe Shelters */}
        <div className="tactical-panel" style={{ padding: '16px' }}>
          <div className="panel-header" style={{ margin: '-16px -16px 12px -16px' }}>
            <span className="panel-title">
              <Shield size={14} color="#22c55e" /> Safe Shelters ({SHELTERS.length})
            </span>
            <span className="badge badge-low">All Open</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {SHELTERS.map(sh => (
              <div key={sh.id} style={{
                background: 'rgba(13, 21, 39, 0.65)',
                padding: '12px',
                borderRadius: '6px',
                border: '1px solid #1a2948'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                  <strong style={{ fontSize: '0.85rem', color: '#ffffff' }}>{sh.name}</strong>
                  <span style={{ fontSize: '0.7rem', color: '#38bdf8', fontFamily: 'var(--font-mono)' }}>{sh.distance}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#94a3b8', marginBottom: '6px' }}>
                  <span>Occupancy: {sh.occupied} / {sh.capacity}</span>
                  <span style={{ color: '#4ade80', fontWeight: 700 }}>{sh.availableSpaces} spaces free</span>
                </div>
                {/* Progress bar */}
                <div style={{ height: '5px', background: '#141f36', borderRadius: '3px', overflow: 'hidden', marginBottom: '6px' }}>
                  <div style={{
                    height: '100%',
                    width: `${(sh.occupied / sh.capacity) * 100}%`,
                    background: (sh.occupied / sh.capacity) > 0.85 ? '#f97316' : '#22c55e'
                  }} />
                </div>
                <span className="badge badge-low" style={{ fontSize: '0.62rem' }}>{sh.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Column 2: Hospitals & Trauma Care */}
        <div className="tactical-panel" style={{ padding: '16px' }}>
          <div className="panel-header" style={{ margin: '-16px -16px 12px -16px' }}>
            <span className="panel-title">
              <Cross size={14} color="#0284c7" /> Hospitals & Trauma ({HOSPITALS.length})
            </span>
            <span className="badge badge-blue">Online</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {HOSPITALS.map(hosp => (
              <div key={hosp.id} style={{
                background: 'rgba(13, 21, 39, 0.65)',
                padding: '12px',
                borderRadius: '6px',
                border: '1px solid #1a2948'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                  <strong style={{ fontSize: '0.85rem', color: '#ffffff' }}>{hosp.name}</strong>
                  <span style={{ fontSize: '0.7rem', color: '#38bdf8', fontFamily: 'var(--font-mono)' }}>{hosp.distance}</span>
                </div>
                <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginBottom: '4px' }}>
                  {hosp.traumaLevel} | {hosp.emergencyCapacity}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#cbd5e1', marginBottom: '6px' }}>
                  <span>ICU Available: <strong style={{ color: '#22c55e' }}>{hosp.icuBedsAvailable} Beds</strong></span>
                  <span style={{ color: '#38bdf8' }}>{hosp.generatorStatus}</span>
                </div>
                <span className="badge badge-blue" style={{ fontSize: '0.62rem' }}>{hosp.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Column 3: Rescue Teams Deployed */}
        <div className="tactical-panel" style={{ padding: '16px' }}>
          <div className="panel-header" style={{ margin: '-16px -16px 12px -16px' }}>
            <span className="panel-title">
              <Truck size={14} color="#38bdf8" /> Rescue Strike Teams ({RESCUE_TEAMS.length})
            </span>
            <span className="badge badge-cyan">Tactical Units</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {RESCUE_TEAMS.map(team => (
              <div key={team.id} style={{
                background: 'rgba(13, 21, 39, 0.65)',
                padding: '12px',
                borderRadius: '6px',
                border: '1px solid #1a2948'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 800, color: '#38bdf8', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
                    {team.callsign} — {team.name}
                  </span>
                </div>
                <p style={{ fontSize: '0.72rem', color: '#cbd5e1', marginBottom: '4px' }}>
                  {team.type} ({team.personnel} personnel, {team.crafts} vehicles)
                </p>
                <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginBottom: '6px' }}>
                  Location: <strong style={{ color: '#ffffff' }}>{team.currentLocation}</strong>
                </div>
                <span className="badge badge-critical" style={{ fontSize: '0.62rem' }}>{team.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

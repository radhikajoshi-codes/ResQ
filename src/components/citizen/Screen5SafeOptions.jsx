import React, { useState } from 'react';
import { 
  MapPin, 
  Navigation, 
  Map, 
  ShieldCheck, 
  Clock, 
  ExternalLink,
  ChevronDown,
  ChevronUp,
  BedDouble,
  HeartPulse
} from 'lucide-react';
import CitizenSafetyMap from './CitizenSafetyMap';

export default function Screen5SafeOptions({
  resources,
  userLocation,
  disasterName,
  riskLevel
}) {
  const [showMap, setShowMap] = useState(false);

  return (
    <section id="safe-options" style={{ marginBottom: '2.5rem', scrollMarginTop: '80px' }}>
      
      {/* Section Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.25rem' }}>
        <div>
          <h2 style={{ 
            fontSize: '1.4rem', 
            fontWeight: 800, 
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span>🧭 Nearby safe options</span>
          </h2>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            Verified reception sanctuaries and emergency facilities outside the high-risk hazard zone.
          </p>
        </div>

        {/* VIEW ON MAP Button */}
        <button
          type="button"
          onClick={() => setShowMap(!showMap)}
          style={{
            background: showMap ? 'var(--blue-primary)' : 'var(--navy-800)',
            border: '1.5px solid var(--border-card)',
            color: '#ffffff',
            fontSize: '0.85rem',
            fontWeight: 700,
            padding: '0.55rem 1rem',
            borderRadius: '10px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem',
            transition: 'all 0.2s',
            boxShadow: showMap ? '0 4px 14px rgba(59, 130, 246, 0.35)' : 'none'
          }}
        >
          <Map size={16} />
          <span>{showMap ? 'HIDE MAP' : 'VIEW ON MAP'}</span>
          {showMap ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      </div>

      {/* Resource Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginBottom: showMap ? '1.5rem' : '0' }}>
        {resources.map((res) => {
          const isShelter = res.type === 'shelter' || res.type === 'emergency_point';

          return (
            <div 
              key={res.id}
              className="citizen-card"
              style={{
                background: 'var(--navy-850)',
                borderTop: `3px solid ${isShelter ? 'var(--risk-low)' : 'var(--blue-primary)'}`,
                padding: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                {/* Header tag & status */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ 
                    fontSize: '0.72rem', 
                    fontWeight: 700, 
                    color: isShelter ? '#10b981' : '#38bdf8', 
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em'
                  }}>
                    {isShelter ? 'Emergency Shelter' : 'Medical Hospital'}
                  </span>

                  <span style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    padding: '0.2rem 0.55rem',
                    borderRadius: '9999px',
                    background: res.status === 'Open' ? 'rgba(16, 185, 129, 0.18)' : 'rgba(56, 189, 248, 0.18)',
                    color: res.status === 'Open' ? '#10b981' : '#38bdf8'
                  }}>
                    {res.status}
                  </span>
                </div>

                {/* Name */}
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.45rem', lineHeight: 1.25 }}>
                  {res.name}
                </h3>

                {/* Distance & Travel time */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#ffffff', fontWeight: 700 }}>
                    <MapPin size={15} color="#38bdf8" />
                    <span>{res.distance}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Clock size={14} />
                    <span>{res.travelTime}</span>
                  </div>
                </div>

                {/* Capacity or Elevation */}
                <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '0.85rem', lineHeight: 1.35 }}>
                  {res.elevation && <div>⛰️ {res.elevation}</div>}
                  {res.capacity && <div>👥 {res.capacity}</div>}
                </div>
              </div>

              {/* Recommended direction note */}
              <div style={{ 
                padding: '0.55rem 0.75rem', 
                background: 'var(--navy-900)', 
                borderRadius: '8px', 
                fontSize: '0.78rem', 
                color: '#38bdf8',
                border: '1px solid var(--border-subtle)'
              }}>
                <strong>Direction:</strong> {res.recommendedDirection}
              </div>
            </div>
          );
        })}
      </div>

      {/* Embedded Map Section (Expands cleanly on demand) */}
      {showMap && (
        <div style={{ marginTop: '1.5rem' }}>
          <CitizenSafetyMap
            userLocation={userLocation}
            disasterName={disasterName}
            resources={resources}
            riskLevel={riskLevel}
          />
        </div>
      )}

    </section>
  );
}

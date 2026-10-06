import React, { useState } from 'react';
import { 
  MapPin, 
  Shield, 
  PlusCircle, 
  Navigation, 
  Layers, 
  Check, 
  Info,
  ArrowUpRight
} from 'lucide-react';

export default function CitizenSafetyMap({
  userLocation,
  disasterName,
  resources,
  riskLevel
}) {
  const [selectedPin, setSelectedPin] = useState(resources[0]);
  const [filterType, setFilterType] = useState('all'); // 'all', 'shelter', 'hospital'

  const filteredResources = filterType === 'all' 
    ? resources 
    : resources.filter(r => r.type === filterType);

  // SVG coordinate positions for a clear visual representation
  // Canvas coordinate system: 800 x 420
  const userCoords = { x: 260, y: 270 };
  
  const pinPositions = {
    'res-1': { x: 540, y: 110 }, // Shelter Alpha (North-East, High Ground)
    'res-2': { x: 620, y: 260 }, // Hospital (East)
    'res-3': { x: 420, y: 70 }   // Highland Point C (North)
  };

  return (
    <div style={{
      background: 'var(--navy-900)',
      border: '1.5px solid var(--border-card)',
      borderRadius: '16px',
      overflow: 'hidden',
      position: 'relative'
    }}>
      {/* Top Map Toolbar */}
      <div style={{
        padding: '0.85rem 1.25rem',
        background: 'rgba(9, 14, 26, 0.95)',
        borderBottom: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.75rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Navigation size={16} color="#38bdf8" />
          <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#ffffff' }}>
            Emergency Safety & Evacuation Map
          </span>
        </div>

        {/* Filter buttons */}
        <div style={{ display: 'flex', gap: '0.35rem' }}>
          <button
            type="button"
            onClick={() => setFilterType('all')}
            style={{
              background: filterType === 'all' ? 'var(--blue-primary)' : 'var(--navy-800)',
              color: filterType === 'all' ? '#fff' : 'var(--text-muted)',
              border: '1px solid var(--border-subtle)',
              fontSize: '0.76rem',
              fontWeight: 600,
              padding: '0.25rem 0.65rem',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            All Resources
          </button>

          <button
            type="button"
            onClick={() => setFilterType('shelter')}
            style={{
              background: filterType === 'shelter' ? 'var(--risk-low)' : 'var(--navy-800)',
              color: filterType === 'shelter' ? '#060a12' : 'var(--text-muted)',
              border: '1px solid var(--border-subtle)',
              fontSize: '0.76rem',
              fontWeight: 700,
              padding: '0.25rem 0.65rem',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            Shelters Only
          </button>

          <button
            type="button"
            onClick={() => setFilterType('hospital')}
            style={{
              background: filterType === 'hospital' ? '#38bdf8' : 'var(--navy-800)',
              color: filterType === 'hospital' ? '#060a12' : 'var(--text-muted)',
              border: '1px solid var(--border-subtle)',
              fontSize: '0.76rem',
              fontWeight: 700,
              padding: '0.25rem 0.65rem',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            Hospitals
          </button>
        </div>
      </div>

      {/* SVG Interactive Map Area */}
      <div style={{ position: 'relative', width: '100%', height: '360px', background: '#0a1020' }}>
        <svg
          viewBox="0 0 800 420"
          style={{ width: '100%', height: '100%', display: 'block' }}
        >
          <defs>
            {/* Grid Pattern */}
            <pattern id="tactical-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.035)" strokeWidth="1" />
            </pattern>

            {/* Linear gradient for evacuation corridor */}
            <linearGradient id="evacGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="1" />
            </linearGradient>

            {/* Radial gradient for risk hazard zone */}
            <radialGradient id="hazardGrad" cx="35%" cy="65%" r="50%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.35" />
              <stop offset="60%" stopColor="#ef4444" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Background Grid */}
          <rect width="800" height="420" fill="url(#tactical-grid)" />

          {/* Stylized River / Hazard Basin */}
          <path
            d="M -20,380 C 180,360 220,310 280,260 C 340,210 310,140 240,90 C 180,45 100,-20 -20,-20 Z"
            fill="rgba(14, 165, 233, 0.08)"
            stroke="rgba(14, 165, 233, 0.25)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />

          {/* Shaded Hazard Danger Zone (Buffer around user area) */}
          <circle
            cx={userCoords.x}
            cy={userCoords.y}
            r="140"
            fill="url(#hazardGrad)"
          />
          <circle
            cx={userCoords.x}
            cy={userCoords.y}
            r="140"
            fill="none"
            stroke="rgba(239, 68, 68, 0.4)"
            strokeWidth="1.5"
            strokeDasharray="6 4"
          />
          <text 
            x={userCoords.x - 120} 
            y={userCoords.y + 115} 
            fill="#f87171" 
            fontSize="11" 
            fontWeight="700"
            letterSpacing="0.06em"
          >
            ACTIVE HAZARD INUNDATION ZONE
          </text>

          {/* Safe High Ground Contour Ring (North Ridge) */}
          <ellipse
            cx="540"
            cy="110"
            rx="190"
            ry="90"
            fill="rgba(16, 185, 129, 0.06)"
            stroke="rgba(16, 185, 129, 0.3)"
            strokeWidth="1.5"
          />
          <text 
            x="490" 
            y="45" 
            fill="#34d399" 
            fontSize="11" 
            fontWeight="700"
            letterSpacing="0.05em"
          >
            SAFE HIGH-GROUND SANCTUARY (85m+)
          </text>

          {/* Evacuation Direction Corridor (Arrow Line from user to Shelter Alpha) */}
          <path
            d={`M ${userCoords.x + 10},${userCoords.y - 10} C 360,220 440,160 ${pinPositions['res-1'].x - 15},${pinPositions['res-1'].y + 15}`}
            fill="none"
            stroke="url(#evacGrad)"
            strokeWidth="4"
            strokeDasharray="8 6"
            style={{ filter: 'drop-shadow(0 0 6px rgba(16, 185, 129, 0.4))' }}
          />

          {/* Evacuation Arrowhead */}
          <polygon
            points={`${pinPositions['res-1'].x - 12},${pinPositions['res-1'].y + 5} ${pinPositions['res-1'].x - 22},${pinPositions['res-1'].y + 22} ${pinPositions['res-1'].x - 2},${pinPositions['res-1'].y + 18}`}
            fill="#10b981"
          />

          {/* Route Label */}
          <rect x="360" y="180" width="165" height="24" rx="12" fill="rgba(15, 23, 42, 0.9)" stroke="rgba(16, 185, 129, 0.5)" strokeWidth="1" />
          <text x="372" y="196" fill="#34d399" fontSize="10" fontWeight="700">
            ↗ RECOMMENDED ROUTE
          </text>

          {/* 📍 USER LOCATION PIN */}
          <g transform={`translate(${userCoords.x}, ${userCoords.y})`}>
            {/* Pulsing Beacon Ring */}
            <circle cx="0" cy="0" r="18" fill="rgba(56, 189, 248, 0.25)" className="pulse-beacon" />
            <circle cx="0" cy="0" r="10" fill="#0284c7" stroke="#ffffff" strokeWidth="2.5" />
            <circle cx="0" cy="0" r="4" fill="#ffffff" />
            {/* Label */}
            <rect x="-65" y="16" width="130" height="22" rx="6" fill="rgba(15, 23, 42, 0.95)" stroke="#38bdf8" strokeWidth="1" />
            <text x="0" y="31" fill="#ffffff" fontSize="10" fontWeight="700" textAnchor="middle">
              📍 YOU ARE HERE
            </text>
          </g>

          {/* RESOURCE PINS */}
          {filteredResources.map((res) => {
            const pos = pinPositions[res.id] || { x: 500, y: 200 };
            const isSelected = selectedPin?.id === res.id;
            const isShelter = res.type === 'shelter' || res.type === 'emergency_point';

            return (
              <g 
                key={res.id} 
                transform={`translate(${pos.x}, ${pos.y})`}
                onClick={() => setSelectedPin(res)}
                style={{ cursor: 'pointer' }}
              >
                {/* Glow ring if selected */}
                {isSelected && (
                  <circle cx="0" cy="0" r="24" fill="none" stroke="#ffffff" strokeWidth="2" strokeDasharray="3 3" />
                )}

                {/* Marker body */}
                <circle 
                  cx="0" 
                  cy="0" 
                  r="16" 
                  fill={isShelter ? '#10b981' : '#0284c7'} 
                  stroke="#ffffff" 
                  strokeWidth="2"
                  style={{ filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.5))' }}
                />
                
                {/* Icon interior */}
                <text x="0" y="4" fill="#ffffff" fontSize="12" fontWeight="800" textAnchor="middle">
                  {isShelter ? '⛺' : '🏥'}
                </text>

                {/* Pin Title Badge */}
                <rect 
                  x="-70" 
                  y="-34" 
                  width="140" 
                  height="22" 
                  rx="6" 
                  fill={isSelected ? '#ffffff' : 'rgba(15, 23, 42, 0.92)'} 
                  stroke={isShelter ? '#10b981' : '#38bdf8'} 
                  strokeWidth="1.5" 
                />
                <text 
                  x="0" 
                  y="-19" 
                  fill={isSelected ? '#060a12' : '#ffffff'} 
                  fontSize="10" 
                  fontWeight="700" 
                  textAnchor="middle"
                >
                  {res.name.split('(')[0].trim().slice(0, 18)}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Selected Pin Mini Info Overlay in Bottom Right */}
        {selectedPin && (
          <div style={{
            position: 'absolute',
            bottom: '12px',
            right: '12px',
            left: '12px',
            maxWidth: '380px',
            background: 'rgba(9, 14, 26, 0.94)',
            backdropFilter: 'blur(10px)',
            border: '1px solid var(--border-card)',
            borderRadius: '12px',
            padding: '0.85rem 1rem',
            boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.35rem' }}>
              <div>
                <span style={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  color: selectedPin.type === 'shelter' ? '#10b981' : '#38bdf8',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em'
                }}>
                  {selectedPin.type === 'shelter' ? 'Designated Evacuation Shelter' : 'Medical Hospital'}
                </span>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff', lineHeight: 1.2 }}>
                  {selectedPin.name}
                </h4>
              </div>
              <div style={{
                background: selectedPin.status === 'Open' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(56, 189, 248, 0.2)',
                color: selectedPin.status === 'Open' ? '#10b981' : '#38bdf8',
                fontSize: '0.72rem',
                fontWeight: 700,
                padding: '0.2rem 0.5rem',
                borderRadius: '9999px'
              }}>
                {selectedPin.status}
              </div>
            </div>

            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.45rem' }}>
              📍 <strong>{selectedPin.distance}</strong> away • {selectedPin.travelTime}
            </div>

            <div style={{ fontSize: '0.78rem', color: '#38bdf8', fontWeight: 600 }}>
              Direction: {selectedPin.recommendedDirection}
            </div>
          </div>
        )}
      </div>

      {/* Map Legend */}
      <div style={{
        padding: '0.75rem 1.25rem',
        background: 'var(--navy-850)',
        borderTop: '1px solid var(--border-subtle)',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1.25rem',
        fontSize: '0.78rem',
        color: 'var(--text-muted)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#0284c7' }}></span>
          <span>You Are Here</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }}></span>
          <span>Risk Hazard Area</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }}></span>
          <span>Safe Shelters</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#38bdf8' }}></span>
          <span>Hospitals</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <span style={{ width: '16px', height: '3px', background: '#10b981' }}></span>
          <span>Recommended Route</span>
        </div>
      </div>

    </div>
  );
}

import React, { useState } from 'react';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Layers, 
  Shield, 
  Cross, 
  Navigation, 
  AlertTriangle, 
  Info, 
  CheckCircle,
  Eye,
  Radio,
  MapPin,
  Waves,
  ArrowRight
} from 'lucide-react';
import { ZONES } from '../data/zones';
import { SHELTERS, HOSPITALS, RESCUE_TEAMS, EVACUATION_ROUTES } from '../data/resources';

export default function LiveRiskMap({ 
  selectedZoneId, 
  onSelectZone, 
  disaster,
  onOpenAssistant 
}) {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [activeLayers, setActiveLayers] = useState({
    hazards: true,
    shelters: true,
    hospitals: true,
    rescueUnits: true,
    evacRoutes: true,
    radarSweep: true
  });
  const [activePopup, setActivePopup] = useState(null);

  const toggleLayer = (key) => {
    setActiveLayers(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleZoom = (delta) => {
    setZoomLevel(prev => Math.min(Math.max(prev + delta, 0.8), 2.2));
  };

  const handleReset = () => {
    setZoomLevel(1);
    setActivePopup(null);
  };

  const selectedZoneData = ZONES.find(z => z.id === selectedZoneId) || ZONES[0];

  return (
    <div className="tactical-panel corner-bracket" style={{ height: '100%', minHeight: '520px', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {/* Top Map Header & Controls */}
      <div className="panel-header" style={{ flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="panel-title">
            <Radio size={14} color="#38bdf8" /> Live Geospatial Risk Map
          </span>
          <span className="badge badge-cyan" style={{ fontSize: '0.65rem' }}>
            SECTOR-7 HUD
          </span>
        </div>

        {/* Layer Toggles */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', flexWrap: 'wrap' }}>
          <button
            onClick={() => toggleLayer('hazards')}
            style={{
              padding: '3px 8px',
              borderRadius: '4px',
              border: '1px solid #1a2948',
              background: activeLayers.hazards ? 'rgba(239, 68, 68, 0.18)' : 'transparent',
              color: activeLayers.hazards ? '#f87171' : '#64748b',
              fontSize: '0.68rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <AlertTriangle size={11} /> Hazards
          </button>

          <button
            onClick={() => toggleLayer('shelters')}
            style={{
              padding: '3px 8px',
              borderRadius: '4px',
              border: '1px solid #1a2948',
              background: activeLayers.shelters ? 'rgba(34, 197, 94, 0.18)' : 'transparent',
              color: activeLayers.shelters ? '#4ade80' : '#64748b',
              fontSize: '0.68rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <Shield size={11} /> Shelters
          </button>

          <button
            onClick={() => toggleLayer('hospitals')}
            style={{
              padding: '3px 8px',
              borderRadius: '4px',
              border: '1px solid #1a2948',
              background: activeLayers.hospitals ? 'rgba(56, 189, 248, 0.18)' : 'transparent',
              color: activeLayers.hospitals ? '#38bdf8' : '#64748b',
              fontSize: '0.68rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <Cross size={11} /> Hospitals
          </button>

          <button
            onClick={() => toggleLayer('evacRoutes')}
            style={{
              padding: '3px 8px',
              borderRadius: '4px',
              border: '1px solid #1a2948',
              background: activeLayers.evacRoutes ? 'rgba(6, 182, 212, 0.18)' : 'transparent',
              color: activeLayers.evacRoutes ? '#22d3ee' : '#64748b',
              fontSize: '0.68rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <Navigation size={11} /> Evac Corridors
          </button>

          <button
            onClick={() => toggleLayer('radarSweep')}
            title="Toggle scanning beam"
            style={{
              padding: '3px 7px',
              borderRadius: '4px',
              border: '1px solid #1a2948',
              background: activeLayers.radarSweep ? 'rgba(59, 130, 246, 0.2)' : 'transparent',
              color: activeLayers.radarSweep ? '#60a5fa' : '#64748b',
              fontSize: '0.68rem',
              cursor: 'pointer'
            }}
          >
            Radar {activeLayers.radarSweep ? 'ON' : 'OFF'}
          </button>
        </div>
      </div>

      {/* Main Map Canvas Area */}
      <div 
        style={{ 
          flex: 1, 
          position: 'relative', 
          overflow: 'hidden', 
          background: '#070c17',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {/* Subtle Lat/Long Grid Telemetry Lines */}
        <div 
          className="tactical-grid-bg" 
          style={{ position: 'absolute', inset: 0, opacity: 0.85, pointerEvents: 'none' }}
        />

        {/* Radar Scanner Beam Overlay */}
        {activeLayers.radarSweep && (
          <div 
            style={{
              position: 'absolute',
              width: '540px',
              height: '540px',
              borderRadius: '50%',
              border: '1px dashed rgba(6, 182, 212, 0.2)',
              pointerEvents: 'none',
              overflow: 'hidden'
            }}
          >
            <div className="radar-sweep-beam" />
            <div style={{
              position: 'absolute',
              inset: '25%',
              borderRadius: '50%',
              border: '1px dotted rgba(6, 182, 212, 0.15)'
            }} />
          </div>
        )}

        {/* SVG Tactical Vector Map */}
        <svg
          viewBox="0 0 1000 560"
          style={{
            width: '100%',
            height: '100%',
            transform: `scale(${zoomLevel})`,
            transition: 'transform 0.25s ease-out',
            maxHeight: '620px'
          }}
        >
          <defs>
            {/* Waterway linear gradients */}
            <linearGradient id="riverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#082f49" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#0369a1" stopOpacity="0.4" />
            </linearGradient>
            
            <radialGradient id="oceanGrad" cx="90%" cy="80%" r="60%">
              <stop offset="0%" stopColor="#0284c7" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#070c17" stopOpacity="0.9" />
            </radialGradient>

            <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background Ocean & Bay Area */}
          <path
            d="M 680,560 Q 820,380 1000,320 L 1000,560 Z"
            fill="url(#oceanGrad)"
            stroke="#0ea5e9"
            strokeWidth="1"
            strokeDasharray="4,4"
            opacity="0.6"
          />

          {/* Delta River & Tributary Flow Vectors */}
          <path
            d="M 120,0 Q 240,180 320,290 T 540,430 T 780,560"
            fill="none"
            stroke="#0284c7"
            strokeWidth="18"
            strokeLinecap="round"
            opacity="0.45"
          />
          <path
            d="M 120,0 Q 240,180 320,290 T 540,430 T 780,560"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="3"
            strokeDasharray="8,6"
            opacity="0.7"
          />
          
          {/* Secondary Canal Flow */}
          <path
            d="M 320,290 Q 420,360 480,480"
            fill="none"
            stroke="#0284c7"
            strokeWidth="6"
            opacity="0.35"
          />

          {/* Topographic Contour Lines */}
          <ellipse cx="500" cy="80" rx="340" ry="60" fill="none" stroke="#1e293b" strokeWidth="1" strokeDasharray="3,3" />
          <ellipse cx="500" cy="75" rx="200" ry="40" fill="none" stroke="#1e293b" strokeWidth="1" strokeDasharray="3,3" />

          {/* Operational Zones Polygons */}
          {ZONES.map((zone) => {
            const isSelected = selectedZoneId === zone.id;
            return (
              <g 
                key={zone.id}
                onClick={() => {
                  onSelectZone(zone.id);
                  setActivePopup({
                    type: 'zone',
                    data: zone
                  });
                }}
                style={{ cursor: 'pointer' }}
              >
                {/* Zone Boundary Polygon */}
                <polygon
                  points={zone.polygon}
                  fill={zone.color}
                  fillOpacity={isSelected ? 0.28 : 0.12}
                  stroke={zone.color}
                  strokeWidth={isSelected ? 2.5 : 1.2}
                  strokeDasharray={isSelected ? 'none' : '6,4'}
                  filter={isSelected ? 'url(#glowFilter)' : 'none'}
                />

                {/* Zone Label Stamp */}
                <rect
                  x={zone.center.x - 36}
                  y={zone.center.y - 14}
                  width="72"
                  height="24"
                  rx="4"
                  fill="rgba(9, 14, 26, 0.9)"
                  stroke={zone.color}
                  strokeWidth={isSelected ? 1.8 : 1}
                />
                <text
                  x={zone.center.x}
                  y={zone.center.y + 2}
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize="11"
                  fontWeight="700"
                  fontFamily="var(--font-mono)"
                >
                  {zone.id}
                </text>
              </g>
            );
          })}

          {/* Evacuation Route Corridors (Animated Vectors) */}
          {activeLayers.evacRoutes && EVACUATION_ROUTES.map((route) => (
            <g key={route.id}>
              {/* Glow trail */}
              <polyline
                points={route.path}
                fill="none"
                stroke={route.badgeColor}
                strokeWidth="4"
                strokeOpacity="0.4"
              />
              {/* Animated Dashed Route Line */}
              <polyline
                points={route.path}
                fill="none"
                stroke={route.badgeColor}
                strokeWidth="2"
                strokeDasharray={route.isSafe ? "8,6" : "4,4"}
                strokeLinecap="round"
              />
            </g>
          ))}

          {/* Disaster Hotspots (Pulsing Center Beacon) */}
          {activeLayers.hazards && ZONES.map((zone) => {
            const isCritical = zone.riskLevel === 'CRITICAL';
            return (
              <g 
                key={`hotspot-${zone.id}`}
                transform={`translate(${zone.hazardCenter.x}, ${zone.hazardCenter.y})`}
                onClick={() => {
                  onSelectZone(zone.id);
                  setActivePopup({
                    type: 'hazard',
                    data: zone
                  });
                }}
                style={{ cursor: 'pointer' }}
              >
                {/* Outer pulsing shockwave */}
                <circle
                  r={isCritical ? "24" : "18"}
                  fill={zone.color}
                  fillOpacity="0.18"
                >
                  <animate 
                    attributeName="r" 
                    values={isCritical ? "16;28;16" : "12;20;12"} 
                    dur={isCritical ? "1.8s" : "2.6s"} 
                    repeatCount="indefinite" 
                  />
                  <animate 
                    attributeName="fill-opacity" 
                    values="0.35;0.05;0.35" 
                    dur={isCritical ? "1.8s" : "2.6s"} 
                    repeatCount="indefinite" 
                  />
                </circle>

                {/* Inner marker */}
                <circle
                  r="7"
                  fill={zone.color}
                  stroke="#ffffff"
                  strokeWidth="2"
                />
                
                {/* Score badge next to beacon */}
                <rect
                  x="12"
                  y="-10"
                  width="44"
                  height="18"
                  rx="3"
                  fill="rgba(6, 11, 20, 0.95)"
                  stroke={zone.color}
                  strokeWidth="1"
                />
                <text
                  x="34"
                  y="3"
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize="9.5"
                  fontWeight="700"
                  fontFamily="var(--font-mono)"
                >
                  {zone.riskScore}/100
                </text>
              </g>
            );
          })}

          {/* Safe Shelters Markers */}
          {activeLayers.shelters && SHELTERS.map((sh) => (
            <g 
              key={sh.id}
              transform={`translate(${sh.coords.x}, ${sh.coords.y})`}
              onClick={() => setActivePopup({ type: 'shelter', data: sh })}
              style={{ cursor: 'pointer' }}
            >
              <circle r="12" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" strokeWidth="1.2" />
              <circle r="5" fill="#22c55e" />
              <text x="16" y="4" fill="#86efac" fontSize="9" fontWeight="600" fontFamily="var(--font-sans)">
                {sh.shortName}
              </text>
            </g>
          ))}

          {/* Hospitals Markers */}
          {activeLayers.hospitals && HOSPITALS.map((hosp) => (
            <g 
              key={hosp.id}
              transform={`translate(${hosp.coords.x}, ${hosp.coords.y})`}
              onClick={() => setActivePopup({ type: 'hospital', data: hosp })}
              style={{ cursor: 'pointer' }}
            >
              <rect x="-9" y="-9" width="18" height="18" rx="3" fill="#0284c7" stroke="#ffffff" strokeWidth="1.5" />
              {/* White cross inside */}
              <rect x="-2" y="-6" width="4" height="12" fill="#ffffff" />
              <rect x="-6" y="-2" width="12" height="4" fill="#ffffff" />
              <text x="13" y="4" fill="#7dd3fc" fontSize="9" fontWeight="600" fontFamily="var(--font-sans)">
                {hosp.shortName}
              </text>
            </g>
          ))}

          {/* Rescue Units Markers */}
          {activeLayers.rescueUnits && RESCUE_TEAMS.map((team) => (
            <g 
              key={team.id}
              transform={`translate(${team.coords.x}, ${team.coords.y})`}
              onClick={() => setActivePopup({ type: 'unit', data: team })}
              style={{ cursor: 'pointer' }}
            >
              <polygon points="0,-10 8,8 -8,8" fill="#38bdf8" stroke="#ffffff" strokeWidth="1.2" />
              <text x="11" y="2" fill="#bae6fd" fontSize="8.5" fontWeight="600" fontFamily="var(--font-mono)">
                {team.callsign}
              </text>
            </g>
          ))}

          {/* Current User Location Beacon Pin */}
          <g transform="translate(360, 260)">
            <circle r="16" fill="rgba(6, 182, 212, 0.25)" className="pulse-cyan" />
            <circle r="7" fill="#06b6d4" stroke="#ffffff" strokeWidth="2" />
            <rect x="-48" y="-26" width="96" height="18" rx="3" fill="rgba(6, 182, 212, 0.95)" />
            <text x="0" y="-14" textAnchor="middle" fill="#090e1a" fontSize="8.5" fontWeight="800">
              YOU ARE HERE
            </text>
          </g>

          {/* Compass Rose Telemetry */}
          <g transform="translate(940, 60)">
            <circle r="22" fill="rgba(13, 21, 39, 0.85)" stroke="#1e3a8a" strokeWidth="1" />
            <path d="M 0,-18 L 4,-4 L 0,0 L -4,-4 Z" fill="#ef4444" />
            <path d="M 0,18 L 4,4 L 0,0 L -4,4 Z" fill="#94a3b8" />
            <text x="0" y="-22" textAnchor="middle" fill="#f87171" fontSize="9" fontWeight="800">N</text>
            <text x="24" y="3" textAnchor="start" fill="#94a3b8" fontSize="8">E</text>
          </g>

          {/* Map Scale Stamp */}
          <g transform="translate(30, 520)">
            <rect x="0" y="-14" width="130" height="24" rx="4" fill="rgba(9, 14, 26, 0.85)" stroke="#1a2948" strokeWidth="1" />
            <line x1="12" y1="-2" x2="80" y2="-2" stroke="#ffffff" strokeWidth="2" />
            <line x1="12" y1="-6" x2="12" y2="2" stroke="#ffffff" strokeWidth="1.5" />
            <line x1="80" y1="-6" x2="80" y2="2" stroke="#ffffff" strokeWidth="1.5" />
            <text x="92" y="2" fill="#cbd5e1" fontSize="9" fontFamily="var(--font-mono)">5.0 KM</text>
          </g>
        </svg>

        {/* Floating Zoom & Reset Map Controls */}
        <div style={{
          position: 'absolute',
          right: '16px',
          bottom: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          background: 'rgba(9, 14, 26, 0.88)',
          border: '1px solid #1a2948',
          borderRadius: '6px',
          padding: '4px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
          zIndex: 10
        }}>
          <button
            onClick={() => handleZoom(0.2)}
            title="Zoom In"
            style={{
              width: '30px',
              height: '30px',
              background: 'transparent',
              border: 'none',
              color: '#38bdf8',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '4px'
            }}
          >
            <ZoomIn size={16} />
          </button>
          <button
            onClick={() => handleZoom(-0.2)}
            title="Zoom Out"
            style={{
              width: '30px',
              height: '30px',
              background: 'transparent',
              border: 'none',
              color: '#38bdf8',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '4px'
            }}
          >
            <ZoomOut size={16} />
          </button>
          <button
            onClick={handleReset}
            title="Reset Map View"
            style={{
              width: '30px',
              height: '30px',
              background: 'transparent',
              border: 'none',
              color: '#94a3b8',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '4px'
            }}
          >
            <RotateCcw size={14} />
          </button>
        </div>

        {/* Interactive Marker / Zone Popup Modal */}
        {activePopup && (
          <div style={{
            position: 'absolute',
            bottom: '20px',
            left: '20px',
            maxWidth: '340px',
            background: 'rgba(10, 16, 30, 0.95)',
            border: '1px solid #2563eb',
            borderRadius: '8px',
            padding: '14px',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.8), 0 0 15px rgba(37, 99, 235, 0.3)',
            zIndex: 20,
            backdropFilter: 'blur(10px)'
          }}>
            {/* Close X */}
            <button
              onClick={() => setActivePopup(null)}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: 'transparent',
                border: 'none',
                color: '#94a3b8',
                cursor: 'pointer',
                fontSize: '1rem',
                lineHeight: 1
              }}
            >
              ×
            </button>

            {/* Zone / Hazard Popup Content */}
            {(activePopup.type === 'zone' || activePopup.type === 'hazard') && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <span className={`badge ${
                    activePopup.data.riskLevel === 'CRITICAL' ? 'badge-critical' :
                    activePopup.data.riskLevel === 'HIGH' ? 'badge-high' : 'badge-medium'
                  }`}>
                    {activePopup.data.riskLevel}
                  </span>
                  <span style={{ fontSize: '0.7rem', color: '#38bdf8', fontFamily: 'var(--font-mono)' }}>
                    Score: {activePopup.data.riskScore}/100
                  </span>
                </div>

                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff', marginBottom: '4px' }}>
                  {activePopup.data.name}
                </h3>

                <p style={{ fontSize: '0.74rem', color: '#94a3b8', marginBottom: '8px' }}>
                  <strong>Population at Risk:</strong> {activePopup.data.population.toLocaleString()} | <strong>Evacuated:</strong> {activePopup.data.evacuated.toLocaleString()}
                </p>

                <div style={{
                  background: 'rgba(15, 23, 42, 0.8)',
                  padding: '8px',
                  borderRadius: '6px',
                  fontSize: '0.72rem',
                  color: '#cbd5e1',
                  borderLeft: `3px solid ${activePopup.data.color}`,
                  marginBottom: '10px'
                }}>
                  <strong>Recommended Action:</strong> {activePopup.data.recommendedAction}
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => {
                      onSelectZone(activePopup.data.id);
                      setActivePopup(null);
                    }}
                    className="btn-tactical btn-primary"
                    style={{ fontSize: '0.72rem', padding: '5px 10px', flex: 1 }}
                  >
                    Select Zone
                  </button>
                  <button
                    onClick={() => onOpenAssistant(`Give me emergency response protocol for ${activePopup.data.name}`)}
                    className="btn-tactical btn-outline-cyan"
                    style={{ fontSize: '0.72rem', padding: '5px 10px' }}
                  >
                    Ask AI
                  </button>
                </div>
              </div>
            )}

            {/* Shelter Popup Content */}
            {activePopup.type === 'shelter' && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                  <span className="badge badge-low">SAFE RECEPTION</span>
                  <span style={{ fontSize: '0.7rem', color: '#38bdf8', fontFamily: 'var(--font-mono)' }}>
                    {activePopup.data.distance} away
                  </span>
                </div>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff', marginBottom: '4px' }}>
                  {activePopup.data.name}
                </h3>
                <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '6px' }}>
                  Capacity: {activePopup.data.occupied} / {activePopup.data.capacity} ({activePopup.data.availableSpaces} spaces free)
                </p>
                <div style={{ fontSize: '0.7rem', color: '#cbd5e1', marginBottom: '8px' }}>
                  Amenities: {activePopup.data.amenities.slice(0, 3).join(', ')}
                </div>
                <button
                  onClick={() => onOpenAssistant(`How do I reach ${activePopup.data.name}?`)}
                  className="btn-tactical btn-outline-cyan"
                  style={{ width: '100%', fontSize: '0.72rem' }}
                >
                  Get Route Guidance
                </button>
              </div>
            )}

            {/* Hospital Popup Content */}
            {activePopup.type === 'hospital' && (
              <div>
                <span className="badge badge-blue" style={{ marginBottom: '6px' }}>
                  {activePopup.data.traumaLevel}
                </span>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff', marginBottom: '4px' }}>
                  {activePopup.data.name}
                </h3>
                <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '6px' }}>
                  Emergency Beds: {activePopup.data.icuBedsAvailable} ICU Available | {activePopup.data.emergencyCapacity}
                </p>
                <p style={{ fontSize: '0.7rem', color: '#22c55e' }}>
                  Generator: {activePopup.data.generatorStatus}
                </p>
              </div>
            )}

            {/* Rescue Unit Popup Content */}
            {activePopup.type === 'unit' && (
              <div>
                <span className="badge badge-cyan" style={{ marginBottom: '6px' }}>
                  {activePopup.data.callsign}
                </span>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff', marginBottom: '4px' }}>
                  {activePopup.data.name}
                </h3>
                <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '6px' }}>
                  Location: {activePopup.data.currentLocation}
                </p>
                <p style={{ fontSize: '0.72rem', color: '#38bdf8' }}>
                  Status: {activePopup.data.status}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Map Legend Footer */}
      <div style={{
        padding: '8px 16px',
        borderTop: '1px solid #142038',
        background: 'rgba(9, 14, 26, 0.95)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
        fontSize: '0.7rem',
        color: '#94a3b8'
      }}>
        {/* Severity Legend */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <span style={{ fontWeight: 600, color: '#64748b', fontFamily: 'var(--font-mono)' }}>LEGEND:</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }} /> Critical (75-100)
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f97316' }} /> High (50-74)
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#eab308' }} /> Medium (25-49)
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e' }} /> Safe Zone (0-24)
          </span>
        </div>

        {/* Selected Zone readout */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-mono)' }}>
          <span style={{ color: '#64748b' }}>FOCUSED ZONE:</span>
          <span style={{ color: selectedZoneData.color, fontWeight: 700 }}>
            {selectedZoneData.id} ({selectedZoneData.riskLevel})
          </span>
        </div>
      </div>
    </div>
  );
}

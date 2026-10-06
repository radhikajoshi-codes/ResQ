import React from 'react';
import { 
  MapPin, 
  ArrowRight, 
  Waves, 
  CloudRain, 
  Flame, 
  Wind, 
  CloudLightning, 
  Activity, 
  Sun, 
  AlertTriangle,
  Compass,
  CheckCircle2
} from 'lucide-react';
import { DISASTERS, LOCATION_PRESETS } from '../../services/riskEngine';

const ICON_MAP = {
  Waves,
  CloudRain,
  Flame,
  Wind,
  CloudLightning,
  Activity,
  Sun,
  AlertTriangle
};

export default function Screen1Home({
  location,
  onChangeLocation,
  selectedDisaster,
  onSelectDisaster,
  onProceed
}) {
  const handlePresetClick = (preset) => {
    onChangeLocation(preset.name);
    if (preset.defaultDisaster) {
      onSelectDisaster(preset.defaultDisaster);
    }
  };

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          onChangeLocation(`My Location (${pos.coords.latitude.toFixed(3)}, ${pos.coords.longitude.toFixed(3)})`);
        },
        () => {
          onChangeLocation('Riverside / Delta District (Auto-detected)');
        },
        { timeout: 3000 }
      );
    } else {
      onChangeLocation('Riverside / Delta District');
    }
  };

  return (
    <div style={{ padding: '2.5rem 0 3.5rem 0' }}>
      <div className="citizen-container">
        
        {/* Hero Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }}>
            <img 
              src="/resq-logo.png" 
              alt="ResQ AI Disaster Intelligence" 
              style={{
                width: '76px',
                height: '76px',
                borderRadius: '18px',
                objectFit: 'cover',
                boxShadow: '0 8px 30px rgba(56, 189, 248, 0.35), 0 0 15px rgba(37, 99, 235, 0.4)',
                border: '1.5px solid rgba(56, 189, 248, 0.4)'
              }}
            />
          </div>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.75rem' }}>
            <span style={{ 
              fontSize: '0.8rem', 
              fontWeight: 700, 
              letterSpacing: '0.08em', 
              textTransform: 'uppercase', 
              color: '#38bdf8',
              background: 'rgba(56, 189, 248, 0.12)',
              padding: '0.3rem 0.8rem',
              borderRadius: '9999px',
              border: '1px solid rgba(56, 189, 248, 0.25)'
            }}>
              Disaster Safety Assistant
            </span>
          </div>

          <h1 style={{ 
            fontSize: 'clamp(2rem, 5vw, 3rem)', 
            fontWeight: 800, 
            letterSpacing: '-0.03em', 
            color: '#ffffff',
            lineHeight: 1.15,
            marginBottom: '0.75rem'
          }}>
            Are you safe right now?
          </h1>

          <p style={{ 
            fontSize: '1.15rem', 
            color: 'var(--text-muted)', 
            maxWidth: '560px', 
            margin: '0 auto',
            lineHeight: 1.5
          }}>
            Tell us where you are and what’s happening. ResQ provides instant risk assessment, life-saving actions, and nearby safe shelters.
          </p>
        </div>

        {/* Input Card */}
        <div className="citizen-card citizen-card-highlight" style={{ marginBottom: '2rem' }}>
          
          {/* 1. Location Input */}
          <div style={{ marginBottom: '1.75rem' }}>
            <label style={{ 
              display: 'block', 
              fontSize: '0.95rem', 
              fontWeight: 700, 
              color: '#ffffff', 
              marginBottom: '0.5rem' 
            }}>
              📍 Enter your location
            </label>
            
            <div style={{ position: 'relative' }}>
              <div style={{ 
                position: 'absolute', 
                left: '1rem', 
                top: '50%', 
                transform: 'translateY(-50%)', 
                color: '#38bdf8',
                display: 'flex',
                alignItems: 'center'
              }}>
                <MapPin size={20} />
              </div>

              <input
                type="text"
                value={location}
                onChange={(e) => onChangeLocation(e.target.value)}
                placeholder="e.g. Riverside / Lower Basin, Downtown, or street address"
                style={{
                  width: '100%',
                  padding: '0.95rem 1rem 0.95rem 3rem',
                  background: 'var(--navy-900)',
                  border: '1.5px solid var(--border-card)',
                  borderRadius: '12px',
                  color: '#ffffff',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--blue-primary)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--border-card)'}
              />

              <button
                type="button"
                onClick={handleUseCurrentLocation}
                style={{
                  position: 'absolute',
                  right: '0.65rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'var(--navy-800)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '8px',
                  color: 'var(--text-muted)',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  padding: '0.35rem 0.65rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#fff';
                  e.currentTarget.style.borderColor = 'var(--blue-primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--text-muted)';
                  e.currentTarget.style.borderColor = 'var(--border-subtle)';
                }}
              >
                <Compass size={14} />
                <span>GPS Auto</span>
              </button>
            </div>

            {/* Quick Location Presets */}
            <div style={{ marginTop: '0.75rem', display: 'flex', flexWrap: 'wrap', gap: '0.45rem', alignItems: 'center' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 600 }}>Quick Presets:</span>
              {LOCATION_PRESETS.map((p) => (
                <button
                  key={p.name}
                  type="button"
                  onClick={() => handlePresetClick(p)}
                  style={{
                    background: location === p.name ? 'rgba(59, 130, 246, 0.15)' : 'var(--navy-850)',
                    border: location === p.name ? '1px solid var(--blue-primary)' : '1px solid var(--border-subtle)',
                    color: location === p.name ? '#38bdf8' : 'var(--text-muted)',
                    fontSize: '0.76rem',
                    padding: '0.25rem 0.6rem',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Disaster Selection */}
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <label style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff' }}>
                Select what is happening:
              </label>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Choose the primary hazard
              </span>
            </div>

            <div className="disaster-grid">
              {DISASTERS.map((disaster) => {
                const IconComponent = ICON_MAP[disaster.iconName] || AlertTriangle;
                const isSelected = selectedDisaster === disaster.id;

                return (
                  <button
                    key={disaster.id}
                    type="button"
                    className={`disaster-choice-btn ${isSelected ? 'selected' : ''}`}
                    onClick={() => onSelectDisaster(disaster.id)}
                  >
                    <div className="disaster-choice-icon" style={{ color: disaster.color }}>
                      <IconComponent size={24} />
                    </div>

                    <div style={{ width: '100%' }}>
                      <div style={{ 
                        fontSize: '0.92rem', 
                        fontWeight: 700, 
                        color: isSelected ? '#ffffff' : 'var(--text-main)',
                        marginBottom: '0.15rem'
                      }}>
                        {disaster.name}
                      </div>
                      <div style={{ 
                        fontSize: '0.72rem', 
                        color: 'var(--text-dim)', 
                        lineHeight: 1.2,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}>
                        {disaster.tagline}
                      </div>
                    </div>

                    {isSelected && (
                      <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#38bdf8', fontSize: '0.72rem', fontWeight: 600 }}>
                        <CheckCircle2 size={13} />
                        <span>Selected</span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Action CTA */}
          <div>
            <button
              type="button"
              className="btn-primary-resq"
              onClick={onProceed}
            >
              <span>CHECK MY RISK</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        {/* Prototype Demo Notice */}
        <div style={{
          textAlign: 'center',
          padding: '0.85rem 1.2rem',
          background: 'rgba(15, 23, 42, 0.6)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '12px',
          maxWidth: '650px',
          margin: '0 auto'
        }}>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', lineHeight: 1.45 }}>
            <strong style={{ color: 'var(--text-muted)' }}>Prototype / Demo Data:</strong> ResQ is a prototype safety assistant using simulated emergency scenarios for demonstration. It does not provide certified real-time official warnings or replace local authorities.
          </p>
        </div>

      </div>
    </div>
  );
}

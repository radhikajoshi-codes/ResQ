import React from 'react';
import { Shield, Home, AlertCircle, MessageSquare, PhoneCall } from 'lucide-react';

export default function CitizenNavbar({
  currentNav,
  onChangeNav,
  hasAssessedRisk,
  onOpenSos
}) {
  return (
    <header className="citizen-nav">
      <div className="citizen-container-wide citizen-nav-inner">
        {/* Brand & Slogan */}
        <div 
          className="citizen-brand"
          onClick={() => onChangeNav('home')}
          title="Return to ResQ Home"
        >
          <img 
            src="/resq-logo.png" 
            alt="ResQ AI Disaster Intelligence" 
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              objectFit: 'cover',
              boxShadow: '0 2px 12px rgba(56, 189, 248, 0.35)',
              border: '1px solid rgba(56, 189, 248, 0.3)'
            }}
          />
          <div className="citizen-brand-text">
            <div className="citizen-brand-title">ResQ</div>
            <div className="citizen-brand-tagline">Know your risk. Know what to do.</div>
          </div>
        </div>

        {/* Simple 3-item Navigation */}
        <nav className="citizen-nav-tabs">
          <button
            className={`citizen-tab-btn ${currentNav === 'home' || currentNav === 'questions' ? 'active' : ''}`}
            onClick={() => onChangeNav('home')}
            aria-label="Home Screen"
          >
            <Home size={16} />
            <span>Home</span>
          </button>

          <button
            className={`citizen-tab-btn ${currentNav === 'risk' ? 'active' : ''}`}
            onClick={() => onChangeNav('risk')}
            aria-label="My Risk Assessment"
          >
            <AlertCircle size={16} />
            <span>My Risk</span>
          </button>

          <button
            className={`citizen-tab-btn ${currentNav === 'ask' ? 'active' : ''}`}
            onClick={() => onChangeNav('ask')}
            aria-label="Ask ResQ AI Assistant"
          >
            <MessageSquare size={16} />
            <span>Ask ResQ</span>
          </button>
        </nav>

        {/* Right Actions: Demo pill & SOS button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <div className="demo-badge-pill" title="This platform utilizes simulated scenario modeling for demonstration">
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#38bdf8' }}></span>
            <span>Prototype / Demo Data</span>
          </div>

          <button 
            className="sos-button"
            onClick={onOpenSos}
            title="Emergency Numbers (911 / 112)"
          >
            <PhoneCall size={14} />
            <span>SOS</span>
          </button>
        </div>
      </div>
    </header>
  );
}

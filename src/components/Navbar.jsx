import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  Activity, 
  Map, 
  Bell, 
  Cpu, 
  Radio, 
  BarChart3, 
  Bot, 
  UserCheck, 
  Users, 
  FileText, 
  Clock, 
  MapPin, 
  PlayCircle,
  AlertTriangle
} from 'lucide-react';

export default function Navbar({ 
  currentTab, 
  setCurrentTab, 
  userMode, 
  setUserMode, 
  onOpenBrief, 
  onOpenDemoTour,
  selectedDisaster
}) {
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const utc = now.toUTCString().slice(17, 25);
      const local = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      setTimeStr(`${local} LOC | ${utc} UTC`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { id: 'dashboard', label: 'Command Center', icon: Activity },
    { id: 'map', label: 'Live Risk Map', icon: Map },
    { id: 'engine', label: 'AI Risk Engine', icon: Cpu },
    { id: 'alerts', label: 'Live Alerts', icon: Bell, badge: '8' },
    { id: 'response', label: 'Emergency Response', icon: Radio },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'assistant', label: 'Ask ResQ', icon: Bot, highlight: true }
  ];

  return (
    <header style={{
      background: 'rgba(9, 14, 26, 0.95)',
      borderBottom: '1px solid #182642',
      backdropFilter: 'blur(16px)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      width: '100%'
    }}>
      {/* Top Telemetry & Safety Banner */}
      <div style={{
        background: 'rgba(6, 11, 20, 0.9)',
        borderBottom: '1px solid #141f36',
        padding: '3px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '0.68rem',
        color: '#64748b',
        fontFamily: 'var(--font-mono)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#22c55e', fontWeight: 600 }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#22c55e', display: 'inline-block', boxShadow: '0 0 6px #22c55e' }}></span>
            SYSTEM ONLINE
          </span>
          <span style={{ color: '#475569' }}>|</span>
          <span style={{ color: '#f59e0b', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <AlertTriangle size={11} /> PROTOTYPE / SIMULATED DISASTER DATA
          </span>
          <span style={{ color: '#475569' }}>|</span>
          <span style={{ color: '#94a3b8' }}>EOC NODE: ALPHA-09 (US-EAST)</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', color: '#38bdf8' }}>
            <MapPin size={11} /> Sector 7 Metro Regional Hub
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', color: '#cbd5e1' }}>
            <Clock size={11} /> {timeStr}
          </span>
        </div>
      </div>

      {/* Main Navbar Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 20px',
        gap: '16px'
      }}>
        {/* Brand Left */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', minWidth: '220px' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #1e40af 0%, #0369a1 100%)',
            border: '1px solid #38bdf8',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 12px rgba(6, 182, 212, 0.35)'
          }}>
            <ShieldAlert size={22} color="#ffffff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{
                fontSize: '1.25rem',
                fontWeight: 800,
                letterSpacing: '0.04em',
                color: '#ffffff',
                fontFamily: 'var(--font-sans)'
              }}>
                Res<span style={{ color: '#06b6d4' }}>Q</span>
              </span>
              <span className="badge badge-cyan" style={{ fontSize: '0.62rem', padding: '2px 5px' }}>v2.4 AI</span>
            </div>
            <p style={{
              fontSize: '0.68rem',
              color: '#94a3b8',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              fontWeight: 500
            }}>
              AI Disaster Intelligence
            </p>
          </div>
        </div>

        {/* Center Nav Items */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          background: 'rgba(13, 21, 39, 0.6)',
          padding: '4px',
          borderRadius: '8px',
          border: '1px solid #182642'
        }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '7px',
                  padding: '7px 12px',
                  borderRadius: '6px',
                  border: isActive ? '1px solid #2563eb' : '1px solid transparent',
                  background: isActive 
                    ? 'linear-gradient(180deg, #1e3a8a 0%, #172554 100%)' 
                    : item.highlight ? 'rgba(6, 182, 212, 0.08)' : 'transparent',
                  color: isActive ? '#ffffff' : item.highlight ? '#38bdf8' : '#94a3b8',
                  fontSize: '0.8rem',
                  fontWeight: isActive ? 600 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  position: 'relative'
                }}
              >
                <Icon size={15} color={isActive ? '#38bdf8' : item.highlight ? '#06b6d4' : '#64748b'} />
                <span>{item.label}</span>
                {item.badge && (
                  <span style={{
                    fontSize: '0.64rem',
                    background: '#ef4444',
                    color: '#ffffff',
                    padding: '1px 5px',
                    borderRadius: '10px',
                    fontWeight: 700
                  }}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Actions: Mode Switcher & Quick Triggers */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Citizen / Responder Mode Toggle */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            background: '#090e1a',
            border: '1px solid #1e3a8a',
            borderRadius: '6px',
            padding: '2px'
          }}>
            <button
              onClick={() => setUserMode('responder')}
              title="Tactical Emergency Operations Center View"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                padding: '5px 9px',
                borderRadius: '4px',
                border: 'none',
                background: userMode === 'responder' ? '#2563eb' : 'transparent',
                color: userMode === 'responder' ? '#ffffff' : '#94a3b8',
                fontSize: '0.72rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              <Users size={12} /> Responder Mode
            </button>
            <button
              onClick={() => setUserMode('citizen')}
              title="Simplified Public Evacuation & Safety View"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                padding: '5px 9px',
                borderRadius: '4px',
                border: 'none',
                background: userMode === 'citizen' ? '#0284c7' : 'transparent',
                color: userMode === 'citizen' ? '#ffffff' : '#94a3b8',
                fontSize: '0.72rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              <UserCheck size={12} /> Citizen Mode
            </button>
          </div>

          {/* Situation Report / Brief Button */}
          <button
            onClick={onOpenBrief}
            className="btn-tactical btn-outline-cyan"
            style={{ fontSize: '0.75rem', padding: '6px 11px' }}
            title="Generate Official Emergency Situation Report (SitRep)"
          >
            <FileText size={14} /> Brief
          </button>

          {/* Hackathon Demo Walkthrough Button */}
          <button
            onClick={onOpenDemoTour}
            className="btn-tactical btn-primary"
            style={{ fontSize: '0.75rem', padding: '6px 12px' }}
            title="Step-by-step hackathon presentation guide"
          >
            <PlayCircle size={14} /> Demo Flow
          </button>
        </div>
      </div>
    </header>
  );
}

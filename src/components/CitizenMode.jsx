import React, { useState } from 'react';
import { 
  ShieldAlert, 
  MapPin, 
  PhoneCall, 
  CheckSquare, 
  Square, 
  ArrowRight, 
  AlertCircle, 
  CheckCircle2, 
  XCircle, 
  Navigation, 
  ExternalLink,
  Info,
  HelpCircle
} from 'lucide-react';
import { CITIZEN_CHECKLIST_ITEMS, EMERGENCY_CONTACTS, SHELTERS } from '../data/resources';

export default function CitizenMode({ 
  disaster, 
  selectedZone, 
  onSwitchToResponder,
  onOpenAssistant 
}) {
  const [checklist, setChecklist] = useState(CITIZEN_CHECKLIST_ITEMS);
  const nearestShelter = SHELTERS[0];

  const toggleCheck = (id) => {
    setChecklist(prev => prev.map(item => 
      item.id === id ? { ...item, defaultChecked: !item.defaultChecked } : item
    ));
  };

  const checkedCount = checklist.filter(c => c.defaultChecked).length;
  const progressPercent = Math.round((checkedCount / checklist.length) * 100);

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Top Friendly Emergency Status Card: AM I AT RISK? */}
      <div 
        className="tactical-panel"
        style={{
          padding: '24px',
          background: 'linear-gradient(135deg, rgba(30, 58, 138, 0.4) 0%, rgba(15, 23, 42, 0.95) 100%)',
          borderLeft: '6px solid #ef4444',
          borderRadius: '10px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px', marginBottom: '16px' }}>
          <div>
            <span style={{ fontSize: '0.78rem', color: '#94a3b8', letterSpacing: '0.08em', fontWeight: 700 }}>
              PUBLIC SAFETY BRIEFING • SECTOR 7
            </span>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#ffffff', marginTop: '2px' }}>
              AM I AT RISK?
            </h2>
          </div>

          <div style={{
            background: 'rgba(239, 68, 68, 0.2)',
            border: '2px solid #ef4444',
            padding: '10px 20px',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <span style={{ fontSize: '0.68rem', color: '#fca5a5', fontWeight: 600, display: 'block' }}>YOUR CURRENT RISK IN ZONE A</span>
            <span style={{ fontSize: '1.4rem', fontWeight: 900, color: '#ffffff', letterSpacing: '0.05em' }}>
              CRITICAL FLOOD RISK
            </span>
          </div>
        </div>

        {/* Current Warning Notice */}
        <div style={{
          background: 'rgba(239, 68, 68, 0.12)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          padding: '14px 18px',
          borderRadius: '8px',
          marginBottom: '20px'
        }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f87171', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <ShieldAlert size={18} color="#ef4444" /> CURRENT EMERGENCY WARNING
          </h3>
          <p style={{ fontSize: '0.85rem', color: '#f1f5f9', lineHeight: 1.5 }}>
            Flash flooding and river overtopping are actively spreading through low-lying areas. If you live on ground floors or near waterways in Zone A, you are in immediate danger of high water.
          </p>
        </div>

        {/* 2 Big Action Columns: What Should I Do vs What Should I Avoid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          {/* What Should I Do? */}
          <div style={{ background: 'rgba(13, 21, 39, 0.7)', padding: '16px', borderRadius: '8px', borderLeft: '4px solid #22c55e' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#4ade80', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
              <CheckCircle2 size={16} /> WHAT SHOULD I DO RIGHT NOW?
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.82rem', color: '#cbd5e1' }}>
              <li><strong>1. Move to higher ground:</strong> Head to upper floors or designated elevated shelters.</li>
              <li><strong>2. Cut off power:</strong> Turn off main electrical breaker and gas valves if dry.</li>
              <li><strong>3. Grab emergency go-bag:</strong> Take water, IDs, vital medicines, and charged phone.</li>
              <li><strong>4. Alert your family:</strong> Send a quick text with your evacuation location.</li>
            </ul>
          </div>

          {/* What Should I Avoid? */}
          <div style={{ background: 'rgba(13, 21, 39, 0.7)', padding: '16px', borderRadius: '8px', borderLeft: '4px solid #ef4444' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#f87171', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
              <XCircle size={16} /> WHAT SHOULD I AVOID?
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.82rem', color: '#cbd5e1' }}>
              <li><strong>• NEVER drive through water:</strong> Just 12 inches of rushing water can sweep a car.</li>
              <li><strong>• Do not walk through floodwater:</strong> Hidden drains and fallen live wires cause fatalities.</li>
              <li><strong>• Do not wait for daylight:</strong> Evacuate now while secondary corridors remain open.</li>
              <li><strong>• Avoid basements:</strong> Underground rooms flood first with lethal speed.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Nearest Safe Shelter Card with Direct Navigation */}
      <div className="tactical-panel corner-bracket" style={{ padding: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <span style={{ fontSize: '0.72rem', color: '#4ade80', fontWeight: 700 }}>VERIFIED SAFE SHELTER</span>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff' }}>
              {nearestShelter.name}
            </h3>
            <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
              Distance: <strong style={{ color: '#38bdf8' }}>{nearestShelter.distance}</strong> ({nearestShelter.travelTime} drive via Elevated Viaduct Alpha)
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => onOpenAssistant(`Give me turn by turn evacuation steps to reach ${nearestShelter.name}`)}
              className="btn-tactical btn-primary"
              style={{ padding: '10px 18px', fontSize: '0.85rem' }}
            >
              <Navigation size={15} /> Open Evacuation Guidance
            </button>
          </div>
        </div>

        <div style={{ marginTop: '14px', paddingTop: '12px', borderTop: '1px solid #1a2948', display: 'flex', gap: '12px', flexWrap: 'wrap', fontSize: '0.75rem', color: '#cbd5e1' }}>
          <span>✓ Emergency Medical Team on site</span>
          <span>✓ Backup Diesel Generators Online</span>
          <span>✓ Pet Friendly Facilities</span>
          <span>✓ Free Hot Meals & Clean Drinking Water</span>
        </div>
      </div>

      {/* Interactive Emergency Kit Checklist */}
      <div className="tactical-panel" style={{ padding: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff' }}>
              72-Hour Survival Go-Bag Checklist
            </h3>
            <p style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
              Tick off items as you pack your evacuation bag:
            </p>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: checkedCount === checklist.length ? '#22c55e' : '#38bdf8' }}>
              {checkedCount} of {checklist.length} packed ({progressPercent}%)
            </span>
            <div style={{ width: '120px', height: '6px', background: '#141f36', borderRadius: '3px', marginTop: '4px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${progressPercent}%`, background: '#22c55e', transition: 'width 0.3s ease' }} />
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '10px' }}>
          {checklist.map(item => (
            <div
              key={item.id}
              onClick={() => toggleCheck(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 14px',
                borderRadius: '6px',
                background: item.defaultChecked ? 'rgba(34, 197, 94, 0.1)' : 'rgba(13, 21, 39, 0.6)',
                border: item.defaultChecked ? '1px solid #22c55e' : '1px solid #1a2845',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {item.defaultChecked ? (
                <CheckSquare size={18} color="#22c55e" />
              ) : (
                <Square size={18} color="#64748b" />
              )}
              <span style={{
                fontSize: '0.8rem',
                color: item.defaultChecked ? '#ffffff' : '#94a3b8',
                textDecoration: item.defaultChecked ? 'none' : 'none'
              }}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency Contacts Directory */}
      <div className="tactical-panel" style={{ padding: '20px' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#ffffff', marginBottom: '12px' }}>
          Direct Emergency Hotlines
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
          {EMERGENCY_CONTACTS.map((c, i) => (
            <div key={i} style={{
              background: 'rgba(9, 14, 26, 0.7)',
              padding: '12px',
              borderRadius: '6px',
              border: '1px solid #1a2948',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '8px'
            }}>
              <div>
                <span style={{ fontSize: '0.65rem', color: '#64748b', textTransform: 'uppercase' }}>{c.type}</span>
                <h5 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff' }}>{c.name}</h5>
                <strong style={{ fontSize: '1.05rem', color: '#38bdf8', fontFamily: 'var(--font-mono)' }}>{c.number}</strong>
              </div>
              <button
                onClick={() => alert(`Simulating emergency call to: ${c.number} (${c.name})`)}
                className="btn-tactical btn-outline-cyan"
                style={{ fontSize: '0.72rem', padding: '6px' }}
              >
                <PhoneCall size={12} /> {c.actionText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { 
  CheckCircle2, 
  AlertOctagon, 
  Eye, 
  Share2, 
  Copy, 
  Check, 
  CheckSquare, 
  Square,
  ShieldCheck
} from 'lucide-react';

export default function Screen4WhatToDo({ guidance, disasterName }) {
  const { doNow, avoid, monitor } = guidance;
  
  // Interactive checklist state so citizens can tick items off as they complete them
  const [completedSteps, setCompletedSteps] = useState({});
  const [copied, setCopied] = useState(false);

  const toggleStep = (idx) => {
    setCompletedSteps(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const handleCopyChecklist = () => {
    const text = `🚨 RESQ EMERGENCY ACTION PLAN (${disasterName.toUpperCase()}):\n\n` +
      `WHAT TO DO NOW:\n` +
      doNow.map((item, i) => `${i + 1}. ${item}`).join('\n') +
      `\n\nTHINGS TO AVOID:\n` +
      avoid.map(item => `• ${item}`).join('\n') +
      `\n\nTHINGS TO MONITOR:\n` +
      monitor.map(item => `• ${item}`).join('\n');

    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const totalSteps = doNow.length;
  const doneCount = Object.values(completedSteps).filter(Boolean).length;

  return (
    <section id="actions" style={{ marginBottom: '2.5rem', scrollMarginTop: '80px' }}>
      
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
            <span>🚨 What you should do now</span>
          </h2>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            Follow these life-saving steps in order. Tap a step to mark it completed.
          </p>
        </div>

        <button
          type="button"
          onClick={handleCopyChecklist}
          style={{
            background: 'var(--navy-850)',
            border: '1px solid var(--border-subtle)',
            color: copied ? '#10b981' : 'var(--text-main)',
            fontSize: '0.8rem',
            fontWeight: 600,
            padding: '0.45rem 0.85rem',
            borderRadius: '8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            transition: 'all 0.2s'
          }}
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          <span>{copied ? 'Copied to Clipboard' : 'Copy Emergency Plan'}</span>
        </button>
      </div>

      {/* Progress pill if user started checking */}
      {doneCount > 0 && (
        <div style={{
          marginBottom: '1rem',
          padding: '0.5rem 0.85rem',
          background: 'rgba(16, 185, 129, 0.1)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.82rem',
          color: '#10b981'
        }}>
          <ShieldCheck size={16} />
          <span>Progress: {doneCount} of {totalSteps} immediate safety steps completed.</span>
        </div>
      )}

      {/* 1. DO NOW (Numbered List) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.75rem' }}>
        {doNow.map((actionText, idx) => {
          const isDone = !!completedSteps[idx];

          return (
            <div
              key={idx}
              className="action-item-card"
              onClick={() => toggleStep(idx)}
              style={{
                cursor: 'pointer',
                borderColor: isDone ? 'rgba(16, 185, 129, 0.5)' : 'var(--border-subtle)',
                background: isDone ? 'rgba(16, 185, 129, 0.05)' : 'var(--navy-900)',
                transition: 'all 0.2s ease'
              }}
            >
              <div 
                className="action-number-circle"
                style={{
                  background: isDone ? 'var(--risk-low)' : 'rgba(59, 130, 246, 0.2)',
                  borderColor: isDone ? 'var(--risk-low)' : 'var(--blue-primary)',
                  color: isDone ? '#060a12' : '#ffffff'
                }}
              >
                {isDone ? <Check size={16} strokeWidth={3} /> : idx + 1}
              </div>

              <div style={{ flex: 1 }}>
                <p style={{
                  fontSize: '0.98rem',
                  fontWeight: isDone ? 500 : 600,
                  color: isDone ? 'var(--text-muted)' : '#ffffff',
                  textDecoration: isDone ? 'line-through' : 'none',
                  lineHeight: 1.45
                }}>
                  {actionText}
                </p>
              </div>

              <div style={{ color: isDone ? '#10b981' : 'var(--text-dim)', flexShrink: 0 }}>
                {isDone ? <CheckSquare size={18} /> : <Square size={18} />}
              </div>
            </div>
          );
        })}
      </div>

      {/* 2. Grid: AVOID and MONITOR */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
        
        {/* AVOID CARD */}
        <div 
          className="citizen-card"
          style={{
            background: 'var(--navy-850)',
            borderLeft: '4px solid var(--risk-severe)',
            padding: '1.35rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
            <AlertOctagon size={18} color="var(--risk-severe)" />
            <h3 style={{ 
              fontSize: '0.95rem', 
              fontWeight: 800, 
              letterSpacing: '0.04em', 
              color: '#ffffff',
              textTransform: 'uppercase'
            }}>
              Avoid
            </h3>
          </div>

          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {avoid.map((item, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.55rem', fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: 1.4 }}>
                <span style={{ color: 'var(--risk-severe)', fontWeight: 700 }}>✕</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* MONITOR CARD */}
        <div 
          className="citizen-card"
          style={{
            background: 'var(--navy-850)',
            borderLeft: '4px solid var(--blue-primary)',
            padding: '1.35rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
            <Eye size={18} color="var(--blue-primary)" />
            <h3 style={{ 
              fontSize: '0.95rem', 
              fontWeight: 800, 
              letterSpacing: '0.04em', 
              color: '#ffffff',
              textTransform: 'uppercase'
            }}>
              Monitor
            </h3>
          </div>

          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {monitor.map((item, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.55rem', fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: 1.4 }}>
                <span style={{ color: 'var(--blue-primary)', fontWeight: 700 }}>👁</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

    </section>
  );
}

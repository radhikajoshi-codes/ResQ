import React, { useState } from 'react';
import { 
  PlayCircle, 
  ArrowRight, 
  CheckCircle, 
  X, 
  Sparkles, 
  ShieldAlert, 
  MapPin, 
  Cpu, 
  Zap, 
  Bot, 
  Radio, 
  FileText 
} from 'lucide-react';

export default function DemoTourModal({ 
  onClose, 
  onNavigateStep 
}) {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    {
      step: 1,
      title: 'STEP 1: DETECT — Immediate Situation Awareness',
      tag: 'DETECT',
      icon: ShieldAlert,
      color: '#ef4444',
      description: 'The judge immediately sees the high-severity situation: CRITICAL FLOOD RISK (87/100) centered in Zone A.',
      actionLabel: 'Show Command Center & Situation',
      triggerAction: () => onNavigateStep('step1')
    },
    {
      step: 2,
      title: 'STEP 2: LOCATE — Zone A Geospatial Telemetry',
      tag: 'GEOSPATIAL',
      icon: MapPin,
      color: '#38bdf8',
      description: 'Click Zone A on the Live Risk Map to highlight the alluvial lowlands, water depth (4.8m), and 14,200 vulnerable citizens.',
      actionLabel: 'Focus Zone A on Live Map',
      triggerAction: () => onNavigateStep('step2')
    },
    {
      step: 3,
      title: 'STEP 3: PREDICT — Neural Risk Analysis Engine',
      tag: 'PREDICT',
      icon: Cpu,
      color: '#06b6d4',
      description: 'Run the AI Risk Engine to compute localized threat scores (87/100), AI reasoning points, and the DO NOW / AVOID action matrix.',
      actionLabel: 'Open AI Risk Analysis Engine',
      triggerAction: () => onNavigateStep('step3')
    },
    {
      step: 4,
      title: 'STEP 4: SIMULATE — What-If Predictive Scenario',
      tag: 'WHAT-IF',
      icon: Zap,
      color: '#f59e0b',
      description: 'Simulate extreme precipitation surge: Rainfall increases 100mm → 180mm. Watch risk index jump from 62 → 89 with predictive consequence explanation.',
      actionLabel: 'Launch What-If Simulator (100mm → 180mm)',
      triggerAction: () => onNavigateStep('step4')
    },
    {
      step: 5,
      title: 'STEP 5: COPILOT — Ask ResQ AI Guidance',
      tag: 'ASSIST',
      icon: Bot,
      color: '#3b82f6',
      description: 'Ask AI Copilot: "What should I do during a flood?" Receive structured action protocols, dangerous areas to avoid, and safe shelter directions.',
      actionLabel: 'Query AI Copilot: Flood Protocol',
      triggerAction: () => onNavigateStep('step5')
    },
    {
      step: 6,
      title: 'STEP 6: PRIORITIZE — Emergency Resource Center',
      tag: 'PRIORITIZE',
      icon: Radio,
      color: '#22c55e',
      description: 'Review operational resource matrix: 4 safe shelters with 4,430 bed buffer, 3 trauma hospitals, and prioritized swiftwater rescue deployments.',
      actionLabel: 'Open Resource Allocation & Evacuation',
      triggerAction: () => onNavigateStep('step6')
    },
    {
      step: 7,
      title: 'STEP 7: RESPOND — Generate Emergency Brief',
      tag: 'RESPOND',
      icon: FileText,
      color: '#a855f7',
      description: 'Generate the official ICS-201 Incident Situation Report (SitRep) ready for emergency commanders with 1-click clipboard copy.',
      actionLabel: 'Generate Official Incident SitRep',
      triggerAction: () => onNavigateStep('step7')
    }
  ];

  const active = steps.find(s => s.step === currentStep) || steps[0];
  const Icon = active.icon;

  const handleExecute = (s) => {
    s.triggerAction();
    if (s.step < steps.length) {
      setCurrentStep(s.step + 1);
    } else {
      onClose();
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(5, 8, 16, 0.85)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 110,
      padding: '20px'
    }}>
      <div 
        className="tactical-panel corner-bracket"
        style={{
          width: '100%',
          maxWidth: '740px',
          background: '#0a101f',
          border: '1px solid #38bdf8',
          boxShadow: '0 0 40px rgba(6, 182, 212, 0.3)',
          borderRadius: '10px',
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <div className="panel-header" style={{ justifyContent: 'space-between', padding: '14px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <PlayCircle size={18} color="#06b6d4" />
            <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#ffffff' }}>
              Hackathon Judge Demo Script (Step {currentStep} of {steps.length})
            </span>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#94a3b8',
              cursor: 'pointer',
              fontSize: '1.25rem',
              lineHeight: 1
            }}
          >
            ×
          </button>
        </div>

        {/* Stepper Progress Bar */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${steps.length}, 1fr)`,
          gap: '4px',
          padding: '8px 20px',
          background: 'rgba(9, 14, 26, 0.95)',
          borderBottom: '1px solid #16243d'
        }}>
          {steps.map(s => (
            <button
              key={s.step}
              onClick={() => setCurrentStep(s.step)}
              style={{
                height: '4px',
                borderRadius: '2px',
                background: s.step === currentStep ? '#38bdf8' : s.step < currentStep ? '#22c55e' : '#1e293b',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              title={`Step ${s.step}: ${s.title}`}
            />
          ))}
        </div>

        {/* Step Content Card */}
        <div style={{ padding: '24px 28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '8px',
              background: `${active.color}20`,
              border: `1px solid ${active.color}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Icon size={22} color={active.color} />
            </div>

            <div>
              <span className="badge" style={{ background: `${active.color}20`, color: active.color, border: `1px solid ${active.color}40`, marginBottom: '4px' }}>
                {active.tag} PHASE
              </span>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff' }}>
                {active.title}
              </h3>
            </div>
          </div>

          <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.6, margin: '16px 0 24px 0' }}>
            {active.description}
          </p>

          {/* Value Chain Callout */}
          <div style={{
            background: 'rgba(13, 21, 39, 0.7)',
            padding: '10px 14px',
            borderRadius: '6px',
            border: '1px solid #1c2e4f',
            fontSize: '0.75rem',
            color: '#94a3b8',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <span>VALUE PROPOSITION:</span>
            <strong style={{ color: '#38bdf8' }}>DETECT → PREDICT → PRIORITIZE → RESPOND</strong>
          </div>

          {/* Action Button */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button
              onClick={() => {
                if (currentStep > 1) setCurrentStep(currentStep - 1);
              }}
              disabled={currentStep === 1}
              className="btn-tactical btn-secondary"
              style={{ padding: '8px 16px', opacity: currentStep === 1 ? 0.4 : 1 }}
            >
              Previous Step
            </button>

            <button
              onClick={() => handleExecute(active)}
              className="btn-tactical btn-primary"
              style={{ padding: '10px 22px', fontSize: '0.88rem' }}
            >
              <Sparkles size={16} /> {active.actionLabel} & Next <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

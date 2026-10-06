import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Sparkles, 
  MapPin, 
  Check, 
  HelpCircle,
  AlertCircle
} from 'lucide-react';
import { DISASTERS, DISASTER_QUESTIONS } from '../../services/riskEngine';

export default function Screen2Questions({
  location,
  selectedDisaster,
  answers,
  onUpdateAnswer,
  onBack,
  onAnalyze
}) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const disasterInfo = DISASTERS.find(d => d.id === selectedDisaster) || DISASTERS[0];
  const questions = DISASTER_QUESTIONS[selectedDisaster] || DISASTER_QUESTIONS.flood;

  const handleAnalyzeClick = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      onAnalyze();
    }, 600);
  };

  return (
    <div style={{ padding: '2rem 0 3.5rem 0' }}>
      <div className="citizen-container">
        
        {/* Navigation Breadcrumb & Back */}
        <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button
            type="button"
            onClick={onBack}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              fontSize: '0.88rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.4rem 0'
            }}
          >
            <ArrowLeft size={16} />
            <span>Change Location or Hazard</span>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', color: '#38bdf8' }}>
            <MapPin size={14} />
            <span style={{ fontWeight: 600 }}>{location || 'Location Selected'}</span>
          </div>
        </div>

        {/* Section Header */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: disasterInfo.color, marginBottom: '0.4rem' }}>
            <span style={{ 
              fontSize: '0.78rem', 
              fontWeight: 700, 
              letterSpacing: '0.05em', 
              textTransform: 'uppercase',
              background: 'rgba(255, 255, 255, 0.06)',
              padding: '0.2rem 0.6rem',
              borderRadius: '6px'
            }}>
              {disasterInfo.name} Assessment
            </span>
          </div>

          <h2 style={{ 
            fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', 
            fontWeight: 800, 
            letterSpacing: '-0.02em', 
            color: '#ffffff',
            lineHeight: 1.2,
            marginBottom: '0.5rem'
          }}>
            Tell us what you are seeing right now
          </h2>

          <p style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>
            Answer these simple questions. ResQ evaluates your specific physical exposure, shelter adequacy, and hazard severity.
          </p>
        </div>

        {/* Dynamic Questions List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
          {questions.map((q, idx) => {
            const currentVal = answers[q.id] || q.default;

            return (
              <div 
                key={q.id} 
                className="citizen-card"
                style={{ padding: '1.4rem' }}
              >
                {/* Question Header */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '1rem' }}>
                  <div style={{ 
                    width: '26px', 
                    height: '26px', 
                    borderRadius: '50%', 
                    background: 'rgba(59, 130, 246, 0.15)', 
                    color: '#38bdf8', 
                    fontSize: '0.8rem', 
                    fontWeight: 700, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: '2px'
                  }}>
                    {idx + 1}
                  </div>

                  <div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.2rem' }}>
                      {q.label}
                    </h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                      {q.description}
                    </p>
                  </div>
                </div>

                {/* Question Options */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.65rem' }}>
                  {q.options.map((opt) => {
                    const isSelected = currentVal === opt.value;

                    return (
                      <div
                        key={opt.value}
                        className={`question-option-item ${isSelected ? 'selected' : ''}`}
                        onClick={() => onUpdateAnswer(q.id, opt.value)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => { if (e.key === 'Enter') onUpdateAnswer(q.id, opt.value); }}
                      >
                        <div className="radio-indicator">
                          {isSelected && <div className="radio-inner-dot" />}
                        </div>

                        <div style={{ flex: 1 }}>
                          <div style={{ 
                            fontSize: '0.92rem', 
                            fontWeight: isSelected ? 700 : 600, 
                            color: isSelected ? '#ffffff' : 'var(--text-main)',
                            marginBottom: '0.15rem'
                          }}>
                            {opt.label}
                          </div>
                          {opt.desc && (
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', lineHeight: 1.3 }}>
                              {opt.desc}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Analyze Button */}
        <div style={{ position: 'sticky', bottom: '1.5rem', zIndex: 30 }}>
          <div style={{
            background: 'rgba(9, 14, 26, 0.92)',
            backdropFilter: 'blur(12px)',
            padding: '1rem',
            borderRadius: '16px',
            border: '1px solid var(--border-subtle)',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5)'
          }}>
            <button
              type="button"
              className="btn-primary-resq"
              onClick={handleAnalyzeClick}
              disabled={isAnalyzing}
              style={{ fontSize: '1.1rem', padding: '1rem' }}
            >
              {isAnalyzing ? (
                <>
                  <Sparkles size={20} className="pulse-beacon" />
                  <span>CALCULATING YOUR RISK PROFILE...</span>
                </>
              ) : (
                <>
                  <Sparkles size={20} />
                  <span>ANALYZE MY RISK</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

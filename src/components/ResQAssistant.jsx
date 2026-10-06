import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Shield, 
  Clock, 
  User, 
  HelpCircle,
  Minimize2,
  Maximize2,
  Trash2
} from 'lucide-react';
import { SUGGESTED_QUESTIONS, generateAiResponse } from '../data/aiKnowledgeBase';

export default function ResQAssistant({ 
  currentDisaster, 
  selectedZoneId,
  initialQuery = '',
  isDocked = false,
  onClose
}) {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'bot',
      timestamp: 'Just now',
      structured: {
        title: '🤖 ResQ AI EMERGENCY COPILOT INITIALIZED',
        riskLevel: `${currentDisaster.riskLevel} (${currentDisaster.overallRisk}/100)`,
        badgeColor: currentDisaster.severityColor,
        summary: `I am connected to live telemetry for ${currentDisaster.shortName} in ${selectedZoneId}. Ask me what actions to take, where to evacuate, or how to triage emergency response.`,
        immediateActions: [
          'Ask specific questions or tap any prompt chip below.',
          'Responses are synchronized with active sensor models.'
        ],
        avoid: ['Do not rely on unverified rumors or social media alerts.'],
        nearestSafeOption: 'North Ridge Civic Auditorium (Shelter Alpha) — 3.4 km.',
        responsePriority: 'Life safety evacuations in low-lying quadrants.'
      }
    }
  ]);
  const [inputVal, setInputVal] = useState(initialQuery || '');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (initialQuery) {
      handleSend(initialQuery);
    }
  }, [initialQuery]);

  const handleSend = (textToSend) => {
    const q = textToSend || inputVal;
    if (!q.trim()) return;

    const userMsg = {
      id: 'usr-' + Date.now(),
      sender: 'user',
      text: q,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);

    // Simulate intelligent LLM processing delay
    setTimeout(() => {
      const response = generateAiResponse(q, {
        disaster: currentDisaster,
        zone: selectedZoneId
      });

      const botMsg = {
        id: 'bot-' + Date.now(),
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        structured: response
      };

      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 700);
  };

  const handleClear = () => {
    setMessages([]);
  };

  return (
    <div className="tactical-panel corner-bracket" style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      minHeight: '580px',
      maxHeight: isDocked ? '620px' : 'none',
      background: 'rgba(9, 14, 26, 0.95)'
    }}>
      {/* Header */}
      <div className="panel-header" style={{ justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '26px',
            height: '26px',
            borderRadius: '6px',
            background: 'linear-gradient(135deg, #0284c7 0%, #1e40af 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 10px rgba(6, 182, 212, 0.4)'
          }}>
            <Bot size={16} color="#ffffff" />
          </div>
          <div>
            <span style={{ fontSize: '0.88rem', fontWeight: 800, color: '#ffffff' }}>
              Ask ResQ — AI Emergency Copilot
            </span>
            <span style={{ fontSize: '0.65rem', color: '#64748b', display: 'block' }}>
              CONTEXT: {currentDisaster.shortName.toUpperCase()} / {selectedZoneId}
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <button
            onClick={handleClear}
            title="Clear Chat Log"
            style={{
              background: 'transparent',
              border: 'none',
              color: '#64748b',
              cursor: 'pointer',
              padding: '4px'
            }}
          >
            <Trash2 size={14} />
          </button>
          {onClose && (
            <button
              onClick={onClose}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#94a3b8',
                cursor: 'pointer',
                fontSize: '1.2rem',
                lineHeight: 1
              }}
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Suggested Questions Quick Chips */}
      <div style={{
        padding: '10px 14px',
        borderBottom: '1px solid #142038',
        background: 'rgba(13, 21, 39, 0.5)',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        overflowX: 'auto'
      }}>
        <span style={{ fontSize: '0.65rem', color: '#64748b', fontWeight: 700, whiteSpace: 'nowrap' }}>
          PROMPTS:
        </span>
        {SUGGESTED_QUESTIONS.map((question, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(question)}
            style={{
              padding: '4px 10px',
              borderRadius: '12px',
              border: '1px solid #1e3a8a',
              background: 'rgba(30, 58, 138, 0.2)',
              color: '#93c5fd',
              fontSize: '0.68rem',
              whiteSpace: 'nowrap',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(30, 58, 138, 0.4)';
              e.currentTarget.style.borderColor = '#38bdf8';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(30, 58, 138, 0.2)';
              e.currentTarget.style.borderColor = '#1e3a8a';
            }}
          >
            {question}
          </button>
        ))}
      </div>

      {/* Message Stream */}
      <div style={{
        flex: 1,
        padding: '16px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px'
      }}>
        {messages.map((msg) => {
          if (msg.sender === 'user') {
            return (
              <div key={msg.id} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <div style={{
                  background: 'linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)',
                  color: '#ffffff',
                  padding: '10px 14px',
                  borderRadius: '10px 10px 2px 10px',
                  maxWidth: '75%',
                  fontSize: '0.82rem',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                  border: '1px solid #3b82f6'
                }}>
                  <p>{msg.text}</p>
                  <span style={{ fontSize: '0.62rem', color: '#bfdbfe', display: 'block', textAlign: 'right', marginTop: '4px' }}>
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            );
          }

          // Structured AI Response
          const s = msg.structured;
          return (
            <div key={msg.id} style={{ display: 'flex', gap: '10px', maxWidth: '95%' }}>
              <div style={{
                width: '30px',
                height: '30px',
                borderRadius: '6px',
                background: 'rgba(6, 182, 212, 0.15)',
                border: '1px solid #06b6d4',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Bot size={16} color="#06b6d4" />
              </div>

              <div style={{
                flex: 1,
                background: 'rgba(13, 21, 39, 0.8)',
                border: '1px solid #1a2c4e',
                borderRadius: '2px 10px 10px 10px',
                padding: '14px 16px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.4)'
              }}>
                {/* Structured Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px', flexWrap: 'wrap', gap: '6px' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#ffffff' }}>
                    {s.title}
                  </span>
                  <span className="badge badge-critical" style={{ fontSize: '0.65rem' }}>
                    {s.riskLevel}
                  </span>
                </div>

                <p style={{ fontSize: '0.78rem', color: '#cbd5e1', marginBottom: '12px', lineHeight: 1.4 }}>
                  {s.summary}
                </p>

                {/* Immediate Actions */}
                {s.immediateActions && s.immediateActions.length > 0 && (
                  <div style={{
                    background: 'rgba(15, 23, 42, 0.8)',
                    borderRadius: '6px',
                    padding: '10px 12px',
                    borderLeft: '3px solid #22c55e',
                    marginBottom: '10px'
                  }}>
                    <strong style={{ fontSize: '0.74rem', color: '#4ade80', display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '6px' }}>
                      <CheckCircle2 size={13} /> IMMEDIATE ACTION PROTOCOLS:
                    </strong>
                    <ol style={{ paddingLeft: '16px', fontSize: '0.75rem', color: '#e2e8f0', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      {s.immediateActions.map((action, i) => (
                        <li key={i}>{action}</li>
                      ))}
                    </ol>
                  </div>
                )}

                {/* Dangerous Areas & Actions to Avoid */}
                {s.avoid && s.avoid.length > 0 && (
                  <div style={{
                    background: 'rgba(239, 68, 68, 0.08)',
                    borderRadius: '6px',
                    padding: '8px 12px',
                    borderLeft: '3px solid #ef4444',
                    marginBottom: '10px'
                  }}>
                    <strong style={{ fontSize: '0.74rem', color: '#f87171', display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '4px' }}>
                      <XCircle size={13} /> AVOID / DANGER ZONES:
                    </strong>
                    <ul style={{ paddingLeft: '16px', fontSize: '0.74rem', color: '#fca5a5', display: 'flex', flexDirection: 'column', gap: '3px' }}>
                      {s.avoid.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Safe Shelter & Response Priority Footnotes */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '8px',
                  paddingTop: '8px',
                  borderTop: '1px solid #16243d',
                  fontSize: '0.7rem'
                }}>
                  {s.nearestSafeOption && (
                    <div style={{ color: '#94a3b8' }}>
                      <span style={{ color: '#38bdf8', fontWeight: 600 }}>Nearest Safe Option:</span> {s.nearestSafeOption}
                    </div>
                  )}
                  {s.responsePriority && (
                    <div style={{ color: '#94a3b8' }}>
                      <span style={{ color: '#f59e0b', fontWeight: 600 }}>Priority Dispatch:</span> {s.responsePriority}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#06b6d4', fontSize: '0.75rem' }}>
            <Sparkles size={14} className="pulse-cyan" />
            <span>ResQ AI analyzing sensory telemetry and synthesizing guidance...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <div style={{
        padding: '12px 16px',
        borderTop: '1px solid #142038',
        background: 'rgba(9, 14, 26, 0.95)',
        display: 'flex',
        gap: '10px'
      }}>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSend();
          }}
          placeholder="What should I do during a flood? (Or ask about safe shelters, high risk areas...)"
          style={{
            flex: 1,
            background: 'rgba(13, 21, 39, 0.8)',
            border: '1px solid #1e3a8a',
            borderRadius: '6px',
            padding: '10px 14px',
            color: '#ffffff',
            fontSize: '0.82rem',
            outline: 'none',
            fontFamily: 'var(--font-sans)'
          }}
        />
        <button
          onClick={() => handleSend()}
          className="btn-tactical btn-primary"
          style={{ padding: '0 18px' }}
        >
          <Send size={15} /> Send
        </button>
      </div>
    </div>
  );
}

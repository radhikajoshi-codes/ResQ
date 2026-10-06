import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  AlertCircle, 
  HelpCircle,
  ShieldCheck,
  CornerDownLeft
} from 'lucide-react';
import { DEFAULT_SUGGESTIONS, generateSafetyAdvice } from '../../services/aiSafetyAssistant';

export default function Screen6AskResQ({
  disasterId,
  disasterName,
  location,
  riskScore,
  riskLevel,
  nearbyResources
}) {
  const context = {
    disasterId,
    disasterName,
    location,
    score: riskScore,
    riskLevel,
    nearbyResources
  };

  // Initial welcome message from ResQ
  const [messages, setMessages] = useState([
    {
      id: 'msg-init',
      sender: 'ai',
      text: null,
      advice: {
        headline: `Hello. I am ResQ, your disaster safety assistant.`,
        body: `I have reviewed your reported conditions for **${disasterName}** in **${location}** (Current Risk: **${riskScore}/100 - ${riskLevel}**). Tap any question below or type your specific question to get immediate safety guidance.`,
        keyPoints: [
          `Ask about whether you should evacuate or shelter in place.`,
          `Ask for emergency go-bag packing priorities.`,
          `Ask about nearby safe shelters, road routes, or utility safety.`
        ],
        caution: 'Always dial 911 or 112 immediately if someone requires urgent medical rescue.'
      },
      time: 'Just now'
    }
  ]);

  const [inputVal, setInputVal] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const chatBottomRef = useRef(null);

  // Auto-scroll when new messages arrive
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  const handleSendQuery = (queryText) => {
    const q = queryText || inputVal;
    if (!q || !q.trim()) return;

    // Add user message
    const userMsg = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: q.trim(),
      time: 'Just now'
    };

    setMessages(prev => [...prev, userMsg]);
    setInputVal('');
    setIsThinking(true);

    // Generate context-aware AI safety advice
    setTimeout(() => {
      const advice = generateSafetyAdvice(q, context);
      const aiMsg = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        advice,
        time: 'Just now'
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsThinking(false);
    }, 450);
  };

  return (
    <section id="ask-resq" style={{ marginBottom: '3rem', scrollMarginTop: '80px' }}>
      
      {/* Section Header */}
      <div style={{ marginBottom: '1.25rem' }}>
        <h2 style={{ 
          fontSize: '1.4rem', 
          fontWeight: 800, 
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginBottom: '0.35rem'
        }}>
          <span>Still have questions?</span>
        </h2>
        <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)' }}>
          Ask ResQ about your situation. All advice is tailored to your reported hazard and location.
        </p>

        {/* Current Active Context Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginTop: '0.65rem',
          padding: '0.3rem 0.75rem',
          background: 'rgba(59, 130, 246, 0.1)',
          border: '1px solid rgba(59, 130, 246, 0.25)',
          borderRadius: '9999px',
          fontSize: '0.78rem',
          color: '#38bdf8'
        }}>
          <span>📍 {location}</span>
          <span>•</span>
          <span>{disasterName} ({riskScore}/100 {riskLevel})</span>
        </div>
      </div>

      {/* Suggested Questions Chips */}
      <div style={{ marginBottom: '1.25rem' }}>
        <div style={{ fontSize: '0.76rem', fontWeight: 600, color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
          Suggested citizen questions:
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {DEFAULT_SUGGESTIONS.map((chip, idx) => (
            <button
              key={idx}
              type="button"
              className="suggested-chip"
              onClick={() => handleSendQuery(chip)}
            >
              <HelpCircle size={14} color="#38bdf8" />
              <span>{chip}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Conversation Container */}
      <div 
        className="citizen-card"
        style={{
          background: 'var(--navy-850)',
          border: '1.5px solid var(--border-card)',
          padding: '1.25rem',
          display: 'flex',
          flexDirection: 'column',
          height: '460px'
        }}
      >
        {/* Messages Stream */}
        <div style={{ 
          flex: 1, 
          overflowY: 'auto', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '1rem',
          paddingRight: '0.5rem'
        }}>
          {messages.map((m) => {
            if (m.sender === 'user') {
              return (
                <div key={m.id} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <div className="chat-bubble-user">
                    {m.text}
                  </div>
                </div>
              );
            }

            // AI advice message
            const { headline, body, keyPoints, caution } = m.advice;
            return (
              <div key={m.id} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #2563eb, #0284c7)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: '2px',
                  boxShadow: '0 2px 8px rgba(37, 99, 235, 0.4)'
                }}>
                  <Bot size={18} color="#ffffff" />
                </div>

                <div className="chat-bubble-ai">
                  {headline && (
                    <div style={{ 
                      fontSize: '1rem', 
                      fontWeight: 800, 
                      color: '#ffffff', 
                      marginBottom: '0.45rem',
                      lineHeight: 1.3
                    }}>
                      {headline}
                    </div>
                  )}

                  {body && (
                    <p style={{ 
                      fontSize: '0.92rem', 
                      color: 'var(--text-main)', 
                      marginBottom: keyPoints?.length ? '0.65rem' : '0',
                      lineHeight: 1.5
                    }}>
                      {body}
                    </p>
                  )}

                  {keyPoints && keyPoints.length > 0 && (
                    <ul style={{ 
                      listStyle: 'none', 
                      display: 'flex', 
                      flexDirection: 'column', 
                      gap: '0.45rem',
                      marginBottom: caution ? '0.65rem' : '0'
                    }}>
                      {keyPoints.map((pt, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.88rem', color: 'var(--text-main)', lineHeight: 1.4 }}>
                          <span style={{ color: '#38bdf8', fontWeight: 700 }}>•</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {caution && (
                    <div style={{
                      marginTop: '0.6rem',
                      padding: '0.55rem 0.75rem',
                      background: 'rgba(239, 68, 68, 0.1)',
                      borderLeft: '3px solid #ef4444',
                      borderRadius: '6px',
                      fontSize: '0.8rem',
                      color: '#fca5a5'
                    }}>
                      <strong>Caution:</strong> {caution}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Thinking Indicator */}
          {isThinking && (
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '10px',
                background: 'var(--navy-800)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Sparkles size={16} color="#38bdf8" className="pulse-beacon" />
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                ResQ is consulting safety protocols for {location}...
              </div>
            </div>
          )}

          <div ref={chatBottomRef} />
        </div>

        {/* Input Bar */}
        <div style={{ 
          marginTop: '1rem', 
          display: 'flex', 
          gap: '0.65rem',
          paddingTop: '0.75rem',
          borderTop: '1px solid var(--border-subtle)'
        }}>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleSendQuery();
              }
            }}
            placeholder="Type your question (e.g. Can I take my pet? What if power goes out?)..."
            style={{
              flex: 1,
              padding: '0.8rem 1rem',
              background: 'var(--navy-900)',
              border: '1px solid var(--border-card)',
              borderRadius: '10px',
              color: '#ffffff',
              fontSize: '0.92rem',
              outline: 'none'
            }}
            onFocus={(e) => e.target.style.borderColor = 'var(--blue-primary)'}
            onBlur={(e) => e.target.style.borderColor = 'var(--border-card)'}
          />

          <button
            type="button"
            onClick={() => handleSendQuery()}
            disabled={!inputVal.trim() || isThinking}
            style={{
              background: inputVal.trim() ? 'var(--blue-primary)' : 'var(--navy-800)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '10px',
              padding: '0 1.25rem',
              cursor: inputVal.trim() ? 'pointer' : 'default',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s',
              opacity: inputVal.trim() ? 1 : 0.6
            }}
          >
            <Send size={16} />
          </button>
        </div>

      </div>

    </section>
  );
}

import React, { useState } from 'react';
import { 
  FileText, 
  Copy, 
  Check, 
  X, 
  Printer, 
  ShieldAlert, 
  AlertTriangle,
  Download,
  Share2
} from 'lucide-react';
import { ZONES } from '../data/zones';
import { SHELTERS, HOSPITALS, RESCUE_TEAMS } from '../data/resources';

export default function EmergencyBriefModal({ 
  disaster, 
  selectedZone, 
  onClose 
}) {
  const [copied, setCopied] = useState(false);
  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10);
  const timeStr = now.toTimeString().slice(0, 8) + ' UTC';

  const briefText = `================================================================================
RESQ INCIDENT COMMAND SYSTEM (ICS-201) — OFFICIAL SITUATION REPORT (SITREP)
================================================================================
INCIDENT NAME:      ${disaster.name.toUpperCase()}
OPERATIONAL PERIOD: ${dateStr} ${timeStr}
OVERALL RISK INDEX: ${disaster.overallRisk} / 100 (${disaster.riskLevel})
REPORT CLASSIFICATION: PROTOTYPE DEMO DISASTER INTELLIGENCE SYNTHESIS

1. SITUATION OVERVIEW
--------------------------------------------------------------------------------
Summary:        ${disaster.summaryTitle}
Details:        ${disaster.summaryDescription}
Primary Sector: ${disaster.primaryZone} (${disaster.locationSummary})
Status:         ${disaster.status}

2. GEOSPATIAL THREAT & EXPOSURE MATRIX
--------------------------------------------------------------------------------
Critical Zones: ${disaster.criticalZonesCount} Active Sectors
Exposed Pop:    ${disaster.affectedPopulation.toLocaleString()} residents
Evacuation Req: ${disaster.evacuationCount.toLocaleString()} residents (Inundation risk)
Priority Zone:  Zone A (Delta Basin Inundation — Elevation 2-6m)
Active Alerts:  ${disaster.activeAlertsCount} automated sensor triggers

3. CRITICAL RESOURCES & OPERATIONAL CAPACITIES
--------------------------------------------------------------------------------
Safe Shelters:  4 Active Havens (North Ridge Auditorium, High School Complex, etc.)
Total Capacity: 9,200 beds | Available: 4,430 beds (48% buffer)
Medical Centers:St. Mary Trauma (Level 1) & Metro General (Level 2) - Generators 100%
Rescue Units:   12 Teams Active (Amphibious Swiftwater Bravo-3, USAR Alpha-1 deployed)

4. DIRECTIVES & RECOMMENDED ACTIONS
--------------------------------------------------------------------------------
DO NOW:
${disaster.actions.doNow.map((a, i) => `  [${i+1}] ${a}`).join('\n')}

AVOID:
${disaster.actions.avoid.map(a => `  [-] ${a}`).join('\n')}

5. INCIDENT COMMAND RESPONSE PRIORITIES
--------------------------------------------------------------------------------
${disaster.actions.responsePriority.map((p, i) => `  PRIORITY ${i+1}: ${p}`).join('\n')}

DISCLAIMER:
ResQ is an AI-powered prototype using simulated disaster data for demonstration 
purposes. It does not provide official emergency warnings or replace local authorities.
================================================================================`;

  const handleCopy = () => {
    navigator.clipboard.writeText(briefText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
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
      zIndex: 100,
      padding: '20px'
    }}>
      <div 
        className="tactical-panel corner-bracket"
        style={{
          width: '100%',
          maxWidth: '820px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          background: '#090e1a',
          border: '1px solid #38bdf8',
          boxShadow: '0 0 35px rgba(6, 182, 212, 0.25)'
        }}
      >
        {/* Modal Header */}
        <div className="panel-header" style={{ justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileText size={16} color="#38bdf8" />
            <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#ffffff' }}>
              Official Incident Situation Report (ICS-201 SitRep)
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={handleCopy}
              className="btn-tactical btn-outline-cyan"
              style={{ padding: '5px 12px', fontSize: '0.74rem' }}
            >
              {copied ? <Check size={14} color="#22c55e" /> : <Copy size={14} />}
              {copied ? 'Copied to Clipboard' : 'Copy SitRep'}
            </button>
            <button
              onClick={handlePrint}
              className="btn-tactical btn-secondary"
              style={{ padding: '5px 10px', fontSize: '0.74rem' }}
            >
              <Printer size={14} /> Print
            </button>
            <button
              onClick={onClose}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#94a3b8',
                cursor: 'pointer',
                fontSize: '1.25rem',
                lineHeight: 1,
                marginLeft: '8px'
              }}
            >
              ×
            </button>
          </div>
        </div>

        {/* SitRep Formatted Body */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '20px',
          background: '#060a12',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.76rem',
          lineHeight: 1.5,
          color: '#cbd5e1',
          whiteSpace: 'pre-wrap',
          borderBottom: '1px solid #142038'
        }}>
          {briefText}
        </div>

        {/* Modal Footer */}
        <div style={{
          padding: '12px 20px',
          background: 'rgba(9, 14, 26, 0.95)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.7rem',
          color: '#64748b'
        }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <ShieldAlert size={14} color="#f59e0b" /> Standard ICS-201 Operational Format for Multi-Agency Command
          </span>
          <button
            onClick={onClose}
            className="btn-tactical btn-primary"
            style={{ padding: '6px 16px', fontSize: '0.75rem' }}
          >
            Dismiss SitRep
          </button>
        </div>
      </div>
    </div>
  );
}

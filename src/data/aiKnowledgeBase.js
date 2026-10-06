// ResQ AI Copilot Intelligent Response Engine

export const SUGGESTED_QUESTIONS = [
  "What should I do during a flood?",
  "Which areas are high risk?",
  "Where should I evacuate?",
  "What should I keep in an emergency kit?",
  "Which zone needs help first?",
  "What happens if rainfall increases?"
];

export function generateAiResponse(query, context = {}) {
  const q = query.toLowerCase();
  const disaster = context.disaster || {
    id: 'flood',
    shortName: 'Flood',
    overallRisk: 87,
    riskLevel: 'CRITICAL',
    primaryZone: 'Zone A'
  };
  const activeZone = context.zone || 'Zone A';

  // 1. Flood Guidance
  if (q.includes('flood') || (q.includes('do') && disaster.id === 'flood')) {
    return {
      title: '🚨 HIGH FLOOD RISK PROTOCOL',
      riskLevel: 'CRITICAL (87/100)',
      badgeColor: '#ef4444',
      summary: `Extreme flood inundation detected in ${activeZone}. Water cresting at +0.45m/hr along Delta confluence.`,
      immediateActions: [
        'Move immediately to higher ground or upper floor of a reinforced concrete building.',
        'Avoid walking or driving through moving water — 6 inches of rapid water can sweep an adult.',
        'Shut off main electrical breakers and gas isolation valves before water contacts outlets.',
        'Keep phone charged in low-power mode with emergency geolocation beacon active.'
      ],
      avoid: [
        `${activeZone} low-lying floodway and underground subway/basement facilities.`,
        'Bridges, culverts, and canal dikes under hydrodynamic scour stress.',
        'Downed power lines or water with petroleum sheen / electrical arcing.'
      ],
      nearestSafeOption: 'North Ridge Civic Auditorium (Shelter Alpha) — 3.4 km Northeast via Elevated Corridor Alpha.',
      responsePriority: 'Amphibious Swiftwater Rescue Bravo-3 currently executing rooftop extractions in Sector 2.'
    };
  }

  // 2. High Risk Areas
  if (q.includes('which area') || q.includes('high risk') || q.includes('zones') || q.includes('danger')) {
    return {
      title: '⚠️ CRITICAL RISK ZONE ASSESSMENT',
      riskLevel: 'MULTIPLE ACTIVE THREATS',
      badgeColor: '#ef4444',
      summary: 'Automated geospatial telemetry has prioritized active threat zones based on hydraulic pressure and residential vulnerability.',
      immediateActions: [
        'Zone A (Delta Basin): CRITICAL RISK (87/100) — Active flash flooding. Mandatory evacuation in effect.',
        'Zone B (Metro Central): HIGH RISK (74/100) — Drainage culverts throttled at 92%. Secondary flooding imminent.',
        'Zone C (Port Terminal): MEDIUM RISK (48/100) — High tide storm surge monitoring active.',
        'Zone D (North Ridge): LOW RISK (22/100) — Designated safe high-ground sanctuary.'
      ],
      avoid: [
        'All east-west surface arterials intersecting Zone A lowlands.',
        'Underground transit stations along Metro Line 1 & Line 3.'
      ],
      nearestSafeOption: 'Zone D Highland Staging Grounds (Auditorium & School complex).',
      responsePriority: 'Resource allocation order: Zone A (Priority 1) → Zone B (Priority 2) → Zone C (Priority 3).'
    };
  }

  // 3. Evacuation Guidance
  if (q.includes('evacuat') || q.includes('where to go') || q.includes('escape') || q.includes('safe')) {
    return {
      title: '🧭 TACTICAL EVACUATION DIRECTIVE',
      riskLevel: 'ACTIVE EVACUATION ORDER',
      badgeColor: '#0ea5e9',
      summary: `Current evacuation corridor status for ${activeZone} indicates elevated ridgeway route is open and unimpeded.`,
      immediateActions: [
        'Follow Corridor Alpha (Elevated Ridgeway Viaduct) heading Northeast toward North Ridge.',
        'Take your pre-packed 72-hour grab-and-go emergency kit and essential prescriptions.',
        'Report to Reception Desk at North Ridge Civic Auditorium (Shelter Alpha) for intake and bed assignment.',
        'Notify family members via SMS (voice networks are throttled for emergency services).'
      ],
      avoid: [
        'Riverfront Parkway (Corridor Charlie) — COMPLETELY IMPASSIBLE due to 1.8m levee breach.',
        'Do not wait for daylight or dry weather to evacuate if located in low-lying Zone A.'
      ],
      nearestSafeOption: 'Shelter Alpha (1,080 beds available, full generator backup and emergency medical staff).',
      responsePriority: 'High-clearance tactical transport shuttle Bravo-2 is running continuous loops from Sector 2 Plaza.'
    };
  }

  // 4. Emergency Kit Checklist
  if (q.includes('kit') || q.includes('keep') || q.includes('supplies') || q.includes('pack')) {
    return {
      title: '🎒 72-HOUR SURVIVAL GO-BAG CHECKLIST',
      riskLevel: 'PREPAREDNESS PROTOCOL',
      badgeColor: '#22c55e',
      summary: 'Ensure each household member has an individual lightweight backpack packed with vital survival assets.',
      immediateActions: [
        '1 Gallon drinking water per person/day (minimum 3-day supply in sealed containers).',
        'Ready-to-eat calorie-dense food (energy bars, military MREs, canned goods + manual opener).',
        'Waterproof pouch with government identification, insurance papers, cash, and deeds.',
        'High-output LED flashlight + spare lithium batteries + high-decibel distress whistle.',
        'Portable power bank (20,000mAh) pre-charged to 100% with dual USB cords.',
        'Compact first aid kit with tourniquet, antiseptic wipes, burn dressing, and personal prescriptions.'
      ],
      avoid: [
        'Excess heavy luggage, large valuables, or glass containers that impede rapid movement.',
        'Leaving essential medications behind.'
      ],
      nearestSafeOption: 'If you lack supplies, proceed to Shelter Alpha where emergency humanitarian aid packages are distributed.',
      responsePriority: 'Citizen preparedness reduces civilian strain on frontline search & rescue teams by 40%.'
    };
  }

  // 5. Help First / Priority
  if (q.includes('first') || q.includes('help first') || q.includes('priorit') || q.includes('responder')) {
    return {
      title: '🎯 INCIDENT COMMAND PRIORITY MATRIX',
      riskLevel: 'TACTICAL DISPATCH',
      badgeColor: '#ef4444',
      summary: 'ResQ algorithmic triage ranks intervention priority based on population vulnerability, flood inundation velocity, and structural fragility.',
      immediateActions: [
        'PRIORITY 1: Zone A (Delta Basin) — St. Jude Care Home cluster (84 mobility-restricted elderly residents).',
        'PRIORITY 2: Zone A (East Levee Marker 42) — Reinforce sandbag cofferdam to prevent broader levee failure.',
        'PRIORITY 3: Zone B (Commercial Metro Spine) — Deploy heavy diesel de-watering pumps to prevent subway flooding.',
        'PRIORITY 4: Zone C (Maritime Harbor) — Secure chemical storage tanks against high-tide surge.'
      ],
      avoid: [
        'Diverting frontline swiftwater teams to non-life-safety property salvage.',
        'Deploying low-clearance emergency vehicles into uncharted flood waters.'
      ],
      nearestSafeOption: 'Incident Command Post is established at North Ridge Auditorium Plaza (Callsign: STAGING-LEAD).',
      responsePriority: 'Amphibious Swiftwater Bravo-3 and Aerial SAR Helicopter 1 have top operational priority.'
    };
  }

  // 6. Rainfall Increase / What-If
  if (q.includes('rain') || q.includes('water') || q.includes('increase') || q.includes('simulate') || q.includes('what if')) {
    return {
      title: '📈 PREDICTIVE HYDRODYNAMIC IMPACT',
      riskLevel: 'SURGE SIMULATION: 62 → 89',
      badgeColor: '#f97316',
      summary: 'Simulation models indicate that increasing rainfall from 100 mm → 180 mm dramatically escalates system-wide catastrophe.',
      immediateActions: [
        'Hydraulic pressure on Zone A floodwall increases by +38%, causing complete overtopping in 90 minutes.',
        'Zone B risk surges from 62 (Warning) to 89 (Critical), triggering secondary subway flood warnings.',
        'Evacuation window shrinks from 6.0 hours to approximately 1.5 hours.',
        'Trigger immediate mandatory evacuation for secondary sectors B1 and B2.'
      ],
      avoid: [
        'Relying on baseline historical flood marks — simulated crest exceeds 100-year recurrence limits.',
        'Delaying evacuation until floodwaters reach street level.'
      ],
      nearestSafeOption: 'Shelter Delta and Shelter Alpha have bedrock foundations immune to saturation failure.',
      responsePriority: 'Pre-position emergency backup generators and declare municipal flood emergency Stage 4.'
    };
  }

  // Default General Response
  return {
    title: `🤖 ResQ INTELLIGENCE SYNTHESIS — ${disaster.shortName.toUpperCase()}`,
    riskLevel: `${disaster.riskLevel} (${disaster.overallRisk}/100)`,
    badgeColor: disaster.severityColor || '#ef4444',
    summary: `Analyzing query regarding "${query}". Current status is ${disaster.status} centered in ${activeZone}.`,
    immediateActions: disaster.actions.doNow.slice(0, 4),
    avoid: disaster.actions.avoid.slice(0, 3),
    nearestSafeOption: 'North Ridge Civic Auditorium (Shelter Alpha) — 3.4 km Northeast.',
    responsePriority: disaster.actions.responsePriority[0] || 'Deploy emergency rescue units to primary hazard quadrant.'
  };
}

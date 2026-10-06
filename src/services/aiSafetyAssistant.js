// ResQ Intelligent Safety Assistant Service
// Reliable citizen-first emergency safety advice powered by context

export const DEFAULT_SUGGESTIONS = [
  "Should I evacuate?",
  "Is my area safe?",
  "What should I carry?",
  "Where should I go?",
  "What happens if conditions worsen?"
];

export function generateSafetyAdvice(query, context = {}) {
  const q = (query || '').toLowerCase().trim();
  const disasterName = context.disasterName || 'Disaster';
  const disasterId = context.disasterId || 'flood';
  const location = context.location || 'your current area';
  const riskScore = context.score || 75;
  const riskLevel = context.riskLevel || 'HIGH';
  const nearbyShelter = context.nearbyResources?.[0] || {
    name: 'North Ridge Civic Auditorium (Shelter Alpha)',
    distance: '1.2 km',
    elevation: '85m (High Ground, Flood Safe)',
    recommendedDirection: 'Head North-East toward North Ridge Viaduct'
  };

  // 1. Evacuation question: "Should I evacuate?"
  if (q.includes('evacuat') || q.includes('leave') || q.includes('flee') || q.includes('stay or go') || q.includes('should i go')) {
    if (riskScore >= 70) {
      return {
        headline: `⚠️ Recommendation: Prepare to Evacuate Now (${riskLevel} Risk)`,
        body: `Because your current estimated risk in **${location}** is **${riskScore}/100 (${riskLevel})**, staying put carries significant hazard.`,
        keyPoints: [
          `**Do not wait until travel routes are blocked.** Water, smoke, or debris can cut off escape routes within 30–60 minutes.`,
          `**Primary safe haven:** Head toward **${nearbyShelter.name}** (${nearbyShelter.distance} away).`,
          `**Route:** ${nearbyShelter.recommendedDirection}.`,
          `Ensure family members are together, take your essential grab-and-go bag, and notify a contact outside the disaster zone via text message.`
        ],
        caution: 'If waters are already flowing swiftly across your street (> 6 inches) or smoke is blinding, seek vertical high ground within your immediate building rather than driving into hazards.'
      };
    } else {
      return {
        headline: `ℹ️ Recommendation: Shelter in Place, but Stay Ready (${riskLevel} Risk)`,
        body: `Your risk score in **${location}** is currently **${riskScore}/100 (${riskLevel})**. Mandatory evacuation has not been triggered for your immediate sector, but conditions can change rapidly.`,
        keyPoints: [
          `Keep your emergency go-bag by the door with identification, water, and prescriptions.`,
          `Check vehicle fuel level and park facing outward away from low-lying garage dips.`,
          `Monitor local emergency siren broadcasts every 15–30 minutes.`,
          `If water enters your property or visible smoke intensifies, evacuate toward ${nearbyShelter.name} immediately.`
        ],
        caution: 'Never attempt to cross flooded roadways or unmonitored roadblocks.'
      };
    }
  }

  // 2. "Is my area safe?"
  if (q.includes('area safe') || q.includes('am i safe') || q.includes('danger') || q.includes('how safe') || q.includes('risk level')) {
    return {
      headline: `📍 Safety Status for ${location}: ${riskLevel} (${riskScore}/100)`,
      body: `Based on your reported inputs for ${disasterName.toLowerCase()} conditions, ${location} is categorized under **${riskLevel} RISK**.`,
      keyPoints: [
        `**Risk Assessment:** ${riskScore >= 70 ? 'Substantial threat to safety and property.' : 'Moderate localized disruption; heightened vigilance required.'}`,
        `**Vulnerabilities:** Low elevation, proximity to drainage or fire corridors, and environmental saturation increase vulnerability.`,
        `**Immediate Safe Zone:** High-ground facilities such as **${nearbyShelter.name}** (${nearbyShelter.distance}) offer engineered protection, backup power, and supplies.`
      ],
      caution: 'Conditions during active weather and seismic incidents are dynamic. Trust your immediate senses—if you see rising water or structural cracks, move.'
    };
  }

  // 3. "What should I carry?" / "Emergency kit" / "What to pack"
  if (q.includes('carry') || q.includes('pack') || q.includes('bag') || q.includes('kit') || q.includes('bring') || q.includes('take with')) {
    return {
      headline: `🎒 Essential Emergency "Go-Bag" Checklist`,
      body: `Pack only lightweight, high-priority survival essentials. Do not delay evacuation trying to gather heavy household belongings.`,
      keyPoints: [
        `**Critical Documents:** Government ID, passport, insurance cards, and property deeds sealed in a ziplock waterproof bag.`,
        `**Medications & First Aid:** At least a 7-day supply of daily prescriptions, pain relief, antiseptic wipes, and clean bandages.`,
        `**Water & Nutrition:** 1 liter of bottled drinking water per person and compact, non-perishable energy bars.`,
        `**Power & Comms:** Mobile phone, portable power bank, charging cable, and a small flashlight with spare batteries.`,
        `**Personal Safety:** Sturdy closed-toe shoes, warm layer/rain poncho, and N95 masks (for smoke, dust, or mold particulates).`,
        `**Cash:** Small paper bills (ATMs and card terminals may lose power and internet connection).`
      ],
      caution: 'Keep your bag weight under 7–10 kg so you can walk quickly on foot if roads become impassable.'
    };
  }

  // 4. "Where should I go?" / "Nearest shelter" / "Safe refuge"
  if (q.includes('where') || q.includes('shelter') || q.includes('hospital') || q.includes('direction') || q.includes('safe place') || q.includes('route')) {
    return {
      headline: `🧭 Designated Safe Options Near ${location}`,
      body: `Emergency planners have designated safe reception sanctuaries outside the hazard zone:`,
      keyPoints: [
        `**1. Primary Emergency Shelter:** **${nearbyShelter.name}** (${nearbyShelter.distance}) — Status: **Open**. Safe elevation: **${nearbyShelter.elevation}**. Equipped with medical triage, warm meals, and cot beds.`,
        `**2. Medical Emergency Facility:** **Metro General Hospital** (2.8 km) — Trauma care active for physical injuries.`,
        `**3. Highland Staging Point C:** (3.4 km) — Open distribution point for clean bottled water, dry blankets, and family reunification.`,
        `**Recommended Direction:** ${nearbyShelter.recommendedDirection}.`
      ],
      caution: 'Avoid underpasses, flooded culverts, and narrow dead-end roads during transit.'
    };
  }

  // 5. "What happens if conditions worsen?" / "rainfall increases" / "wind spikes"
  if (q.includes('worsen') || q.includes('rain') || q.includes('increase') || q.includes('what if') || q.includes('condition') || q.includes('aftershock')) {
    const simulatedScore = Math.min(98, Math.round(riskScore * 1.25));
    return {
      headline: `📈 Simulated Escalation Impact (+${simulatedScore - riskScore} Pts)`,
      body: `If ${disasterName.toLowerCase()} intensity increases by 25–40%, your risk score will rise from **${riskScore}/100** to **${simulatedScore}/100 (CRITICAL)**.`,
      keyPoints: [
        `**Infrastructure Strain:** Drainage channels and storm barriers will exceed containment limits.`,
        `**Access Cutoffs:** Secondary escape roads may submerge or become blocked by debris within 45 minutes.`,
        `**Utility Failures:** Expect sudden power grid outages and loss of municipal water pressure.`,
        `**Preemptive Move:** Moving early before peak conditions makes evacuation 5x safer and avoids traffic gridlock.`
      ],
      caution: 'You can test custom scenarios directly in the "Simple What-If" simulation tab below your risk score.'
    };
  }

  // 6. Pets
  if (q.includes('pet') || q.includes('dog') || q.includes('cat') || q.includes('animal')) {
    return {
      headline: `🐾 Pet Safety & Evacuation Guidance`,
      body: `Never leave pets behind tied up or trapped indoors during a disaster.`,
      keyPoints: [
        `**Shelter Alpha (${nearbyShelter.name}) is pet-friendly** with a designated animal holding area.`,
        `Bring a sturdy leash, pet carrier/crate, and a 3-day supply of pet food and clean water.`,
        `Carry proof of vaccinations and collar ID tags with your phone number clearly visible.`
      ],
      caution: 'In flood or fire scenarios, scared animals may hide under beds; secure them inside a carrier early before leaving.'
    };
  }

  // 7. Power & Utilities / Electricity / Gas
  if (q.includes('power') || q.includes('electric') || q.includes('gas') || q.includes('utility') || q.includes('water tap')) {
    return {
      headline: `⚡ Safe Utility Management Protocol`,
      body: `Managing utilities properly prevents deadly secondary fires and electrocutions during disasters.`,
      keyPoints: [
        `**Electricity:** Shut off the main circuit breaker BEFORE floodwaters reach electrical outlets, but NEVER touch a breaker if standing in water.`,
        `**Gas:** Turn off the main gas isolation valve if you smell gas (rotten egg odor) or see wall damage after an earthquake. Never light matches or candles.`,
        `**Drinking Water:** Fill clean bottles or bathtub before municipal water pressure drops. Boil tap water for 1 minute before drinking if floodwaters enter water mains.`
      ],
      caution: 'Assume all downed exterior power lines are live and extremely lethal. Maintain a minimum 10-meter clearance.'
    };
  }

  // 8. Vehicle & Driving
  if (q.includes('drive') || q.includes('car') || q.includes('vehicle') || q.includes('road')) {
    return {
      headline: `🚗 Road & Vehicle Safety Warning`,
      body: `Over 50% of flood-related fatalities occur in motor vehicles.`,
      keyPoints: [
        `**Turn Around, Don't Drown:** Just 12 inches (30 cm) of moving water can float a standard passenger car. 24 inches sweeps SUVs away.`,
        `**Basement Garages:** If your car is parked in an underground basement that is beginning to flood, DO NOT enter the basement to retrieve it. Life comes before property.`,
        `**Evacuation Route:** Use elevated expressways and main arterials toward North Ridge (${nearbyShelter.recommendedDirection}).`
      ],
      caution: 'If your vehicle stalls in rapidly rising water, abandon it immediately and climb to higher ground.'
    };
  }

  // Generic intelligent safety fallback
  return {
    headline: `🛡️ Safety Guidance for ${disasterName} in ${location}`,
    body: `Regarding your question: "${query}" — Here are immediate protective principles for your situation in **${location}** (Current Risk: **${riskScore}/100**):`,
    keyPoints: [
      `**Protect Life First:** Prioritize physical safety over protecting property or belongings.`,
      `**Stay Informed:** Keep an ear to emergency civil defense broadcasts and follow local authority directives.`,
      `**Nearest Safe Destination:** If your immediate surroundings feel unsafe, move toward **${nearbyShelter.name}** (${nearbyShelter.distance} away).`,
      `**Emergency Contact:** For life-threatening emergencies, dial **911** or **112** immediately.`
    ],
    caution: 'ResQ is a prototype safety assistant using simulated data. Always prioritize real-world directives from local emergency personnel.'
  };
}

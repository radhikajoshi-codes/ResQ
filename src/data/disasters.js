// ResQ Master Disaster Intelligence Scenarios & Telemetry Data

export const DISASTER_SCENARIOS = {
  flood: {
    id: 'flood',
    name: 'Flash Flood & River Inundation',
    shortName: 'Flood',
    icon: 'Waves',
    category: 'Hydrological',
    overallRisk: 87,
    riskLevel: 'CRITICAL',
    status: 'ACTIVE EMERGENCY',
    primaryZone: 'Zone A',
    locationSummary: 'Zone A — Lower Basin & Estuary',
    activeAlertsCount: 8,
    criticalZonesCount: 3,
    affectedPopulation: 24800,
    evacuationCount: 14200,
    responseTeamsActive: 12,
    trend: '+12% from previous assessment',
    severityColor: '#ef4444',
    bgBadge: 'rgba(239, 68, 68, 0.15)',
    summaryTitle: 'Flood conditions detected — Severe Crest Approaching',
    summaryDescription: 'Monsoon discharge and upstream levee breach producing rapid water rise of +0.45m/hr along Lower Delta corridor.',
    environmentalInputs: {
      rainfall: { value: 165, unit: 'mm/24h', min: 20, max: 300, label: 'Precipitation Volume', threshold: 110 },
      waterLevel: { value: 4.8, unit: 'm', min: 1.0, max: 8.0, label: 'River Crest Level', threshold: 3.5 },
      drainageCondition: { value: 28, unit: '% capacity', min: 10, max: 100, label: 'Drainage Flow Clearance', threshold: 50, inverted: true },
      populationDensity: { value: 4850, unit: 'per km²', min: 500, max: 8000, label: 'Vulnerable Population Density', threshold: 3000 }
    },
    whatIfSimulation: {
      parameter: 'rainfall',
      label: 'Precipitation Surge',
      baseValue: 100,
      simulatedValue: 180,
      unit: 'mm',
      baseRisk: 62,
      simulatedRisk: 89,
      riskDelta: '+27%',
      explanation: 'Increased rainfall from 100 mm → 180 mm overwhelms the Sector 4 secondary floodwall, accelerating basin inundation from 6 hours to 90 minutes.'
    },
    reasoning: [
      'Precipitation is 165 mm/24h, significantly exceeding the 110 mm safe threshold (+50%).',
      'Water level at Delta Gauge #4 is rapidly increasing (+0.45m/hr) toward 5.0m critical crest.',
      'Silt accumulation and debris have throttled municipal drainage discharge to 28% efficiency.',
      'Zone A contains high-density low-lying settlements with 62% ground-floor residences.',
      'Subsurface soil saturation reached 94%, eliminating natural stormwater absorption.'
    ],
    predictedImpact: 'Severe flash flooding across Sector 1 & 2 low-lying tracts within the next 2.5–4 hours. Anticipated water depths of 1.2m to 2.4m in Zone A floodway. 4,200 residential ground units at imminent risk.',
    actions: {
      doNow: [
        'Mandatory vertical evacuation: Move immediately to designated multi-story concrete structures or higher ground.',
        'Cut main electrical circuit breakers and gas supply valves before floodwaters enter building.',
        'Grab emergency go-bags with medicines, essential documents in waterproof pouches, and charged mobile devices.',
        'Follow designated North-East evacuation corridor along Elevated Ridgeway Route Alpha.'
      ],
      avoid: [
        'DO NOT walk, swim, or drive through standing or moving floodwater (6 inches of rushing water can sweep adults away).',
        'Avoid bridges, culverts, underpasses, and riverbanks prone to sudden structural scour.',
        'Stay clear of downed power lines and submerged electrical transformers.',
        'Do not delay evacuation waiting for waters to recede.'
      ],
      monitor: [
        'Monitor Delta Gauge #4 real-time telemetry every 15 minutes.',
        'Watch for official siren broadcasts and emergency mobile alerts via ResQ broadcast channel.',
        'Track upstream dam spillway discharge rates currently holding at 1,400 m³/s.'
      ],
      responsePriority: [
        'Deploy Amphibious Rescue Unit Bravo-3 to Zone A Sector 2 elderly care cluster.',
        'Reinforce sandbag staging along East Canal levee breach at Marker 42.',
        'Pre-position medical triage boats at High School Shelter Alpha landing pad.',
        'Establish aerial drone surveillance along evacuation corridor Alpha to verify clear transit.'
      ]
    }
  },

  earthquake: {
    id: 'earthquake',
    name: 'Seismic Shock & Structural Hazard',
    shortName: 'Earthquake',
    icon: 'Activity',
    category: 'Geophysical',
    overallRisk: 91,
    riskLevel: 'CRITICAL',
    status: 'ACTIVE EMERGENCY',
    primaryZone: 'Zone B',
    locationSummary: 'Zone B — Metro Central & Fault Escarpment',
    activeAlertsCount: 11,
    criticalZonesCount: 4,
    affectedPopulation: 48500,
    evacuationCount: 29000,
    responseTeamsActive: 18,
    trend: '+34% aftershock probability',
    severityColor: '#ef4444',
    bgBadge: 'rgba(239, 68, 68, 0.15)',
    summaryTitle: 'Magnitude 7.1 Seismic Rupture Detected',
    summaryDescription: 'Shallow crustal strike-slip rupture at 10km depth. High probability of severe M5.5+ aftershocks within next 12 hours.',
    environmentalInputs: {
      magnitude: { value: 7.1, unit: 'Richter M', min: 4.0, max: 9.0, label: 'Earthquake Magnitude', threshold: 6.0 },
      depth: { value: 9.8, unit: 'km', min: 2.0, max: 60.0, label: 'Hypocenter Depth', threshold: 15.0, inverted: true },
      buildingVulnerability: { value: 78, unit: '% unreinforced', min: 10, max: 100, label: 'Unreinforced Masonry Index', threshold: 45 },
      distance: { value: 14, unit: 'km', min: 1, max: 100, label: 'Epicenter Distance to City Center', threshold: 25, inverted: true }
    },
    whatIfSimulation: {
      parameter: 'magnitude',
      label: 'Mainshock / Aftershock Intensity',
      baseValue: 6.2,
      simulatedValue: 7.4,
      unit: 'Richter',
      baseRisk: 58,
      simulatedRisk: 94,
      riskDelta: '+36%',
      explanation: 'Simulating an increase from M6.2 to M7.4 increases ground acceleration 4.1x, triggering non-ductile concrete collapse across Zone B.'
    },
    reasoning: [
      'Recorded M7.1 shock produced Peak Ground Acceleration (PGA) of 0.58g.',
      'Shallow focal depth (9.8 km) amplified surface shear waves across alluvial soil deposits.',
      'Dense urban sector contains 78% unreinforced masonry structures constructed prior to seismic codes.',
      'Gas pipeline rupture telemetry triggered automatic shutoff warnings in 4 utility grids.'
    ],
    predictedImpact: 'Extensive structural compromise across older residential complexes in Zone B. 12 confirmed building collapses, elevated liquefaction risk near riverside, aftershock hazard high.',
    actions: {
      doNow: [
        'DROP, COVER, and HOLD ON under sturdy furniture or interior load-bearing walls.',
        'Evacuate damaged masonry buildings immediately when violent shaking pauses.',
        'Shut off gas mains at the exterior meter if smelling odor or hearing hissing.',
        'Assemble in designated open-field Safe Assembly Zones away from facades, glass, and poles.'
      ],
      avoid: [
        'DO NOT use elevators under any circumstances.',
        'Avoid standing near brick chimneys, parapets, storefront glass, or heavy overhanging billboards.',
        'Do not strike matches, lighters, or use electrical switches until gas lines are cleared.'
      ],
      monitor: [
        'Continuous seismic aftershock telemetry from Station SQ-09.',
        'Structural health monitoring alerts on municipal bridges and overpasses.'
      ],
      responsePriority: [
        'Urban Search & Rescue (USAR) Unit Alpha-1 assigned to collapsed textile warehouse Sector 4.',
        'Establish field trauma hospital at Memorial Park Open Staging Area.',
        'Coordinate emergency structural engineering teams for hospital integrity inspections.'
      ]
    }
  },

  wildfire: {
    id: 'wildfire',
    name: 'Wildfire Front & Urban Interface',
    shortName: 'Wildfire',
    icon: 'Flame',
    category: 'Thermal',
    overallRisk: 78,
    riskLevel: 'HIGH',
    status: 'WARNING EXTENDED',
    primaryZone: 'Zone D',
    locationSummary: 'Zone D — Ridge Foothills & Pine Corridor',
    activeAlertsCount: 6,
    criticalZonesCount: 2,
    affectedPopulation: 16200,
    evacuationCount: 8900,
    responseTeamsActive: 9,
    trend: '+18% fire front expansion rate',
    severityColor: '#f97316',
    bgBadge: 'rgba(249, 115, 22, 0.15)',
    summaryTitle: 'Rapid Wildfire Spread Driven by 58 km/h Gusts',
    summaryDescription: 'Crown fire propagating south-southeast through drought-stressed timber toward residential wildland-urban interface.',
    environmentalInputs: {
      temperature: { value: 41.5, unit: '°C', min: 25, max: 50, label: 'Ambient Temperature', threshold: 36 },
      windSpeed: { value: 58, unit: 'km/h', min: 10, max: 110, label: 'Sustained Wind Speed', threshold: 40 },
      vegetationDryness: { value: 89, unit: '% fuel dryness', min: 20, max: 100, label: 'Fuel Aridity Index', threshold: 65 },
      fireFrontSpeed: { value: 2.8, unit: 'km/h', min: 0.5, max: 8.0, label: 'Front Advance Velocity', threshold: 1.5 }
    },
    whatIfSimulation: {
      parameter: 'windSpeed',
      label: 'Canyon Wind Velocity',
      baseValue: 30,
      simulatedValue: 65,
      unit: 'km/h',
      baseRisk: 52,
      simulatedRisk: 86,
      riskDelta: '+34%',
      explanation: 'A wind shift and increase to 65 km/h accelerates ember spotting up to 1.8km ahead of the flame front, jumping containment barriers.'
    },
    reasoning: [
      'Extreme Red Flag weather conditions with 41.5°C surface heat and 11% relative humidity.',
      'Sustained gusts of 58 km/h creating long-range ember casting into suburban roofs.',
      'Dead fuel moisture levels below 6%, enabling instantaneous ignition of timber brush.',
      'Canyon topography creating a chimney effect funneling radiant heat upward.'
    ],
    predictedImpact: 'Active flame front reaching Foothills Estates perimeter within 75 minutes. Severe smoke plume causing hazardous AQI > 450 across downwind urban sectors.',
    actions: {
      doNow: [
        'Execute immediate Level 3 ("GO NOW") evacuation orders for Zone D Foothills sector.',
        'Close all residential windows, doors, and air dampers; remove flammable curtains.',
        'Wear N95/P100 respirators or moist cloth masks to filter toxic smoke particulates.',
        'Proceed south via Coastal Highway 101 bypass.'
      ],
      avoid: [
        'DO NOT attempt to defend combustible structures with garden hoses when winds exceed 40 km/h.',
        'Avoid narrow canyon access roads vulnerable to smoke blackout and tree falls.',
        'Never drive blindly into thick smoke clouds.'
      ],
      monitor: [
        'Infrared satellite perimeter updates via GOES-Fire imagery.',
        'Local wind direction shifts anticipated at 14:00 hours with sea-breeze convergence.'
      ],
      responsePriority: [
        'Airtanker DC-10 retardant drops along Ridgebreak Line Alpha.',
        'Deploy Structure Protection Strike Teams to Foothills School evacuation boundary.',
        'Keep open Southbound emergency evacuation corridor via Highway Patrol escorts.'
      ]
    }
  },

  storm: {
    id: 'storm',
    name: 'Severe Tropical Cyclone / Superstorm',
    shortName: 'Cyclone/Storm',
    icon: 'Wind',
    category: 'Atmospheric',
    overallRisk: 89,
    riskLevel: 'CRITICAL',
    status: 'HURRICANE WARNING',
    primaryZone: 'Zone C',
    locationSummary: 'Zone C & A — Coastal Harbor & Sea Wall',
    activeAlertsCount: 9,
    criticalZonesCount: 3,
    affectedPopulation: 38200,
    evacuationCount: 21500,
    responseTeamsActive: 15,
    trend: '+22% storm surge height',
    severityColor: '#ef4444',
    bgBadge: 'rgba(239, 68, 68, 0.15)',
    summaryTitle: 'Category 4 Cyclone "Aegis-One" Landfall Imminent',
    summaryDescription: 'Sustained winds of 195 km/h with 4.5m storm surge predicted during 18:30 astronomical high tide.',
    environmentalInputs: {
      windSpeed: { value: 195, unit: 'km/h', min: 60, max: 280, label: 'Peak Wind Gusts', threshold: 140 },
      stormSurge: { value: 4.5, unit: 'm', min: 0.5, max: 7.0, label: 'Predicted Storm Surge', threshold: 2.5 },
      barometricPressure: { value: 938, unit: 'hPa', min: 900, max: 1020, label: 'Central Barometric Pressure', threshold: 960, inverted: true },
      precipitationRate: { value: 45, unit: 'mm/hr', min: 5, max: 100, label: 'Hourly Downpour Intensity', threshold: 30 }
    },
    whatIfSimulation: {
      parameter: 'stormSurge',
      label: 'Oceanic Surge Level',
      baseValue: 2.2,
      simulatedValue: 4.8,
      unit: 'm',
      baseRisk: 59,
      simulatedRisk: 92,
      riskDelta: '+33%',
      explanation: 'Overtopping of the 3.0m seawall with a 4.8m surge will flood the harbor commercial district up to 1.2km inland.'
    },
    reasoning: [
      'Category 4 cyclone central pressure collapsed to 938 hPa, indicating intense eyewall dynamics.',
      'Storm surge timing synchronizes exactly with astronomical spring high tide.',
      'Sustained wind gusts of 195 km/h capable of uprooting commercial cranes and utility pylons.',
      'Heavy squall bands producing rainfall rates of 45 mm/hr causing concurrent coastal & inland flash flooding.'
    ],
    predictedImpact: 'Catastrophic wave overtopping along coastal defense walls. Inundation of Port Terminals 1–4, total power outages across coastal sectors, severe projectile debris hazard.',
    actions: {
      doNow: [
        'Mandatory evacuation for all residents within 2 km of oceanfront and tidal estuaries.',
        'Board up windows with structural storm shutters or heavy marine plywood.',
        'Anchor exterior vessels and secure all loose industrial machinery.',
        'Shelter in reinforced interior rooms without windows during eyewall transit.'
      ],
      avoid: [
        'DO NOT walk along jetties, seawalls, or beaches to view waves or storm surf.',
        'Never go outside during the calm of the eye—destructive backside winds resume violently within minutes.',
        'Avoid driving over coastal causeways subject to wave splash-over.'
      ],
      monitor: [
        'Doppler radar storm tracking and coastal tide gauge buoy #12.',
        'Emergency civil defense frequencies 162.550 MHz.'
      ],
      responsePriority: [
        'Secure municipal port lock gates and shutdown coastal electrical substations.',
        'Pre-stage high-clearance rescue transports at North Summit Depot.',
        'Establish auxiliary emergency telecommunication towers at Inland Bunker Alpha.'
      ]
    }
  }
};

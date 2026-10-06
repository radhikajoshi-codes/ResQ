// ResQ Citizen Risk Engine
// Transparent, explainable local risk assessment for disaster safety

export const DISASTERS = [
  {
    id: 'flood',
    name: 'Flood',
    iconName: 'Waves',
    tagline: 'Rising water, river overflow & flash flooding',
    color: '#06b6d4'
  },
  {
    id: 'heavy_rain',
    name: 'Heavy Rain',
    iconName: 'CloudRain',
    tagline: 'Continuous downpour & urban waterlogging',
    color: '#3b82f6'
  },
  {
    id: 'fire',
    name: 'Fire / Wildfire',
    iconName: 'Flame',
    tagline: 'Fast-moving urban or brush fire',
    color: '#f97316'
  },
  {
    id: 'storm',
    name: 'Storm',
    iconName: 'Wind',
    tagline: 'High gale winds & severe squall conditions',
    color: '#8b5cf6'
  },
  {
    id: 'cyclone',
    name: 'Cyclone',
    iconName: 'CloudLightning',
    tagline: 'Extreme tropical storm with dangerous surge',
    color: '#0ea5e9'
  },
  {
    id: 'earthquake',
    name: 'Earthquake',
    iconName: 'Activity',
    tagline: 'Ground shaking & structural collapse risk',
    color: '#ef4444'
  },
  {
    id: 'extreme_heat',
    name: 'Extreme Heat',
    iconName: 'Sun',
    tagline: 'Severe heatwave & thermal stress hazard',
    color: '#eab308'
  },
  {
    id: 'other',
    name: 'Other Hazard',
    iconName: 'AlertTriangle',
    tagline: 'General environmental or civil emergency',
    color: '#94a3b8'
  }
];

export const LOCATION_PRESETS = [
  { name: 'Lower Basin / Riverside', defaultDisaster: 'flood', zone: 'Sector 1' },
  { name: 'Downtown Metro Center', defaultDisaster: 'heavy_rain', zone: 'Sector 2' },
  { name: 'Foothills / Ridge Park', defaultDisaster: 'fire', zone: 'Sector 4' },
  { name: 'Coastal Harbor District', defaultDisaster: 'storm', zone: 'Sector 3' },
  { name: 'Old Town Masonry Quarter', defaultDisaster: 'earthquake', zone: 'Sector 5' }
];

// Definition of disaster-specific questions
export const DISASTER_QUESTIONS = {
  flood: [
    {
      id: 'rainfall',
      label: 'Rainfall Intensity',
      description: 'How heavy is the rain right now?',
      type: 'choice',
      options: [
        { label: 'Light Rain', value: 'light', score: 10, desc: 'Drizzle or intermittent light drops' },
        { label: 'Moderate Rain', value: 'moderate', score: 30, desc: 'Steady rain, drains still flowing' },
        { label: 'Heavy Downpour', value: 'heavy', score: 65, desc: 'Pounding rain, reduced visibility' },
        { label: 'Torrential / Cloudburst', value: 'torrential', score: 95, desc: 'Unrelenting violent deluge' }
      ],
      default: 'heavy'
    },
    {
      id: 'waterLevel',
      label: 'Water Level Nearby',
      description: 'What is the current water situation on your street?',
      type: 'choice',
      options: [
        { label: 'Street Dry', value: 'dry', score: 5, desc: 'No standing water' },
        { label: 'Puddles & Curb Flow', value: 'puddles', score: 30, desc: 'Water accumulating at curbs' },
        { label: 'Road Submerged (Ankle to Knee)', value: 'road_flooded', score: 70, desc: 'Vehicles struggling to pass' },
        { label: 'Entering Buildings (Waist Deep+)', value: 'entering_homes', score: 98, desc: 'Water breached doors and gates' }
      ],
      default: 'road_flooded'
    },
    {
      id: 'lowLying',
      label: 'Ground Elevation',
      description: 'Is your current building in a low-lying valley or basin?',
      type: 'choice',
      options: [
        { label: 'Low-Lying / Basin Area', value: 'low_lying', score: 85, desc: 'Natural depression or drainage basin' },
        { label: 'Gentle Slope / Flat Land', value: 'flat', score: 45, desc: 'Standard city elevation' },
        { label: 'Elevated High Ground', value: 'elevated', score: 10, desc: 'Hillside or ridge above surrounding terrain' }
      ],
      default: 'low_lying'
    },
    {
      id: 'distanceWater',
      label: 'Distance to River or Canal',
      description: 'How close are you to a river, drainage canal, or lake?',
      type: 'choice',
      options: [
        { label: 'Under 500 meters', value: 'very_close', score: 90, desc: 'Immediately adjacent to water body' },
        { label: '500m to 2 km', value: 'moderate', score: 50, desc: 'Walking distance to river or canal' },
        { label: 'More than 2 km away', value: 'far', score: 15, desc: 'Significant buffer from major waterways' }
      ],
      default: 'very_close'
    }
  ],

  heavy_rain: [
    {
      id: 'rainfall',
      label: 'Rainfall Intensity',
      description: 'How severe is the continuous rain?',
      type: 'choice',
      options: [
        { label: 'Moderate Continuous', value: 'moderate', score: 35, desc: 'Steady rainfall for past hours' },
        { label: 'Heavy Continuous Downpour', value: 'heavy', score: 70, desc: 'Severe rainfall with street pooling' },
        { label: 'Violent Cloudburst', value: 'violent', score: 95, desc: 'Extreme rain rate exceeding 50mm/hr' }
      ],
      default: 'heavy'
    },
    {
      id: 'drainage',
      label: 'Street Drainage Status',
      description: 'Are local storm drains coping with the runoff?',
      type: 'choice',
      options: [
        { label: 'Draining Normally', value: 'good', score: 10, desc: 'Runoff enters catchbasins rapidly' },
        { label: 'Slow / Overflowing Gutters', value: 'slow', score: 50, desc: 'Water backing up across gutters' },
        { label: 'Completely Blocked / Backing Up', value: 'blocked', score: 85, desc: 'Manholes overflowing, silt choked' }
      ],
      default: 'slow'
    },
    {
      id: 'structure',
      label: 'Your Building Level',
      description: 'Which level of the structure are you located in?',
      type: 'choice',
      options: [
        { label: 'Basement / Semi-Underground', value: 'basement', score: 95, desc: 'Extremely vulnerable to sudden flooding' },
        { label: 'Ground Floor', value: 'ground', score: 65, desc: 'Direct street level entry' },
        { label: 'Upper Floors (2nd Floor & Above)', value: 'upper', score: 20, desc: 'Elevated residential floor' }
      ],
      default: 'ground'
    },
    {
      id: 'duration',
      label: 'Duration of Rainfall',
      description: 'How long has it been raining heavily?',
      type: 'choice',
      options: [
        { label: 'Less than 1 hour', value: 'short', score: 25, desc: 'Recently started' },
        { label: '1 to 6 hours', value: 'medium', score: 60, desc: 'Ground already saturated' },
        { label: 'Over 6 hours continuously', value: 'long', score: 85, desc: 'Soil saturation at maximum capacity' }
      ],
      default: 'medium'
    }
  ],

  fire: [
    {
      id: 'distanceFire',
      label: 'Distance from Fire',
      description: 'How close is the visible fire front or flames?',
      type: 'choice',
      options: [
        { label: 'Flames Visible (< 1 km)', value: 'very_close', score: 95, desc: 'Direct radiant heat, ash falling' },
        { label: '1 to 3 km away', value: 'moderate', score: 70, desc: 'Thick smoke plume, active sirens' },
        { label: '3 to 7 km away', value: 'distant', score: 40, desc: 'Distant glow or reported fire front' },
        { label: 'Over 7 km away', value: 'far', score: 15, desc: 'Precautionary monitoring' }
      ],
      default: 'moderate'
    },
    {
      id: 'smoke',
      label: 'Smoke Density Nearby',
      description: 'How thick is the smoke in your immediate area?',
      type: 'choice',
      options: [
        { label: 'Suffocating / Low Visibility', value: 'heavy', score: 90, desc: 'Eye irritation, hard to breathe outside' },
        { label: 'Noticeable Smoke Haze & Ash', value: 'moderate', score: 60, desc: 'Smell of burning, light haze' },
        { label: 'Clear Air / Minimal Smoke', value: 'clear', score: 15, desc: 'No immediate breathing hazard' }
      ],
      default: 'moderate'
    },
    {
      id: 'wind',
      label: 'Wind Direction & Speed',
      description: 'Is the wind blowing the fire toward your location?',
      type: 'choice',
      options: [
        { label: 'Strong Gusts Blowing Toward You', value: 'toward_strong', score: 95, desc: 'Accelerates embers & fire spread' },
        { label: 'Moderate Breeze Toward You', value: 'toward_mod', score: 65, desc: 'Gradual advance toward area' },
        { label: 'Blowing Away or Calm Wind', value: 'away_calm', score: 25, desc: 'Fire spreading away or stationary' }
      ],
      default: 'toward_strong'
    },
    {
      id: 'fireType',
      label: 'Surrounding Terrain',
      description: 'What type of vegetation or structures surround you?',
      type: 'choice',
      options: [
        { label: 'Dry Timber / Dense Woodland', value: 'timber', score: 85, desc: 'High fuel load, intense crown fires' },
        { label: 'Dry Grassland / Brush', value: 'brush', score: 65, desc: 'Fast surface spread' },
        { label: 'Urban Concrete Neighborhood', value: 'urban', score: 35, desc: 'Defensible paved perimeter' }
      ],
      default: 'brush'
    }
  ],

  earthquake: [
    {
      id: 'magnitude',
      label: 'Shaking Intensity Felt',
      description: 'How severe was the shaking or reported magnitude?',
      type: 'choice',
      options: [
        { label: 'Violent Shaking (Hard to stand, items thrown)', value: 'violent', score: 95, desc: 'Felt like M6.5+ or very near epicenter' },
        { label: 'Strong Shaking (Furniture moved, loud rumbling)', value: 'strong', score: 70, desc: 'Felt like M5.5 - M6.4' },
        { label: 'Moderate Shaking (Dishes rattled, felt by all)', value: 'moderate', score: 40, desc: 'Felt like M4.5 - M5.4' },
        { label: 'Light Tremor (Felt only when seated)', value: 'light', score: 15, desc: 'Minor tremor M3.5 - M4.4' }
      ],
      default: 'violent'
    },
    {
      id: 'distanceEpicenter',
      label: 'Estimated Distance to Epicenter',
      description: 'How far away was the reported rupture / center?',
      type: 'choice',
      options: [
        { label: 'Within 15 km (Near Epicenter)', value: 'near', score: 90, desc: 'Direct focal shock wave zone' },
        { label: '15 to 50 km', value: 'mid', score: 60, desc: 'Significant ground shaking wave' },
        { label: 'Over 50 km away', value: 'far', score: 25, desc: 'Attenuated energy waves' }
      ],
      default: 'near'
    },
    {
      id: 'buildingType',
      label: 'Building Construction Type',
      description: 'What kind of structure are you currently in?',
      type: 'choice',
      options: [
        { label: 'Old Brick / Unreinforced Masonry', value: 'masonry', score: 95, desc: 'High collapse vulnerability in shocks' },
        { label: 'Older Concrete / Multi-story', value: 'old_concrete', score: 70, desc: 'Moderate seismic compliance' },
        { label: 'Modern Reinforced Concrete / Steel', value: 'modern', score: 30, desc: 'Engineered for seismic dampening' },
        { label: 'Wood-frame Single Family Home', value: 'wood', score: 35, desc: 'Flexible frame, low collapse risk' }
      ],
      default: 'masonry'
    },
    {
      id: 'damageSeen',
      label: 'Visible Structural Damage',
      description: 'Do you see any cracks, tilting, or fallen debris?',
      type: 'choice',
      options: [
        { label: 'Deep Diagonal Cracks / Tilted Walls', value: 'severe', score: 95, desc: 'Critical structural compromise' },
        { label: 'Hairline Cracks / Fallen Plaster', value: 'minor', score: 45, desc: 'Cosmetic damage, check columns' },
        { label: 'No Visible Cracking', value: 'none', score: 10, desc: 'Structure appears visually intact' }
      ],
      default: 'severe'
    }
  ],

  storm: [
    {
      id: 'windSpeed',
      label: 'Sustained Wind Speed',
      description: 'How intense are the wind gusts outside?',
      type: 'choice',
      options: [
        { label: 'Extreme Winds (> 120 km/h)', value: 'extreme', score: 95, desc: 'Trees snapped, roofs damaged, flying debris' },
        { label: 'Gale Force Winds (80–120 km/h)', value: 'gale', score: 75, desc: 'Large branches broken, walking difficult' },
        { label: 'Strong Breeze (50–80 km/h)', value: 'breeze', score: 40, desc: 'Umbrellas invert, small branches bend' },
        { label: 'Moderate Wind (< 50 km/h)', value: 'moderate', score: 15, desc: 'Dust raised, flags flap' }
      ],
      default: 'extreme'
    },
    {
      id: 'coastal',
      label: 'Coastal Proximity',
      description: 'How close is your location to the sea or open coast?',
      type: 'choice',
      options: [
        { label: 'Oceanfront / Under 1 km', value: 'oceanfront', score: 90, desc: 'Direct exposure to storm surge & waves' },
        { label: '1 to 5 km from Coast', value: 'near_coast', score: 65, desc: 'Vulnerable to surge estuaries & gale winds' },
        { label: 'Inland (> 5 km)', value: 'inland', score: 25, desc: 'Buffer against maritime surge' }
      ],
      default: 'oceanfront'
    },
    {
      id: 'rainfall',
      label: 'Associated Rainfall',
      description: 'Is torrential rain accompanying the storm?',
      type: 'choice',
      options: [
        { label: 'Torrential Squalls & Whiteout', value: 'torrential', score: 85, desc: 'Concurrent flash flooding risk' },
        { label: 'Intermittent Heavy Showers', value: 'heavy', score: 55, desc: 'Significant localized pooling' },
        { label: 'Wind-dominated / Light Rain', value: 'light', score: 25, desc: 'Primarily a wind and projectile threat' }
      ],
      default: 'torrential'
    },
    {
      id: 'powerStatus',
      label: 'Power & Infrastructure Status',
      description: 'Are power lines or utilities failing nearby?',
      type: 'choice',
      options: [
        { label: 'Power Lines Down / Transformer Sparks', value: 'lines_down', score: 85, desc: 'Immediate electrocution hazard' },
        { label: 'Power Outage Across District', value: 'blackout', score: 50, desc: 'Pumps & traffic lights non-functional' },
        { label: 'Normal Power Grid', value: 'normal', score: 10, desc: 'Utilities intact currently' }
      ],
      default: 'lines_down'
    }
  ],

  cyclone: [
    {
      id: 'windSpeed',
      label: 'Cyclone Wind Category',
      description: 'What is the estimated category or wind velocity?',
      type: 'choice',
      options: [
        { label: 'Category 4–5 Super Cyclone (> 180 km/h)', value: 'cat4_5', score: 98, desc: 'Catastrophic structural destruction' },
        { label: 'Category 2–3 Severe Cyclone (120–180 km/h)', value: 'cat2_3', score: 80, desc: 'Extensive roof & tree destruction' },
        { label: 'Category 1 Tropical Storm (90–120 km/h)', value: 'cat1', score: 50, desc: 'Dangerous flying debris & surges' }
      ],
      default: 'cat4_5'
    },
    {
      id: 'stormSurge',
      label: 'Predicted Storm Surge',
      description: 'What is the oceanic surge level expected in your zone?',
      type: 'choice',
      options: [
        { label: 'High Surge (> 3 meters)', value: 'high_surge', score: 95, desc: 'Overtopping sea walls, rapid inundation' },
        { label: 'Moderate Surge (1 to 3 meters)', value: 'mod_surge', score: 65, desc: 'Harbor roads submerged' },
        { label: 'Low / Negligible Surge (< 1 meter)', value: 'low_surge', score: 20, desc: 'Protected or high elevation' }
      ],
      default: 'high_surge'
    },
    {
      id: 'coastal',
      label: 'Distance to Shoreline',
      description: 'How far are you from the coastal tidal boundary?',
      type: 'choice',
      options: [
        { label: 'Within 1 km of Ocean', value: 'coast_1km', score: 90, desc: 'Mandatory evacuation buffer zone' },
        { label: '1 to 5 km Inland', value: 'coast_5km', score: 60, desc: 'High wind & surge backflow danger' },
        { label: 'Far Inland (> 5 km)', value: 'inland', score: 25, desc: 'Wind & localized rain hazard' }
      ],
      default: 'coast_1km'
    },
    {
      id: 'shelterQuality',
      label: 'Your Current Shelter Quality',
      description: 'Can your current building withstand cyclone winds?',
      type: 'choice',
      options: [
        { label: 'Reinforced Concrete with Storm Shutters', value: 'strong', score: 20, desc: 'Engineered cyclone refuge' },
        { label: 'Standard Brick / Glass Windows', value: 'standard', score: 65, desc: 'Glass breach risk from flying projectiles' },
        { label: 'Tin Roof / Temporary / Non-engineered', value: 'flimsy', score: 98, desc: 'Severe danger of total roof loss' }
      ],
      default: 'standard'
    }
  ],

  extreme_heat: [
    {
      id: 'temperature',
      label: 'Current Peak Temperature',
      description: 'What is the ambient heat index in your location?',
      type: 'choice',
      options: [
        { label: 'Dangerous (> 43°C / 110°F)', value: 'extreme', score: 95, desc: 'Heat stroke risk within minutes of exertion' },
        { label: 'Very Hot (39°C – 43°C)', value: 'very_hot', score: 75, desc: 'Severe thermal load, dehydration risk' },
        { label: 'Hot (35°C – 38°C)', value: 'hot', score: 45, desc: 'Fatigue and heat cramps possible' },
        { label: 'Moderate (< 35°C)', value: 'moderate', score: 20, desc: 'Manageable with normal hydration' }
      ],
      default: 'extreme'
    },
    {
      id: 'duration',
      label: 'Heatwave Duration',
      description: 'How many consecutive days has severe heat persisted?',
      type: 'choice',
      options: [
        { label: '4+ Consecutive Days', value: 'prolonged', score: 85, desc: 'Buildings trap nighttime heat; cumulative fatigue' },
        { label: '2 to 3 Days', value: 'few_days', score: 60, desc: 'Infrastructure and grid under thermal load' },
        { label: 'First Day of Spike', value: 'first_day', score: 30, desc: 'Onset of heatwave' }
      ],
      default: 'prolonged'
    },
    {
      id: 'acAccess',
      label: 'Air Conditioning / Cooling Access',
      description: 'Do you have functioning air conditioning?',
      type: 'choice',
      options: [
        { label: 'No AC / Fans Only or Power Outage', value: 'no_ac', score: 90, desc: 'Indoor air approaches ambient temperature' },
        { label: 'Limited Cooling (One Room / Partial)', value: 'partial_ac', score: 45, desc: 'Temporary respite area available' },
        { label: 'Full Reliable Air Conditioning', value: 'full_ac', score: 15, desc: 'Indoor environment well controlled' }
      ],
      default: 'no_ac'
    },
    {
      id: 'vulnerable',
      label: 'Vulnerable People in Household',
      description: 'Are there elderly, infants, or persons with chronic illness present?',
      type: 'choice',
      options: [
        { label: 'Yes (Elderly, Infants, Chronic Conditions)', value: 'yes_vuln', score: 85, desc: 'High risk of heat exhaustion and organ stress' },
        { label: 'No (Healthy Adults Only)', value: 'no_vuln', score: 20, desc: 'Standard physiological heat tolerance' }
      ],
      default: 'yes_vuln'
    }
  ],

  other: [
    {
      id: 'proximity',
      label: 'Proximity to Incident',
      description: 'How close are you to the hazard or disturbance?',
      type: 'choice',
      options: [
        { label: 'Immediate Proximity (< 500m)', value: 'close', score: 90, desc: 'Within direct blast, spill, or danger radius' },
        { label: 'Nearby (500m – 3km)', value: 'nearby', score: 55, desc: 'Advisory zone, perimeter active' },
        { label: 'More than 3 km away', value: 'far', score: 20, desc: 'Buffer zone' }
      ],
      default: 'close'
    },
    {
      id: 'intensity',
      label: 'Apparent Hazard Severity',
      description: 'What is the immediate impact on your surroundings?',
      type: 'choice',
      options: [
        { label: 'Severe / Evacuations Ongoing', value: 'severe', score: 90, desc: 'Civil sirens sounding, emergency vehicles' },
        { label: 'Moderate / Caution Advised', value: 'moderate', score: 50, desc: 'Local disruptions, warnings issued' },
        { label: 'Minor / Developing Situation', value: 'minor', score: 25, desc: 'Initial report, low immediate impact' }
      ],
      default: 'severe'
    },
    {
      id: 'mobility',
      label: 'Evacuation Capability',
      description: 'Can you move or evacuate easily if advised?',
      type: 'choice',
      options: [
        { label: 'Limited Mobility / Trapped / No Vehicle', value: 'limited', score: 85, desc: 'May require emergency assistance' },
        { label: 'Mobile with Vehicle or Transit Access', value: 'mobile', score: 25, desc: 'Can self-evacuate along designated routes' }
      ],
      default: 'limited'
    }
  ]
};

// Safe shelters & hospitals by location zone
export const SAFE_RESOURCES_DATA = [
  {
    id: 'res-1',
    name: 'North Ridge Civic Auditorium (Shelter Alpha)',
    type: 'shelter',
    distance: '1.2 km',
    travelTime: '6 mins walk / 2 mins car',
    status: 'Open',
    capacity: '1,080 / 2,500 spaces available',
    elevation: '85m (High Ground, Flood Safe)',
    amenities: ['Emergency Medical Station', 'Backup Diesel Power', 'Hot Meals & Water', 'Pet Friendly'],
    recommendedDirection: 'Head North-East toward North Ridge Viaduct',
    lat: 37.784,
    lng: -122.408
  },
  {
    id: 'res-2',
    name: 'Metro General Hospital',
    type: 'hospital',
    distance: '2.8 km',
    travelTime: '12 mins transit',
    status: 'Available',
    capacity: 'Emergency Trauma Unit Active',
    elevation: '42m (Seismic Reinforced)',
    amenities: ['24/7 Trauma Care', 'ICU Beds Available', 'Oxygen & First Aid', 'Helipad'],
    recommendedDirection: 'Access via Central Parkway (Avoid Basin Underpasses)',
    lat: 37.772,
    lng: -122.421
  },
  {
    id: 'res-3',
    name: 'Highland Community Center (Emergency Point C)',
    type: 'emergency_point',
    distance: '3.4 km',
    travelTime: '15 mins transit',
    status: 'Open',
    capacity: 'Supply Intake & Evacuation Staging',
    elevation: '110m (Highland Sanctuary)',
    amenities: ['Clean Bottled Water', 'Satellite Phone Link', 'Family Reunification Desk'],
    recommendedDirection: 'Follow Highland Way north toward Sector 4',
    lat: 37.795,
    lng: -122.395
  }
];

// Master Risk Calculation Engine
export function calculateRisk(disasterId, location, answers = {}) {
  const questions = DISASTER_QUESTIONS[disasterId] || DISASTER_QUESTIONS.flood;
  let totalScore = 0;
  let maxPossible = 0;
  const driverExplanations = [];

  questions.forEach(q => {
    const selectedVal = answers[q.id] || q.default;
    const selectedOpt = q.options.find(o => o.value === selectedVal) || q.options[0];
    const score = selectedOpt.score;

    totalScore += score;
    maxPossible += 100;

    // Identify significant risk drivers
    if (score >= 60) {
      driverExplanations.push({
        label: q.label,
        detail: selectedOpt.label,
        severity: score >= 80 ? 'critical' : 'high',
        text: `${q.label}: ${selectedOpt.label} (${selectedOpt.desc})`
      });
    }
  });

  // Calculate normalized 0-100 score
  let rawScore = Math.round((totalScore / maxPossible) * 100);
  
  // Baseline adjust for disaster type inherent severity
  const score = Math.max(12, Math.min(96, rawScore));

  let riskLevel = 'LOW';
  let badgeColor = '#22c55e'; // Green
  let badgeBg = 'rgba(34, 197, 94, 0.15)';
  let levelDescription = 'Minimal immediate threat detected. Exercise general safety awareness.';

  if (score >= 81) {
    riskLevel = 'SEVERE';
    badgeColor = '#ef4444'; // Red
    badgeBg = 'rgba(239, 68, 68, 0.18)';
    levelDescription = 'Critical danger to life and property. Immediate protective action required.';
  } else if (score >= 66) {
    riskLevel = 'HIGH';
    badgeColor = '#f97316'; // Orange
    badgeBg = 'rgba(249, 115, 22, 0.18)';
    levelDescription = 'Substantial threat developing rapidly. Prepare for evacuation and take cover.';
  } else if (score >= 36) {
    riskLevel = 'MODERATE';
    badgeColor = '#eab308'; // Amber/Yellow
    badgeBg = 'rgba(234, 179, 8, 0.18)';
    levelDescription = 'Elevated conditions observed. Stay alert and monitor local alerts closely.';
  }

  // Generate impact statement
  const impact = generateImpactSummary(disasterId, location, score, riskLevel);

  // Generate actions: Do now, Avoid, Monitor
  const guidance = generateActionGuidance(disasterId, location, score);

  // Generate What-if default parameters
  const whatIf = generateWhatIfConfig(disasterId, score);

  return {
    disasterId,
    disasterName: DISASTERS.find(d => d.id === disasterId)?.name || 'Disaster',
    location: location || 'Selected Area',
    score,
    riskLevel,
    badgeColor,
    badgeBg,
    levelDescription,
    driverExplanations,
    impact,
    guidance,
    whatIf,
    nearbyResources: SAFE_RESOURCES_DATA
  };
}

function generateImpactSummary(disasterId, location, score, level) {
  const loc = location || 'your selected location';
  
  switch (disasterId) {
    case 'flood':
      return `Flooding may affect low-lying roads and ground-floor properties around ${loc}. Water accumulation of 0.4m to 1.8m is likely along drainage corridors and valley basins.`;
    case 'heavy_rain':
      return `Extreme urban runoff will overpower storm sewers around ${loc}, causing rapid water ponding in basements, underpasses, and arterial intersections.`;
    case 'fire':
      return `Radiant heat and wind-driven embers threaten outdoor structures near ${loc}. Hazardous smoke will drastically reduce visibility and air quality within minutes.`;
    case 'earthquake':
      return `Ground accelerations may cause structural cracking or localized debris fall in unreinforced buildings around ${loc}. Strong aftershocks remain a significant secondary risk.`;
    case 'storm':
      return `Destructive wind gusts may topple trees, down electrical power lines, and tear roof materials across ${loc}. Flying projectile hazards exist in exposed areas.`;
    case 'cyclone':
      return `Severe maritime surge and destructive winds will impact coastal structures around ${loc}. Coastal roads risk complete inundation and power grids may remain offline for days.`;
    case 'extreme_heat':
      return `Sustained dangerous heat index in ${loc} creates immediate dehydration, heat exhaustion, and cardiovascular stress, particularly without access to air-conditioned refuge.`;
    default:
      return `Hazardous environmental conditions detected around ${loc}. Direct physical disruption to local travel, infrastructure, and utilities is probable.`;
  }
}

function generateActionGuidance(disasterId, location, score) {
  switch (disasterId) {
    case 'flood':
      return {
        doNow: [
          'Move immediately to higher ground or upper floor of a sturdy building.',
          'Avoid walking or driving through floodwater (just 6 inches can knock an adult down; 12 inches can sweep away a car).',
          'Switch off main electricity breaker and gas valves if you can do so safely without standing in water.',
          'Keep your mobile phone in battery-saver mode and prepare critical documents in waterproof bags.'
        ],
        avoid: [
          'Low-lying roads, underpasses, culverts, and canal banks.',
          'Submerged electrical lines, transformers, or murky standing water.',
          'Underground basements and subterranean parking structures.'
        ],
        monitor: [
          'Water level markers along nearby streets and storm channels.',
          'Official emergency siren broadcasts and civil protection alerts.',
          'Rainfall forecast and upstream reservoir spillway warnings.'
        ]
      };

    case 'heavy_rain':
      return {
        doNow: [
          'Relocate essential electronics and documents away from ground floor and basement areas.',
          'Inspect exterior drain grates only if safe and free from swift water flow.',
          'Charge power banks and prepare flashlights (avoid open candles if gas leaks occur).',
          'Stay indoors away from exterior windows and waterlogged basement walls.'
        ],
        avoid: [
          'Basement rooms and subterranean parking facilities.',
          'Driving through flooded dips or depressed highway viaducts.',
          'Touching wet electrical appliances or switchboards.'
        ],
        monitor: [
          'Municipal stormwater drainage advisories.',
          'Localized flash flood warnings from national weather services.',
          'Water seepage around foundation walls.'
        ]
      };

    case 'fire':
      return {
        doNow: [
          'Prepare for immediate evacuation; load pets, emergency grab-bag, and prescriptions into vehicle.',
          'Wear an N95 mask or damp cloth covering nose and mouth to block toxic particulate smoke.',
          'Close all windows, exterior doors, and fireplace dampers to prevent ember drafts.',
          'Turn on headlights and drive cautiously away from the smoke plume toward designated highway.'
        ],
        avoid: [
          'Narrow canyon roads, heavily wooded dead-ends, or roads surrounded by dry brush.',
          'Attempting to defend combustible structures with garden hoses in high winds.',
          'Leaving pets or vulnerable dependents behind.'
        ],
        monitor: [
          'Local fire department evacuation zones and perimeter maps.',
          'Sudden changes in wind direction or speed.',
          'Air quality index (AQI) and dense smoke movement.'
        ]
      };

    case 'earthquake':
      return {
        doNow: [
          'DROP, COVER, and HOLD ON under sturdy furniture or against interior structural walls.',
          'Protect head and neck from falling light fixtures, glass, and bookshelves.',
          'Evacuate damaged masonry structures immediately once ground shaking ceases.',
          'Check for gas odors: shut exterior gas valve if you smell rotten eggs or hear hissing.'
        ],
        avoid: [
          'NEVER use elevators under any circumstances.',
          'Standing near glass storefronts, exterior brick parapets, or chimneys.',
          'Striking matches, lighters, or using open flames until gas lines are declared clear.'
        ],
        monitor: [
          'Seismic aftershock advisories on battery-powered or mobile radio.',
          'Bridge, overpass, and road integrity warnings before attempting travel.',
          'Local emergency response channels for community staging grounds.'
        ]
      };

    case 'storm':
    case 'cyclone':
      return {
        doNow: [
          'Shelter in an interior room on the lowest floor without windows (e.g., hallway or bathroom).',
          'Secure or bring indoors all loose patio furniture, trash bins, and metal sheeting.',
          'Fill bathtubs and clean containers with fresh potable water in case mains fail.',
          'If in a mobile home or tin-roof building, evacuate to a sturdy designated concrete shelter.'
        ],
        avoid: [
          'Windows, skylights, and glass doors vulnerable to wind-borne projectile debris.',
          'Going outside during the temporary calm of the storm eye—backside winds resume violently.',
          'Coastal jetties, beaches, or sea walls to watch waves.'
        ],
        monitor: [
          'Barometric pressure drop and Doppler radar wind speed tracking.',
          'Coastal storm surge tide timing and flood wall water levels.',
          'Civil emergency radio broadcast on battery-powered receiver.'
        ]
      };

    case 'extreme_heat':
      return {
        doNow: [
          'Move to an air-conditioned room or municipal cooling shelter immediately.',
          'Drink plenty of cool water or electrolyte solutions even before feeling thirsty.',
          'Apply cool wet cloths to the neck, armpits, and forehead if overheating occurs.',
          'Check frequently on elderly neighbors, young children, and pets.'
        ],
        avoid: [
          'Direct strenuous outdoor physical activity between 10:00 AM and 6:00 PM.',
          'Leaving children, elderly persons, or pets unattended in parked vehicles (even for 2 minutes).',
          'Caffeinated, sugary, or alcoholic drinks that accelerate dehydration.'
        ],
        monitor: [
          'Symptoms of heat exhaustion: heavy sweating, cold pale skin, dizziness, or nausea.',
          'Symptoms of heat stroke: hot red dry skin, confusion, fainting (Call 911/112 immediately).',
          'Peak afternoon heat advisories.'
        ]
      };

    default:
      return {
        doNow: [
          'Stay calm, gather family members, and assess immediate surrounding hazards.',
          'Prepare emergency essentials: water, non-perishable food, flashlight, and first aid kit.',
          'Follow instructions from local emergency authorities and first responders.',
          'Maintain situational awareness and keep your mobile phone charged.'
        ],
        avoid: [
          'Spreading unverified rumors on social media.',
          'Traveling into restricted emergency cordons or hazardous terrain.',
          'Overloading phone networks with non-emergency voice calls (use SMS).'
        ],
        monitor: [
          'Official civil defense radio frequencies.',
          'Emergency broadcasts and trusted local news updates.'
        ]
      };
  }
}

function generateWhatIfConfig(disasterId, baseScore) {
  switch (disasterId) {
    case 'flood':
      return {
        parameter: 'Rainfall Volume',
        unit: 'mm',
        baseValue: 100,
        simulatedValue: 180,
        minValue: 40,
        maxValue: 250,
        step: 10,
        calculateSimulatedRisk: (val) => {
          const delta = (val - 100) * 0.35;
          return Math.max(15, Math.min(99, Math.round(baseScore + delta)));
        },
        explanation: 'Under this simulated scenario, flood risk increases because rainfall and water exposure exceed local canal and drainage absorption limits.'
      };

    case 'heavy_rain':
      return {
        parameter: 'Hourly Rain Intensity',
        unit: 'mm/hr',
        baseValue: 40,
        simulatedValue: 90,
        minValue: 10,
        maxValue: 120,
        step: 5,
        calculateSimulatedRisk: (val) => {
          const delta = (val - 40) * 0.45;
          return Math.max(15, Math.min(99, Math.round(baseScore + delta)));
        },
        explanation: 'Under this simulated scenario, storm runoff accelerates waterlogging across streets and basements.'
      };

    case 'fire':
      return {
        parameter: 'Wind Gust Velocity',
        unit: 'km/h',
        baseValue: 25,
        simulatedValue: 65,
        minValue: 10,
        maxValue: 100,
        step: 5,
        calculateSimulatedRisk: (val) => {
          const delta = (val - 25) * 0.55;
          return Math.max(18, Math.min(99, Math.round(baseScore + delta)));
        },
        explanation: 'Under this simulated scenario, high wind gusts propel ember spotting up to 1.5 km ahead of the fire front, reducing evacuation reaction time.'
      };

    case 'earthquake':
      return {
        parameter: 'Aftershock Magnitude',
        unit: 'Richter',
        baseValue: 5.2,
        simulatedValue: 6.8,
        minValue: 4.0,
        maxValue: 8.0,
        step: 0.1,
        calculateSimulatedRisk: (val) => {
          const delta = (val - 5.2) * 18;
          return Math.max(20, Math.min(99, Math.round(baseScore + delta)));
        },
        explanation: 'Under this simulated scenario, strong ground acceleration causes critical strain on already stressed masonry buildings.'
      };

    case 'storm':
    case 'cyclone':
      return {
        parameter: 'Sustained Wind Speed',
        unit: 'km/h',
        baseValue: 90,
        simulatedValue: 165,
        minValue: 50,
        maxValue: 220,
        step: 5,
        calculateSimulatedRisk: (val) => {
          const delta = (val - 90) * 0.38;
          return Math.max(20, Math.min(99, Math.round(baseScore + delta)));
        },
        explanation: 'Under this simulated scenario, hurricane-force wind dynamics double aerodynamic roof lift and shatter unsecured glazing.'
      };

    case 'extreme_heat':
      return {
        parameter: 'Peak Temperature',
        unit: '°C',
        baseValue: 37,
        simulatedValue: 45,
        minValue: 30,
        maxValue: 50,
        step: 1,
        calculateSimulatedRisk: (val) => {
          const delta = (val - 37) * 4.2;
          return Math.max(15, Math.min(99, Math.round(baseScore + delta)));
        },
        explanation: 'Under this simulated scenario, extreme thermal stress exceeds the body’s natural evaporative cooling capacity, raising heat stroke danger.'
      };

    default:
      return {
        parameter: 'Hazard Intensity Multiplier',
        unit: '%',
        baseValue: 50,
        simulatedValue: 85,
        minValue: 20,
        maxValue: 100,
        step: 5,
        calculateSimulatedRisk: (val) => {
          const delta = (val - 50) * 0.6;
          return Math.max(15, Math.min(99, Math.round(baseScore + delta)));
        },
        explanation: 'Under this simulated scenario, escalating environmental pressure reduces containment margins.'
      };
  }
}

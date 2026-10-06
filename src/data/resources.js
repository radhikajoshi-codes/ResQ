// ResQ Emergency Response Resources: Shelters, Hospitals, Rescue Teams, & Citizen Checklist

export const SHELTERS = [
  {
    id: 'sh-1',
    name: 'North Ridge Civic Auditorium (Shelter Alpha)',
    shortName: 'Shelter Alpha',
    zone: 'Zone D',
    distance: '3.4 km',
    travelTime: '12 mins',
    capacity: 2500,
    occupied: 1420,
    availableSpaces: 1080,
    status: 'OPEN — HIGH CAPACITY',
    badgeColor: '#22c55e',
    elevation: '85m (Flood Safe)',
    amenities: ['Emergency Medical Station', 'Backup Diesel Generator', 'Pet Friendly', 'Hot Meals', 'Satellite Comms'],
    coords: { x: 440, y: 75 }
  },
  {
    id: 'sh-2',
    name: 'High School Sports Complex (Shelter Bravo)',
    shortName: 'Shelter Bravo',
    zone: 'Zone B',
    distance: '1.8 km',
    travelTime: '7 mins',
    capacity: 1200,
    occupied: 1080,
    availableSpaces: 120,
    status: 'NEAR CAPACITY (90%)',
    badgeColor: '#f97316',
    elevation: '24m (Elevated Mound)',
    amenities: ['First Aid Tent', 'Water Filtration', 'Cot Beds'],
    coords: { x: 590, y: 190 }
  },
  {
    id: 'sh-3',
    name: 'Central Convention Center (Shelter Charlie)',
    shortName: 'Shelter Charlie',
    zone: 'Zone B',
    distance: '2.9 km',
    travelTime: '14 mins',
    capacity: 4000,
    occupied: 1850,
    availableSpaces: 2150,
    status: 'OPEN — ACTIVE RECEPTION',
    badgeColor: '#22c55e',
    elevation: '32m (Multi-level)',
    amenities: ['Full Field Hospital', 'Solar Microgrid', 'Child Care', 'Food Distribution'],
    coords: { x: 630, y: 280 }
  },
  {
    id: 'sh-4',
    name: 'Highland Community Center (Shelter Delta)',
    shortName: 'Shelter Delta',
    zone: 'Zone D',
    distance: '5.2 km',
    travelTime: '18 mins',
    capacity: 1500,
    occupied: 420,
    availableSpaces: 1080,
    status: 'OPEN — RESERVE STAGING',
    badgeColor: '#22c55e',
    elevation: '110m (Highland)',
    amenities: ['Helipad Access', 'Emergency Provisions', 'Cots'],
    coords: { x: 670, y: 65 }
  }
];

export const HOSPITALS = [
  {
    id: 'hosp-1',
    name: 'St. Mary Trauma Medical Center',
    shortName: 'St. Mary Trauma',
    zone: 'Zone D',
    distance: '2.8 km',
    emergencyCapacity: '92% Occupied',
    icuBedsAvailable: 14,
    traumaLevel: 'Level 1 Trauma',
    status: 'OPERATIONAL — SURGE PROTOCOL',
    badgeColor: '#22c55e',
    generatorStatus: 'ONLINE (100%)',
    coords: { x: 380, y: 95 }
  },
  {
    id: 'hosp-2',
    name: 'Metro General Hospital',
    shortName: 'Metro General',
    zone: 'Zone B',
    distance: '1.2 km',
    emergencyCapacity: '84% Occupied',
    icuBedsAvailable: 8,
    traumaLevel: 'Level 2 Trauma',
    status: 'OPERATIONAL — FLOOD DEFENSES UP',
    badgeColor: '#38bdf8',
    generatorStatus: 'ONLINE (100%)',
    coords: { x: 480, y: 220 }
  },
  {
    id: 'hosp-3',
    name: 'Harbor Coastal Memorial Clinic',
    shortName: 'Harbor Clinic',
    zone: 'Zone C',
    distance: '4.1 km',
    emergencyCapacity: '65% Occupied',
    icuBedsAvailable: 4,
    traumaLevel: 'Level 3 Urgent Care',
    status: 'ADVISORY — RESTRICTED ADMISSION',
    badgeColor: '#f97316',
    generatorStatus: 'BACKUP ACTIVE',
    coords: { x: 740, y: 310 }
  }
];

export const RESCUE_TEAMS = [
  {
    id: 'rt-1',
    callsign: 'BRAVO-3',
    name: 'Amphibious Swiftwater Rescue 3',
    type: 'Swiftwater Rescue / Zodiak',
    assignedZone: 'Zone A (Sector 2)',
    currentLocation: 'Lower Delta Levee Marker 18',
    personnel: 8,
    crafts: 3,
    status: 'DEPLOYED — ACTIVE EXTRACTION',
    badgeColor: '#ef4444',
    etaNextMission: 'Immediate',
    coords: { x: 250, y: 360 }
  },
  {
    id: 'rt-2',
    callsign: 'ALPHA-1',
    name: 'Heavy Urban Search & Rescue (USAR)',
    type: 'Structural Collapse / Extraction',
    assignedZone: 'Zone B (Central Commercial)',
    currentLocation: 'Metro Viaduct Station 4',
    personnel: 16,
    crafts: 4,
    status: 'EN ROUTE — FLOOD BARRIER SUPPORT',
    badgeColor: '#f97316',
    etaNextMission: '8 mins',
    coords: { x: 490, y: 270 }
  },
  {
    id: 'rt-3',
    callsign: 'EAGLE-AIR',
    name: 'Air National Guard SAR Helicopter 1',
    type: 'Aerial Hoist / Thermal Recon',
    assignedZone: 'Zone A / Basin',
    currentLocation: 'Airborne over Delta Corridor',
    personnel: 5,
    crafts: 1,
    status: 'AIRBORNE — ROOFTOP HOISTS',
    badgeColor: '#ef4444',
    etaNextMission: 'Active Patrol',
    coords: { x: 320, y: 300 }
  },
  {
    id: 'rt-4',
    callsign: 'TACTICAL-4',
    name: 'High-Water Transport Unit 4',
    type: 'Tactical LMTV Transport 6x6',
    assignedZone: 'Zone C (Port Gateway)',
    currentLocation: 'Coastal Road Gate 2',
    personnel: 10,
    crafts: 5,
    status: 'DEPLOYED — LOGISTICS CORRIDOR',
    badgeColor: '#38bdf8',
    etaNextMission: '15 mins',
    coords: { x: 770, y: 410 }
  },
  {
    id: 'rt-5',
    callsign: 'STAGING-LEAD',
    name: 'Civil Defense Command Unit Omega',
    type: 'Incident Command Post Mobile',
    assignedZone: 'Zone D (North Ridge)',
    currentLocation: 'Civic Auditorium Staging Plaza',
    personnel: 24,
    crafts: 8,
    status: 'COMMAND BASE — ACTIVE TRIAGE',
    badgeColor: '#22c55e',
    etaNextMission: 'Stationary ICP',
    coords: { x: 480, y: 70 }
  }
];

export const EVACUATION_ROUTES = [
  {
    id: 'evac-1',
    name: 'Corridor Alpha (Elevated Ridgeway Viaduct)',
    fromZone: 'Zone A',
    toShelter: 'Shelter Alpha (North Ridge)',
    status: 'PRIMARY SAFE ROUTE — CLEAR',
    badgeColor: '#22c55e',
    travelTime: '15 mins',
    trafficSpeed: '42 km/h',
    isSafe: true,
    // SVG Polyline coords on tactical grid
    path: '260,340 340,240 410,160 440,75'
  },
  {
    id: 'evac-2',
    name: 'Corridor Bravo (North Central Expressway)',
    fromZone: 'Zone B',
    toShelter: 'Shelter Charlie (Convention Center)',
    status: 'MODERATE CONGESTION',
    badgeColor: '#f97316',
    travelTime: '22 mins',
    trafficSpeed: '24 km/h',
    isSafe: true,
    path: '520,250 580,230 630,280'
  },
  {
    id: 'evac-3',
    name: 'Corridor Charlie (Riverfront Parkway)',
    fromZone: 'Zone A',
    toShelter: 'Shelter Bravo',
    status: 'IMPASSIBLE — FLOODWATER BREACH',
    badgeColor: '#ef4444',
    travelTime: 'BLOCKED',
    trafficSpeed: '0 km/h',
    isSafe: false,
    path: '260,340 370,330 450,290 590,190'
  }
];

export const EMERGENCY_CONTACTS = [
  { name: 'National Emergency Dispatch', number: '911 / 112', type: 'Instant SOS', actionText: 'Call Dispatch' },
  { name: 'Disaster Operations Command', number: '+1 (800) 555-RESQ', type: 'Toll-Free Hotline', actionText: 'Direct Line' },
  { name: 'Amphibious Evacuation Coordination', number: '+1 (800) 555-BOAT', type: 'Water Rescue Dispatch', actionText: 'Request Boat' },
  { name: 'Medical Emergency Triage', number: '+1 (800) 555-TRAUMA', type: 'Trauma & Ambulance', actionText: 'Medical SOS' }
];

export const CITIZEN_CHECKLIST_ITEMS = [
  { id: 'c1', label: '1 Gallon drinking water per person per day (3-day supply minimum)', category: 'hydration', defaultChecked: true },
  { id: 'c2', label: 'High-calorie non-perishable food (granola, canned goods, ready-to-eat)', category: 'nutrition', defaultChecked: true },
  { id: 'c3', label: 'Waterproof pouch with government ID, property deeds, prescriptions', category: 'documents', defaultChecked: false },
  { id: 'c4', label: 'Heavy-duty LED flashlight + extra lithium batteries', category: 'tools', defaultChecked: true },
  { id: 'c5', label: 'Fully charged 20,000mAh mobile power bank & charging cables', category: 'power', defaultChecked: false },
  { id: 'c6', label: 'First aid trauma kit with tourniquet, antiseptics, sterile gauze', category: 'medical', defaultChecked: false },
  { id: 'c7', label: '7-day personal prescription medications supply', category: 'medical', defaultChecked: true },
  { id: 'c8', label: 'Sturdy waterproof boots and thermal rain jacket', category: 'clothing', defaultChecked: false },
  { id: 'c9', label: 'Emergency high-decibel whistle for signaling search teams', category: 'safety', defaultChecked: false }
];

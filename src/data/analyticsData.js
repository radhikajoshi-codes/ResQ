// ResQ Historical Telemetry & Operational Analytics

export const RISK_TREND_24H = [
  { time: '00:00', flood: 34, earthquake: 22, wildfire: 45, storm: 40, composite: 35 },
  { time: '03:00', flood: 42, earthquake: 21, wildfire: 48, storm: 48, composite: 41 },
  { time: '06:00', flood: 55, earthquake: 24, wildfire: 54, storm: 62, composite: 52 },
  { time: '09:00', flood: 68, earthquake: 28, wildfire: 61, storm: 74, composite: 66 },
  { time: '12:00', flood: 79, earthquake: 31, wildfire: 70, storm: 81, composite: 75 },
  { time: '15:00', flood: 85, earthquake: 29, wildfire: 76, storm: 86, composite: 83 },
  { time: '18:00', flood: 87, earthquake: 28, wildfire: 78, storm: 89, composite: 87 } // CURRENT
];

export const POPULATION_BY_ZONE = [
  { zone: 'Zone A', total: 14200, atRisk: 14200, evacuated: 6400, percentAtRisk: 100, severity: 'CRITICAL', color: '#ef4444' },
  { zone: 'Zone B', total: 19800, atRisk: 13500, evacuated: 4100, percentAtRisk: 68, severity: 'HIGH', color: '#f97316' },
  { zone: 'Zone C', total: 8600, atRisk: 3800, evacuated: 1200, percentAtRisk: 44, severity: 'MEDIUM', color: '#eab308' },
  { zone: 'Zone D', total: 12400, atRisk: 400, evacuated: 0, percentAtRisk: 3, severity: 'LOW', color: '#22c55e' }
];

export const ALERT_SEVERITY_BREAKDOWN = [
  { level: 'Critical', count: 3, percent: 38, color: '#ef4444' },
  { level: 'High', count: 3, percent: 38, color: '#f97316' },
  { level: 'Medium', count: 2, percent: 25, color: '#eab308' },
  { level: 'Low / Nominal', count: 1, percent: 12, color: '#22c55e' }
];

export const RESPONSE_ACTIVITY_METRICS = {
  teamsDeployed: 18,
  sheltersActivated: 4,
  alertsIssuedToday: 34,
  areasAssessed: 12,
  resolvedAlerts: 17,
  airReconSorties: 6,
  patientsTriageProcessed: 142,
  sandbagsDispatched: 8500,
  emergencyRadioBroadcasts: 28
};

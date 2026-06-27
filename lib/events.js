/**
 * Static DMV event zone previews for the Events Intelligence MVP.
 * Not live data — see docs/DATA_SOURCES.md for planned public sources.
 */

export const DMV_EVENT_ZONES = [
  {
    id: "dc-convention",
    zone: "Downtown DC / Convention Center",
    activity: "Convention & conference weekend (example)",
    driverImpact:
      "Higher curbside demand near Mt Vernon Sq, Shaw, and downtown hotels. Street closures may slow cross-town trips.",
    suggestedAction:
      "Stage near convention hotels 30–45 minutes before session breaks. Avoid I-395 exits if nearby roadwork is posted.",
    impactLevel: "high"
  },
  {
    id: "capital-one-arena",
    zone: "Capital One Arena",
    activity: "Capitals / Wizards game night (example)",
    driverImpact:
      "Surge-prone area around Gallery Place and Chinatown from pre-game through 45 minutes after the final buzzer.",
    suggestedAction:
      "Position on 7th St corridor before puck drop. Expect heavy pedestrian traffic — plan patient pickup loops.",
    impactLevel: "high"
  },
  {
    id: "nationals-park",
    zone: "Nationals Park / Navy Yard",
    activity: "Baseball game + waterfront dining (example)",
    driverImpact:
      "Evening pickups cluster along M St SE and near Navy Yard Metro. Post-game exits can bottleneck South Capitol St.",
    suggestedAction:
      "Arrive before 7th-inning stretch for ride requests. Use side streets off Half St for smoother passenger loads.",
    impactLevel: "medium"
  },
  {
    id: "dca-airport",
    zone: "DCA / Reagan National Airport area",
    activity: "Evening arrival wave (example)",
    driverImpact:
      "Terminal curbs and GW Parkway approaches see more TNC traffic during banked evening arrivals.",
    suggestedAction:
      "Monitor terminal apps for arrival peaks. Allow extra time for National Airport loop and parking garage pickups.",
    impactLevel: "medium"
  },
  {
    id: "nova-corridor",
    zone: "Arlington / Tysons / Northern Virginia corridor",
    activity: "Weekday office + dinner corridor (example)",
    driverImpact:
      "Rosslyn-Ballston and Tysons corridors stay active through commute and evening dining windows.",
    suggestedAction:
      "Work the Orange/Silver line nodes early evening, then shift toward Tysons after 8 PM for late dinner traffic.",
    impactLevel: "low"
  }
];

export function getDmvEventsIntelligence() {
  return {
    zones: DMV_EVENT_ZONES,
    source: "preview",
    attribution: "Static MVP preview — not live event data"
  };
}

function impactLabel(level) {
  if (level === "high") {
    return "High impact";
  }

  if (level === "medium") {
    return "Moderate impact";
  }

  return "Low impact";
}

export { impactLabel };

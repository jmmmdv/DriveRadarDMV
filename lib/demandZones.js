/**
 * Static DMV demand-zone previews for the Demand Zones Intelligence MVP.
 * Not live demand data — see docs/DATA_SOURCES.md for planned sources.
 */

export const DMV_DEMAND_ZONES = [
  {
    id: "downtown-dc",
    zone: "Downtown DC",
    demandSignal: "Weekday evening office + dining corridor (example)",
    bestFor: "Rideshare · Uber Black / SUV · private drivers",
    driverImpact:
      "Steady short trips between K St, Metro Center, and hotel districts. Surges possible after 8 PM on weekdays.",
    suggestedAction:
      "Work Pennsylvania Ave and 14th St nodes after commute hour. Watch for street closures near the White House complex.",
    demandLevel: "high"
  },
  {
    id: "georgetown",
    zone: "Georgetown / Foggy Bottom",
    demandSignal: "University + waterfront dining window (example)",
    bestFor: "Rideshare · delivery · private drivers",
    driverImpact:
      "Narrow streets slow pickups along M St and Wisconsin Ave. Hospital and GWU activity adds midday trips.",
    suggestedAction:
      "Avoid blocking crosswalks on Georgetown cobblestones. Stage near Foggy Bottom Metro for GW hospital runs.",
    demandLevel: "medium"
  },
  {
    id: "navy-yard",
    zone: "Navy Yard / Capitol Riverfront",
    demandSignal: "Game day + waterfront nightlife (example)",
    bestFor: "Rideshare · event-focused drivers",
    driverImpact:
      "Nationals Park and The Wharf cluster evening demand. Post-event exits on M St SE can bottleneck quickly.",
    suggestedAction:
      "Arrive before game start for pre-event drops. Shift toward Navy Yard Metro after final out for ride requests.",
    demandLevel: "high"
  },
  {
    id: "arlington",
    zone: "Arlington / Rosslyn",
    demandSignal: "Commute hub + Pentagon corridor (example)",
    bestFor: "Rideshare · professional drivers · airport connectors",
    driverImpact:
      "Rosslyn-Ballston corridor stays active through evening. Pentagon City adds steady business-travel pickups.",
    suggestedAction:
      "Loop Crystal City and Rosslyn before crossing into DC. Strong for DCA connection trips on weekday evenings.",
    demandLevel: "medium"
  },
  {
    id: "tysons",
    zone: "Tysons / Northern Virginia",
    demandSignal: "Office park + mall evening spillover (example)",
    bestFor: "Rideshare · Uber Black / SUV · delivery",
    driverImpact:
      "Tysons Corner and Route 7 dining strips generate longer suburban trips. Silver Line access shifts pickup patterns.",
    suggestedAction:
      "Focus on Galleria and Tysons II after 6 PM. Allow time for garage exits and Route 123 merge delays.",
    demandLevel: "medium"
  },
  {
    id: "national-harbor",
    zone: "National Harbor / MGM",
    demandSignal: "Weekend casino + convention traffic (example)",
    bestFor: "Private drivers · Uber Black / SUV · rideshare",
    driverImpact:
      "Weekend evenings bring longer trips across the Wilson Bridge. Curbside staging rules are strictly enforced.",
    suggestedAction:
      "Confirm passenger pickup zone before entering the harbor. Weekend nights suit premium vehicle categories best.",
    demandLevel: "low"
  }
];

export function getDmvDemandZonesIntelligence() {
  return {
    zones: DMV_DEMAND_ZONES,
    source: "preview",
    attribution: "Static MVP preview — not live demand prediction"
  };
}

export function demandLevelLabel(level) {
  if (level === "high") {
    return "High demand";
  }

  if (level === "medium") {
    return "Medium demand";
  }

  return "Low demand";
}

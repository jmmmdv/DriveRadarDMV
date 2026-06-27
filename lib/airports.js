/**
 * Static DMV airport previews for the Airport Intelligence MVP.
 * Not live flight data — see docs/DATA_SOURCES.md for planned public sources.
 */

export const DMV_AIRPORTS = [
  {
    id: "dca",
    name: "DCA / Reagan National Airport",
    activitySignal: "Evening banked arrivals (example)",
    driverImpact:
      "Terminal A–E curbs and the GW Parkway see heavier TNC traffic during clustered evening landings. Short trips to downtown stay steady.",
    suggestedAction:
      "Stage near the rideshare lot 20–30 minutes before typical arrival peaks. Watch for National Airport loop delays after 8 PM.",
    impactLevel: "high"
  },
  {
    id: "iad",
    name: "IAD / Dulles International Airport",
    activitySignal: "International arrival window (example)",
    driverImpact:
      "Longer passenger walks from midfield concourses and Silver Line connections can delay curbside pickups. Route 267 toll traffic may add minutes.",
    suggestedAction:
      "Confirm terminal and pickup zone before heading out. Allow extra time on Dulles Access Rd during late-night arrival banks.",
    impactLevel: "medium"
  },
  {
    id: "bwi",
    name: "BWI / Baltimore-Washington International Airport",
    activitySignal: "Southwest-heavy morning departures (example)",
    driverImpact:
      "Morning drop-offs and midday turnarounds keep I-195 and the BWI loop busy. Fewer long-haul pickups than Dulles but steady regional demand.",
    suggestedAction:
      "Focus on early AM drop-off runs and late-morning return pickups. Use cell-phone lot until passenger is curbside-ready.",
    impactLevel: "medium"
  }
];

export function getDmvAirportIntelligence() {
  return {
    airports: DMV_AIRPORTS,
    source: "preview",
    attribution: "Static MVP preview — not live flight data"
  };
}

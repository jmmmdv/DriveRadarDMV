/**
 * Static Daily Driver Briefing for the MVP preview.
 * Synthesizes the intelligence stack into one decision-oriented summary.
 * Future: compose from live weather + static/other modules automatically.
 */

export function getDailyDriverBriefing() {
  const generatedAt = new Date().toISOString();

  return {
    source: "preview",
    attribution: "Static MVP preview — not live financial, safety, or official traffic advice",
    dateLabel: formatBriefingDate(generatedAt),
    overallOutlook:
      "Moderately active evening across the DMV. Downtown DC and Navy Yard show the strongest combined event + demand signals; weather may add minor trip-time friction in scattered showers.",
    bestZonesToWatch: [
      "Downtown DC — office + dining corridor",
      "Navy Yard / Capitol Riverfront — event spillover",
      "Arlington / Rosslyn — commute + DCA connector trips"
    ],
    airportWatch:
      "DCA evening arrival bank is the primary airport opportunity (example). IAD international windows may run longer curbside waits. BWI stays steady for regional turnarounds.",
    weatherCaution:
      "Check the live Weather Intelligence section below for NWS data. In this preview: possible scattered showers may extend trip times and reduce brief demand lulls — allow extra minutes per pickup.",
    eventDemandOpportunity:
      "Capital One Arena game-night pattern and convention-weekend downtown activity (examples) may cluster rides near Gallery Place and Mt Vernon Sq. Premium and private drivers may find stronger evening fares in core DC zones.",
    suggestedStrategy:
      "Open your shift downtown or Navy Yard 60–90 minutes before peak evening demand. Keep DCA on watch for airport runs. Re-check weather before crossing the river into Virginia. Avoid overcommitting to one zone — rotate toward Arlington if downtown slows."
  };
}

function formatBriefingDate(isoString) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "America/New_York"
  }).format(new Date(isoString));
}

export const BRIEFING_ITEMS = [
  { key: "overallOutlook", label: "Overall DMV driving outlook", icon: "◆" },
  { key: "bestZonesToWatch", label: "Best zones to watch", icon: "◎" },
  { key: "airportWatch", label: "Airport watch", icon: "✈" },
  { key: "weatherCaution", label: "Weather caution", icon: "☁" },
  { key: "eventDemandOpportunity", label: "Event / demand opportunity", icon: "◉" },
  { key: "suggestedStrategy", label: "Suggested driver strategy", icon: "→" }
];

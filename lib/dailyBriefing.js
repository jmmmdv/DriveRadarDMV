/**
 * Daily Driver Briefing — composes shift guidance from intelligence modules.
 * Weather caution uses live NWS forecast when available; other sections remain static preview until Phase 1.
 */

import { getDmvWeatherIntelligence } from "./weather";

const STATIC_BRIEFING = {
  overallOutlook:
    "Moderately active period across the DMV. Downtown DC and Navy Yard often show stronger combined event and demand signals in preview models — verify live sections below before your shift.",
  bestZonesToWatch: [
    "Downtown DC — office + dining corridor",
    "Navy Yard / Capitol Riverfront — event spillover",
    "Arlington / Rosslyn — commute + DCA connector trips"
  ],
  airportWatch:
    "DCA evening arrival banks are a common airport opportunity (preview example). IAD international windows may run longer curbside waits. BWI stays steady for regional turnarounds — see Airport Intelligence below.",
  eventDemandOpportunity:
    "Capital One Arena game-night and convention-weekend downtown patterns (preview examples) may cluster rides near Gallery Place and Mt Vernon Sq. Verify Events Intelligence below.",
  suggestedStrategy:
    "Review the briefing and intelligence sections below before your shift. Start with zones that match your driver type, watch DCA if you do airport runs, and re-check weather before crossing the river into Virginia."
};

function formatBriefingDate(isoString) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "America/New_York"
  }).format(new Date(isoString));
}

function formatFetchedAt(isoString) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "America/New_York"
  }).format(new Date(isoString));
}

function composeWeatherCaution(weather) {
  if (!weather || weather.forecastCount === 0) {
    return "Weather demo fallback may be shown — NWS forecast was unavailable when this page loaded. Open Weather Intelligence below or verify conditions at weather.gov before driving.";
  }

  const forecastZones = weather.locations.filter(
    (entry) => entry.sourceStatus === "nws_forecast"
  );
  const highImpact = forecastZones.filter((entry) => entry.impactLevel === "high");
  const dc =
    forecastZones.find((entry) => entry.id === "dc") || forecastZones[0];

  const lines = [
    `NWS forecast loaded for ${weather.forecastCount} DMV zone(s) — not real-time observations.`
  ];

  if (dc) {
    lines.push(
      `DC area (${dc.period}): ${dc.condition}, ${dc.temperature}. Possible impact: ${dc.driverImpact}`
    );
  }

  if (highImpact.length > 1) {
    lines.push(
      `${highImpact.length} zones show possible higher weather impact — review all weather cards below.`
    );
  }

  lines.push(
    "Verify conditions with weather.gov or a trusted app before making driving decisions."
  );

  return lines.join(" ");
}

function composeOverallOutlook(weather, staticOutlook) {
  if (!weather || weather.forecastCount === 0) {
    return staticOutlook;
  }

  const highOrMedium = weather.locations.filter(
    (entry) =>
      entry.sourceStatus === "nws_forecast" &&
      (entry.impactLevel === "high" || entry.impactLevel === "medium")
  );

  if (highOrMedium.length >= 2) {
    return `NWS forecast suggests possible weather-related slowdowns in multiple DMV zones today — factor that into shift timing. ${staticOutlook}`;
  }

  if (highOrMedium.length === 1) {
    const zone = highOrMedium[0];
    return `${zone.location} NWS forecast (${zone.period}): possible ${zone.impactLevel} weather impact — ${zone.condition.toLowerCase()}. ${staticOutlook}`;
  }

  return `NWS forecast loaded — weather may have limited impact on trips today, but verify locally. ${staticOutlook}`;
}

function briefingSource(weather) {
  if (!weather) {
    return "preview";
  }

  if (weather.forecastCount > 0) {
    return "partial_composed";
  }

  return "preview";
}

function briefingStatus(source) {
  if (source === "partial_composed") {
    return {
      status: "forecast",
      statusText: "Partial · live weather"
    };
  }

  return {
    status: "preview",
    statusText: "Static preview"
  };
}

export async function getDailyDriverBriefing() {
  const generatedAt = new Date().toISOString();

  let weather = null;
  try {
    weather = await getDmvWeatherIntelligence();
  } catch {
    weather = null;
  }

  const source = briefingSource(weather);
  const { status, statusText } = briefingStatus(source);

  const attribution =
    source === "partial_composed"
      ? `Weather caution from NWS forecast (fetched ${formatFetchedAt(weather.fetchedAt)} ET). Events, airports, and zones remain static preview — not official traffic, safety, or earnings advice.`
      : "Static MVP preview — not live financial, safety, or official traffic advice";

  return {
    source,
    status,
    statusText,
    attribution,
    dateLabel: formatBriefingDate(generatedAt),
    overallOutlook: composeOverallOutlook(weather, STATIC_BRIEFING.overallOutlook),
    bestZonesToWatch: STATIC_BRIEFING.bestZonesToWatch,
    airportWatch: STATIC_BRIEFING.airportWatch,
    weatherCaution: composeWeatherCaution(weather),
    eventDemandOpportunity: STATIC_BRIEFING.eventDemandOpportunity,
    suggestedStrategy: STATIC_BRIEFING.suggestedStrategy
  };
}

export const BRIEFING_ITEMS = [
  { key: "overallOutlook", label: "Overall DMV driving outlook", icon: "◆" },
  { key: "bestZonesToWatch", label: "Best zones to watch", icon: "◎" },
  { key: "airportWatch", label: "Airport watch", icon: "✈" },
  { key: "weatherCaution", label: "Weather caution", icon: "☁" },
  { key: "eventDemandOpportunity", label: "Event / demand opportunity", icon: "◉" },
  { key: "suggestedStrategy", label: "Suggested driver strategy", icon: "→" }
];

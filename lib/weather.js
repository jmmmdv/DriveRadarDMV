const NWS_USER_AGENT =
  "DriveRadarDMV/0.1 (https://drive-radar-dmv.vercel.app; github.com/jmmmdv/driveradardmv)";

const CACHE_SECONDS = 900;

export const DMV_WEATHER_LOCATIONS = [
  {
    id: "dc",
    name: "Washington, DC",
    lat: 38.9072,
    lon: -77.0369
  },
  {
    id: "arlington",
    name: "Arlington, VA",
    lat: 38.8816,
    lon: -77.091
  },
  {
    id: "dulles",
    name: "Dulles / Northern Virginia",
    lat: 38.9531,
    lon: -77.4565
  },
  {
    id: "baltimore",
    name: "Baltimore / BWI area",
    lat: 39.1754,
    lon: -76.6684
  }
];

const STATIC_FALLBACK = {
  dc: {
    condition: "Sample — partly cloudy",
    temperature: "Demo data",
    period: "Not connected to NWS",
    driverImpact:
      "Sample guidance only. Do not use for shift decisions — verify real conditions first.",
    suggestedAction:
      "Check weather.gov or a trusted weather app before driving.",
    impactLevel: "low"
  },
  arlington: {
    condition: "Sample — mostly clear",
    temperature: "Demo data",
    period: "Not connected to NWS",
    driverImpact:
      "Sample guidance only. Do not use for shift decisions — verify real conditions first.",
    suggestedAction:
      "Check weather.gov or a trusted weather app before driving.",
    impactLevel: "low"
  },
  dulles: {
    condition: "Sample — light rain possible",
    temperature: "Demo data",
    period: "Not connected to NWS",
    driverImpact:
      "Sample guidance only. Do not use for shift decisions — verify real conditions first.",
    suggestedAction:
      "Check weather.gov or a trusted weather app before driving.",
    impactLevel: "low"
  },
  baltimore: {
    condition: "Sample — cloudy",
    temperature: "Demo data",
    period: "Not connected to NWS",
    driverImpact:
      "Sample guidance only. Do not use for shift decisions — verify real conditions first.",
    suggestedAction:
      "Check weather.gov or a trusted weather app before driving.",
    impactLevel: "low"
  }
};

export const WEATHER_TRUST_DISCLAIMER =
  "Weather information is MVP-level NWS forecast data when available — not real-time observations. It may be delayed or unavailable. Verify conditions with official weather sources before making driving decisions. Not official safety advice.";

async function nwsFetch(url) {
  const response = await fetch(url, {
    headers: {
      "User-Agent": NWS_USER_AGENT,
      Accept: "application/geo+json"
    },
    next: { revalidate: CACHE_SECONDS }
  });

  if (!response.ok) {
    throw new Error(`NWS request failed (${response.status})`);
  }

  return response.json();
}

function parseWindMph(windSpeed) {
  if (!windSpeed) {
    return 0;
  }

  const match = String(windSpeed).match(/(\d+)/);
  return match ? Number(match[1]) : 0;
}

/**
 * Cautious driver hints derived from NWS forecast text — not official safety advice.
 */
export function getDriverGuidance({ shortForecast, temperature, windSpeed }) {
  const forecast = (shortForecast || "").toLowerCase();
  const temp = typeof temperature === "number" ? temperature : null;
  const windMph = parseWindMph(windSpeed);

  if (
    forecast.includes("thunder") ||
    forecast.includes("storm") ||
    forecast.includes("tornado")
  ) {
    return {
      driverImpact:
        "Storms may be possible — visibility and trip times could be affected.",
      suggestedAction:
        "Watch conditions and verify with official weather sources before driving.",
      impactLevel: "high"
    };
  }

  if (
    forecast.includes("snow") ||
    forecast.includes("sleet") ||
    forecast.includes("ice") ||
    forecast.includes("blizzard")
  ) {
    return {
      driverImpact:
        "Winter weather may create slower trips and slick spots in some areas.",
      suggestedAction:
        "Verify road and weather conditions with official sources before a shift.",
      impactLevel: "high"
    };
  }

  if (forecast.includes("fog")) {
    return {
      driverImpact:
        "Low visibility may be possible — highway and airport approaches could slow down.",
      suggestedAction:
        "Allow extra time and verify current visibility before long trips.",
      impactLevel: "medium"
    };
  }

  if (
    forecast.includes("rain") ||
    forecast.includes("shower") ||
    forecast.includes("drizzle")
  ) {
    return {
      driverImpact:
        "Wet roads may extend trip times — possible impact on demand patterns.",
      suggestedAction:
        "Watch for pooling near curbs and verify the latest forecast before heading out.",
      impactLevel: "medium"
    };
  }

  if (windMph >= 20 || forecast.includes("wind")) {
    return {
      driverImpact:
        "Strong winds may affect open corridors, bridges, and airport routes.",
      suggestedAction:
        "Verify wind advisories and plan extra caution on exposed routes.",
      impactLevel: "medium"
    };
  }

  if (temp !== null && temp >= 95) {
    return {
      driverImpact:
        "High temperatures may increase fatigue and vehicle strain during long shifts.",
      suggestedAction:
        "Plan breaks and verify heat advisories with official sources.",
      impactLevel: "medium"
    };
  }

  if (temp !== null && temp <= 32) {
    return {
      driverImpact:
        "Cold conditions may create slick spots, especially on ramps and bridges.",
      suggestedAction:
        "Verify current road conditions before driving — watch for icy patches.",
      impactLevel: "medium"
    };
  }

  if (
    forecast.includes("clear") ||
    forecast.includes("sunny") ||
    forecast.includes("partly cloudy") ||
    forecast.includes("mostly clear")
  ) {
    return {
      driverImpact:
        "Forecast suggests weather may have limited impact on trips — verify locally.",
      suggestedAction:
        "Still check events, airports, and demand patterns before your shift.",
      impactLevel: "low"
    };
  }

  return {
    driverImpact:
      "Mixed conditions may cause minor slowdowns — possible impact varies by neighborhood.",
    suggestedAction:
      "Review the latest official forecast again before starting your shift.",
    impactLevel: "low"
  };
}

function buildFallbackEntry(location) {
  const sample = STATIC_FALLBACK[location.id];

  return {
    id: location.id,
    location: location.name,
    sourceStatus: "fallback_preview",
    condition: sample.condition,
    temperature: sample.temperature,
    period: sample.period,
    forecastStartTime: null,
    forecastEndTime: null,
    driverImpact: sample.driverImpact,
    suggestedAction: sample.suggestedAction,
    impactLevel: sample.impactLevel
  };
}

async function fetchLocationWeather(location) {
  const points = await nwsFetch(
    `https://api.weather.gov/points/${location.lat},${location.lon}`
  );
  const forecastUrl = points?.properties?.forecast;

  if (!forecastUrl) {
    throw new Error("Missing forecast URL from NWS points response");
  }

  const forecast = await nwsFetch(forecastUrl);
  const period = forecast?.properties?.periods?.[0];

  if (!period) {
    throw new Error("Missing forecast period from NWS");
  }

  const guidance = getDriverGuidance({
    shortForecast: period.shortForecast,
    temperature: period.temperature,
    windSpeed: period.windSpeed
  });

  return {
    id: location.id,
    location: location.name,
    sourceStatus: "nws_forecast",
    condition: period.shortForecast,
    temperature:
      period.temperature != null
        ? `${period.temperature}°${period.temperatureUnit || "F"}`
        : "Unavailable",
    period: period.name,
    forecastStartTime: period.startTime || null,
    forecastEndTime: period.endTime || null,
    driverImpact: guidance.driverImpact,
    suggestedAction: guidance.suggestedAction,
    impactLevel: guidance.impactLevel
  };
}

export async function getDmvWeatherIntelligence() {
  const settled = await Promise.allSettled(
    DMV_WEATHER_LOCATIONS.map((location) => fetchLocationWeather(location))
  );

  const locations = settled.map((result, index) => {
    if (result.status === "fulfilled") {
      return result.value;
    }

    return buildFallbackEntry(DMV_WEATHER_LOCATIONS[index]);
  });

  const forecastCount = locations.filter(
    (entry) => entry.sourceStatus === "nws_forecast"
  ).length;

  let dataSource = "fallback_preview";
  if (forecastCount === locations.length) {
    dataSource = "nws_forecast";
  } else if (forecastCount > 0) {
    dataSource = "mixed";
  }

  return {
    locations,
    dataSource,
    forecastCount,
    fetchedAt: forecastCount > 0 ? new Date().toISOString() : null,
    attribution: "National Weather Service forecast (api.weather.gov)",
    disclaimer: WEATHER_TRUST_DISCLAIMER
  };
}

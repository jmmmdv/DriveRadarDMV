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
    condition: "Partly cloudy",
    temperature: "72°F",
    period: "Sample period",
    driverImpact: "Moderate evening traffic likely; weather looks manageable.",
    suggestedAction: "Monitor updates before downtown shifts.",
    impactLevel: "medium"
  },
  arlington: {
    condition: "Mostly clear",
    temperature: "70°F",
    period: "Sample period",
    driverImpact: "Low weather-related slowdown expected on main corridors.",
    suggestedAction: "Good conditions for routine Arlington loops.",
    impactLevel: "low"
  },
  dulles: {
    condition: "Light rain possible",
    temperature: "68°F",
    period: "Sample period",
    driverImpact: "Airport runs may take longer with wet pavement near IAD.",
    suggestedAction: "Allow extra time for Dulles pickup lanes.",
    impactLevel: "medium"
  },
  baltimore: {
    condition: "Cloudy",
    temperature: "71°F",
    period: "Sample period",
    driverImpact: "BWI corridor may see mild weather-related delays.",
    suggestedAction: "Check again before Maryland suburban shifts.",
    impactLevel: "low"
  }
};

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
      driverImpact: "Storms may reduce visibility and slow airport or downtown pickups.",
      suggestedAction: "Consider delaying non-essential driving until conditions improve.",
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
      driverImpact: "Winter conditions increase stop times and accident risk across the DMV.",
      suggestedAction: "Reduce speed, avoid steep ramps, and skip low-traction areas if possible.",
      impactLevel: "high"
    };
  }

  if (forecast.includes("fog")) {
    return {
      driverImpact: "Low visibility can slow highway and airport approach traffic.",
      suggestedAction: "Use low beams, increase following distance, and plan extra minutes per trip.",
      impactLevel: "medium"
    };
  }

  if (
    forecast.includes("rain") ||
    forecast.includes("shower") ||
    forecast.includes("drizzle")
  ) {
    return {
      driverImpact: "Wet roads may extend trip times and reduce rider demand briefly.",
      suggestedAction: "Allow extra time, watch for pooling near curbs, and keep wipers ready.",
      impactLevel: "medium"
    };
  }

  if (windMph >= 20 || forecast.includes("wind")) {
    return {
      driverImpact: "Strong winds can affect bridges, airport routes, and high-profile vehicles.",
      suggestedAction: "Hold steering firmly on open corridors and avoid unnecessary highway trips.",
      impactLevel: "medium"
    };
  }

  if (temp !== null && temp >= 95) {
    return {
      driverImpact: "Extreme heat increases vehicle strain and driver fatigue during long shifts.",
      suggestedAction: "Stay hydrated, take breaks, and monitor coolant and tire pressure.",
      impactLevel: "medium"
    };
  }

  if (temp !== null && temp <= 32) {
    return {
      driverImpact: "Cold temperatures may create slick spots, especially on ramps and bridges.",
      suggestedAction: "Warm up slowly, watch for black ice, and keep emergency supplies handy.",
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
      driverImpact: "Weather is unlikely to be the main factor in trip delays.",
      suggestedAction: "Focus on demand patterns, events, and commute timing as usual.",
      impactLevel: "low"
    };
  }

  return {
    driverImpact: "Mixed conditions may cause minor slowdowns in some neighborhoods.",
    suggestedAction: "Review the latest forecast again before starting your shift.",
    impactLevel: "low"
  };
}

function buildFallbackEntry(location) {
  const sample = STATIC_FALLBACK[location.id];

  return {
    id: location.id,
    location: location.name,
    source: "fallback",
    condition: sample.condition,
    temperature: sample.temperature,
    period: sample.period,
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
    source: "live",
    condition: period.shortForecast,
    temperature:
      period.temperature != null
        ? `${period.temperature}°${period.temperatureUnit || "F"}`
        : "Unavailable",
    period: period.name,
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

  const liveCount = locations.filter((entry) => entry.source === "live").length;

  let dataSource = "fallback";
  if (liveCount === locations.length) {
    dataSource = "live";
  } else if (liveCount > 0) {
    dataSource = "partial";
  }

  return {
    locations,
    dataSource,
    liveCount,
    fetchedAt: new Date().toISOString(),
    attribution: "National Weather Service (api.weather.gov)"
  };
}

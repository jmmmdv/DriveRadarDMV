import {
  getDmvWeatherIntelligence,
  WEATHER_TRUST_DISCLAIMER
} from "../../lib/weather";
import IntelCard from "./IntelCard";
import IntelligenceSection from "./IntelligenceSection";

function formatTimestamp(isoString) {
  if (!isoString) {
    return null;
  }

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "America/New_York"
  }).format(new Date(isoString));
}

function formatForecastWindow(startTime, endTime) {
  const start = formatTimestamp(startTime);
  const end = formatTimestamp(endTime);

  if (start && end) {
    return `${start} – ${end} ET`;
  }

  return start ? `${start} ET` : null;
}

function impactLabel(level) {
  if (level === "high") return "Possible high impact";
  if (level === "medium") return "Possible moderate impact";
  return "Possible low impact";
}

function sectionStatus(dataSource) {
  if (dataSource === "nws_forecast") {
    return {
      status: "forecast",
      statusText: "NWS forecast loaded"
    };
  }

  if (dataSource === "mixed") {
    return {
      status: "partial",
      statusText: "Mixed · some zones on demo fallback"
    };
  }

  return {
    status: "preview",
    statusText: "Demo fallback · NWS unavailable"
  };
}

function cardBadge(entry) {
  if (entry.sourceStatus === "nws_forecast") {
    return {
      badge: "NWS forecast",
      badgeType: "forecast"
    };
  }

  return {
    badge: "Demo fallback",
    badgeType: "preview"
  };
}

function buildMetaLine(weather) {
  if (weather.dataSource === "fallback_preview") {
    return `Source status: demo fallback preview · ${weather.attribution}`;
  }

  const fetched = formatTimestamp(weather.fetchedAt);
  const parts = ["Source status: NWS forecast loaded"];

  if (fetched) {
    parts.push(`App fetched ${fetched} ET`);
  }

  parts.push(weather.attribution);
  return parts.join(" · ");
}

export default async function WeatherIntelligence() {
  const weather = await getDmvWeatherIntelligence();
  const { status, statusText } = sectionStatus(weather.dataSource);

  return (
    <IntelligenceSection
      id="weather"
      title="Weather"
      status={status}
      statusText={statusText}
      intro="NWS public forecast when available — not real-time observations. Driver hints are cautious estimates only."
      meta={buildMetaLine(weather)}
    >
      <p className="weatherTrustNote" role="note">
        {WEATHER_TRUST_DISCLAIMER}
      </p>

      <div className="intelGrid intelGrid--2">
        {weather.locations.map((entry) => {
          const { badge, badgeType } = cardBadge(entry);
          const forecastWindow = formatForecastWindow(
            entry.forecastStartTime,
            entry.forecastEndTime
          );

          const rows = [
            {
              label: "Forecast period",
              value:
                entry.sourceStatus === "nws_forecast"
                  ? entry.period
                  : entry.period
            },
            {
              label: "Condition",
              value: `${entry.condition} · ${entry.temperature}`
            }
          ];

          if (forecastWindow) {
            rows.push({
              label: "Valid window",
              value: forecastWindow
            });
          }

          rows.push(
            { label: "Possible impact", value: entry.driverImpact },
            { label: "Suggested check", value: entry.suggestedAction }
          );

          return (
            <IntelCard
              key={entry.id}
              title={entry.location}
              badge={badge}
              badgeType={badgeType}
              rows={rows}
              tag={{
                level: entry.impactLevel,
                label: impactLabel(entry.impactLevel)
              }}
            />
          );
        })}
      </div>
    </IntelligenceSection>
  );
}

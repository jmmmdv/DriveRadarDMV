import { getDmvWeatherIntelligence } from "../../lib/weather";
import IntelCard from "./IntelCard";
import IntelligenceSection from "./IntelligenceSection";

function formatFetchedAt(isoString) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "America/New_York"
  }).format(new Date(isoString));
}

function impactLabel(level) {
  if (level === "high") return "High impact";
  if (level === "medium") return "Moderate impact";
  return "Low impact";
}

export default async function WeatherIntelligence() {
  const weather = await getDmvWeatherIntelligence();

  const status =
    weather.dataSource === "live"
      ? "live"
      : weather.dataSource === "partial"
        ? "partial"
        : "preview";

  const statusText =
    weather.dataSource === "live"
      ? "Live · NWS"
      : weather.dataSource === "partial"
        ? `Partial · ${weather.liveCount}/${weather.locations.length} live`
        : "Fallback data";

  return (
    <IntelligenceSection
      id="weather"
      title="Weather"
      status={status}
      statusText={statusText}
      intro="Free National Weather Service data when available — driver impact per zone."
      meta={`Updated ${formatFetchedAt(weather.fetchedAt)} ET · ${weather.attribution}`}
    >
      <div className="intelGrid intelGrid--2">
        {weather.locations.map((entry) => (
          <IntelCard
            key={entry.id}
            title={entry.location}
            badge={entry.source === "live" ? "Live NWS" : "Fallback"}
            badgeType={entry.source === "live" ? "live" : "preview"}
            rows={[
              {
                label: "Condition",
                value: `${entry.condition} · ${entry.temperature}`
              },
              { label: "Impact", value: entry.driverImpact },
              { label: "Action", value: entry.suggestedAction }
            ]}
            tag={{ level: entry.impactLevel, label: impactLabel(entry.impactLevel) }}
          />
        ))}
      </div>
    </IntelligenceSection>
  );
}

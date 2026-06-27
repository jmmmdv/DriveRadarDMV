import { getDmvWeatherIntelligence } from "../../lib/weather";

function formatFetchedAt(isoString) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "America/New_York"
  }).format(new Date(isoString));
}

function sourceLabel(source) {
  if (source === "live") {
    return "Live NWS";
  }

  return "Sample fallback";
}

function dataSourceMessage(dataSource, liveCount, total) {
  if (dataSource === "live") {
    return `Showing live National Weather Service data for ${total} DMV locations.`;
  }

  if (dataSource === "partial") {
    return `Live NWS data for ${liveCount} of ${total} locations. Sample fallback used where fetch failed.`;
  }

  return "Live fetch unavailable — showing sample fallback content for all locations.";
}

export default async function WeatherIntelligence() {
  const weather = await getDmvWeatherIntelligence();

  return (
    <section
      className="weatherSection"
      id="weather"
      aria-labelledby="weather-title"
    >
      <div className="sectionHeader">
        <p className="sectionLabel">First live feature</p>
        <h2 id="weather-title">DMV Weather Intelligence</h2>
        <p className="sectionIntro">
          Driver-focused weather guidance for key DMV zones. Data comes from the
          free{" "}
          <a
            href="https://www.weather.gov/documentation/services-web-api"
            rel="noreferrer"
            target="_blank"
          >
            National Weather Service API
          </a>{" "}
          when available — no API key required.
        </p>
      </div>

      <div className="weatherDisclaimer" role="note">
        <strong>MVP preview — not for safety-critical decisions.</strong> Always
        check official NWS alerts and use your own judgment before driving.
      </div>

      <div className="weatherMeta">
        <span
          className={`weatherSourceBadge weatherSourceBadge--${weather.dataSource}`}
        >
          {dataSourceMessage(
            weather.dataSource,
            weather.liveCount,
            weather.locations.length
          )}
        </span>
        <span className="weatherUpdated">
          Updated {formatFetchedAt(weather.fetchedAt)} ET · {weather.attribution}
        </span>
      </div>

      <div className="weatherGrid">
        {weather.locations.map((entry) => (
          <article className="weatherCard" key={entry.id}>
            <div className="weatherCardTop">
              <h3>{entry.location}</h3>
              <span
                className={`weatherBadge weatherBadge--${entry.source}`}
              >
                {sourceLabel(entry.source)}
              </span>
            </div>

            <dl className="weatherDetails">
              <div className="weatherRow">
                <dt>Condition</dt>
                <dd>{entry.condition}</dd>
              </div>
              <div className="weatherRow">
                <dt>Temperature</dt>
                <dd>{entry.temperature}</dd>
              </div>
              <div className="weatherRow">
                <dt>Forecast period</dt>
                <dd>{entry.period}</dd>
              </div>
              <div className="weatherRow">
                <dt>Driver impact</dt>
                <dd>{entry.driverImpact}</dd>
              </div>
              <div className="weatherRow">
                <dt>Suggested action</dt>
                <dd>{entry.suggestedAction}</dd>
              </div>
            </dl>

            <span className={`signalTag signalTag--${entry.impactLevel}`}>
              {entry.impactLevel === "high"
                ? "High impact"
                : entry.impactLevel === "medium"
                  ? "Moderate impact"
                  : "Low impact"}
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}

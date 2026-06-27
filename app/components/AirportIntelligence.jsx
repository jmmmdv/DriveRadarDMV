import { getDmvAirportIntelligence } from "../../lib/airports";
import { impactLabel } from "../../lib/events";

export default function AirportIntelligence() {
  const airports = getDmvAirportIntelligence();

  return (
    <section
      className="airportsSection"
      id="airports"
      aria-labelledby="airports-title"
    >
      <div className="sectionHeader">
        <p className="sectionLabel">Next MVP feature</p>
        <h2 id="airports-title">DMV Airport Intelligence Preview</h2>
        <p className="sectionIntro">
          Driver-focused pickup context for the three major DMV airports. This
          section uses <strong>static example cards</strong> — live summaries from
          free public sources like FAA NAS Status are planned for a later phase.
        </p>
      </div>

      <div className="airportsDisclaimer" role="note">
        <strong>MVP preview — not live flight data.</strong> Examples show how
        DriveRadarDMV may summarize arrival waves and pickup conditions for DCA,
        IAD, and BWI. Always verify terminal and flight info independently.
      </div>

      <div className="airportsMeta">
        <span className="airportsSourceBadge airportsSourceBadge--preview">
          Static preview · {airports.airports.length} airports · no API connected
        </span>
        <span className="airportsUpdated">{airports.attribution}</span>
      </div>

      <div className="airportsGrid">
        {airports.airports.map((entry) => (
          <article className="airportsCard" key={entry.id}>
            <div className="airportsCardTop">
              <h3>{entry.name}</h3>
              <span className="airportsBadge">Sample preview</span>
            </div>

            <dl className="airportsDetails">
              <div className="airportsRow">
                <dt>Example activity signal</dt>
                <dd>{entry.activitySignal}</dd>
              </div>
              <div className="airportsRow">
                <dt>Driver impact</dt>
                <dd>{entry.driverImpact}</dd>
              </div>
              <div className="airportsRow">
                <dt>Suggested action</dt>
                <dd>{entry.suggestedAction}</dd>
              </div>
            </dl>

            <span className={`signalTag signalTag--${entry.impactLevel}`}>
              {impactLabel(entry.impactLevel)}
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}

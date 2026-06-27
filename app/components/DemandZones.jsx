import {
  demandLevelLabel,
  getDmvDemandZonesIntelligence
} from "../../lib/demandZones";

export default function DemandZones() {
  const demand = getDmvDemandZonesIntelligence();

  return (
    <section
      className="demandSection"
      id="zones"
      aria-labelledby="demand-title"
    >
      <div className="sectionHeader">
        <p className="sectionLabel">Next MVP feature</p>
        <h2 id="demand-title">DMV Demand Zones Intelligence Preview</h2>
        <p className="sectionIntro">
          Driver-focused demand scenarios for high-opportunity DMV neighborhoods.
          This section uses <strong>static example cards</strong> — live demand
          signals from public data and heuristics are planned for a later phase.
        </p>
      </div>

      <div className="demandDisclaimer" role="note">
        <strong>MVP preview — not live demand prediction.</strong> Examples show
        how DriveRadarDMV may highlight where rideshare, delivery, Uber
        Black/SUV, and private drivers might find stronger opportunity. Not
        based on real-time platform data.
      </div>

      <div className="demandMeta">
        <span className="demandSourceBadge demandSourceBadge--preview">
          Static preview · {demand.zones.length} zones · no API connected
        </span>
        <span className="demandUpdated">{demand.attribution}</span>
      </div>

      <div className="demandGrid">
        {demand.zones.map((entry) => (
          <article className="demandCard" key={entry.id}>
            <div className="demandCardTop">
              <h3>{entry.zone}</h3>
              <span className="demandBadge">Sample preview</span>
            </div>

            <dl className="demandDetails">
              <div className="demandRow">
                <dt>Example demand signal</dt>
                <dd>{entry.demandSignal}</dd>
              </div>
              <div className="demandRow">
                <dt>Best for</dt>
                <dd>{entry.bestFor}</dd>
              </div>
              <div className="demandRow">
                <dt>Expected driver impact</dt>
                <dd>{entry.driverImpact}</dd>
              </div>
              <div className="demandRow">
                <dt>Suggested action</dt>
                <dd>{entry.suggestedAction}</dd>
              </div>
            </dl>

            <span className={`signalTag signalTag--${entry.demandLevel}`}>
              {demandLevelLabel(entry.demandLevel)}
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}

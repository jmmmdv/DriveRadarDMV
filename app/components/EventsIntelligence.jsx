import { getDmvEventsIntelligence, impactLabel } from "../../lib/events";

export default function EventsIntelligence() {
  const events = getDmvEventsIntelligence();

  return (
    <section
      className="eventsSection"
      id="events"
      aria-labelledby="events-title"
    >
      <div className="sectionHeader">
        <p className="sectionLabel">Next MVP feature</p>
        <h2 id="events-title">DMV Events Intelligence Preview</h2>
        <p className="sectionIntro">
          Driver-focused event scenarios for high-traffic DMV zones. This section
          uses <strong>static example cards</strong> to show the product direction
          — live event feeds from free public sources are planned for a later
          phase.
        </p>
      </div>

      <div className="eventsDisclaimer" role="note">
        <strong>MVP preview — not live event data.</strong> Examples illustrate
        how DriveRadarDMV may summarize games, conventions, and airport activity
        for drivers. Always verify local conditions on your own.
      </div>

      <div className="eventsMeta">
        <span className="eventsSourceBadge eventsSourceBadge--preview">
          Static preview · {events.zones.length} DMV zones · no API connected
        </span>
        <span className="eventsUpdated">{events.attribution}</span>
      </div>

      <div className="eventsGrid">
        {events.zones.map((entry) => (
          <article className="eventsCard" key={entry.id}>
            <div className="eventsCardTop">
              <h3>{entry.zone}</h3>
              <span className="eventsBadge">Sample preview</span>
            </div>

            <dl className="eventsDetails">
              <div className="eventsRow">
                <dt>Example activity</dt>
                <dd>{entry.activity}</dd>
              </div>
              <div className="eventsRow">
                <dt>Expected driver impact</dt>
                <dd>{entry.driverImpact}</dd>
              </div>
              <div className="eventsRow">
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

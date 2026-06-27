import { getDmvEventsIntelligence, impactLabel } from "../../lib/events";
import IntelCard from "./IntelCard";
import IntelligenceSection from "./IntelligenceSection";

export default function EventsIntelligence() {
  const events = getDmvEventsIntelligence();

  return (
    <IntelligenceSection
      id="events"
      title="Events"
      status="preview"
      statusText="Static preview"
      intro="Example event scenarios for high-traffic DMV venues."
    >
      <div className="intelGrid intelGrid--2">
        {events.zones.map((entry) => (
          <IntelCard
            key={entry.id}
            title={entry.zone}
            badge="Sample"
            badgeType="preview"
            rows={[
              { label: "Activity", value: entry.activity },
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

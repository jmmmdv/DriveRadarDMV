import { getDmvAirportIntelligence } from "../../lib/airports";
import { impactLabel } from "../../lib/events";
import IntelCard from "./IntelCard";
import IntelligenceSection from "./IntelligenceSection";

export default function AirportIntelligence() {
  const airports = getDmvAirportIntelligence();

  return (
    <IntelligenceSection
      id="airports"
      title="Airports"
      status="preview"
      statusText="Static preview"
      intro="Pickup context for DCA, IAD, and BWI — not live flight data."
    >
      <div className="intelGrid intelGrid--3">
        {airports.airports.map((entry) => (
          <IntelCard
            key={entry.id}
            title={entry.name}
            badge="Sample"
            badgeType="preview"
            rows={[
              { label: "Signal", value: entry.activitySignal },
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

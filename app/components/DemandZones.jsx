import {
  demandLevelLabel,
  getDmvDemandZonesIntelligence
} from "../../lib/demandZones";
import IntelCard from "./IntelCard";
import IntelligenceSection from "./IntelligenceSection";

export default function DemandZones() {
  const demand = getDmvDemandZonesIntelligence();

  return (
    <IntelligenceSection
      id="zones"
      title="Demand zones"
      status="preview"
      statusText="Static preview"
      intro="Example zone opportunities — not live platform demand data."
    >
      <div className="intelGrid intelGrid--3">
        {demand.zones.map((entry) => (
          <IntelCard
            key={entry.id}
            title={entry.zone}
            badge="Sample"
            badgeType="preview"
            rows={[
              { label: "Signal", value: entry.demandSignal },
              { label: "Best for", value: entry.bestFor },
              { label: "Impact", value: entry.driverImpact },
              { label: "Action", value: entry.suggestedAction }
            ]}
            tag={{ level: entry.demandLevel, label: demandLevelLabel(entry.demandLevel) }}
          />
        ))}
      </div>
    </IntelligenceSection>
  );
}

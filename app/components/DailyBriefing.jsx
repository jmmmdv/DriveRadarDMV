import {
  BRIEFING_ITEMS,
  getDailyDriverBriefing
} from "../../lib/dailyBriefing";

export default function DailyBriefing() {
  const briefing = getDailyDriverBriefing();

  return (
    <section
      className="briefingSection"
      id="briefing"
      aria-labelledby="briefing-title"
    >
      <div className="briefingPanel">
        <div className="briefingHeader">
          <div>
            <p className="sectionLabel">Decision layer</p>
            <h2 id="briefing-title">Daily Driver Briefing</h2>
            <p className="briefingDate">{briefing.dateLabel} · DMV preview</p>
          </div>
          <span className="briefingSourceBadge">MVP preview</span>
        </div>

        <p className="briefingIntro">
          One practical summary built from the Weather, Events, Airport, and
          Demand Zones modules below — designed for rideshare, delivery, Uber
          Black/SUV, private, and professional drivers planning a shift.
        </p>

        <div className="briefingDisclaimer" role="note">
          <strong>Not financial, safety, or official traffic advice.</strong>{" "}
          {briefing.attribution}. Always use your own judgment and official
          sources before driving.
        </div>

        <div className="briefingGrid">
          {BRIEFING_ITEMS.map((item) => {
            const value = briefing[item.key];

            return (
              <article className="briefingCard" key={item.key}>
                <div className="briefingCardHead">
                  <span className="briefingIcon" aria-hidden="true">
                    {item.icon}
                  </span>
                  <h3>{item.label}</h3>
                </div>

                {Array.isArray(value) ? (
                  <ul className="briefingList">
                    {value.map((entry) => (
                      <li key={entry}>{entry}</li>
                    ))}
                  </ul>
                ) : (
                  <p>{value}</p>
                )}
              </article>
            );
          })}
        </div>

        <p className="briefingFooter">
          Static demo synthesis for Phase 0. Future versions will compose this
          briefing automatically from live weather and connected public data
          feeds.
        </p>
      </div>
    </section>
  );
}

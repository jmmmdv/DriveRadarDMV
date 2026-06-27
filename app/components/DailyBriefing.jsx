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
            <p className="sectionLabel">Today&apos;s summary</p>
            <h2 id="briefing-title">Daily Driver Briefing</h2>
            <p className="briefingDate">{briefing.dateLabel}</p>
          </div>
          <span className="intelStatus intelStatus--preview">Static preview</span>
        </div>

        <div className="briefingGrid">
          {BRIEFING_ITEMS.map((item) => {
            const value = briefing[item.key];
            const isStrategy = item.key === "suggestedStrategy";

            return (
              <article
                className={`briefingCard${isStrategy ? " briefingCard--highlight" : ""}`}
                key={item.key}
              >
                <h3>
                  <span className="briefingIcon" aria-hidden="true">
                    {item.icon}
                  </span>
                  {item.label}
                </h3>

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
      </div>
    </section>
  );
}

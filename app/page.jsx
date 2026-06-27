import WeatherIntelligence from "./components/WeatherIntelligence";
import EventsIntelligence from "./components/EventsIntelligence";

const LIVE_DEMO_URL = "https://drive-radar-dmv.vercel.app/";
const REPO_URL = "https://github.com/jmmmdv/driveradardmv";

const problemPoints = [
  {
    title: "Scattered information",
    text: "Weather, events, traffic, and airport status live in separate apps — none built for gig drivers."
  },
  {
    title: "Costly guesswork",
    text: "A slow shift or missed airport rush can mean hours of lost earnings across the DMV."
  },
  {
    title: "No regional focus",
    text: "National tools miss DC-specific patterns: commutes, monuments, stadiums, and three major airports."
  }
];

const sampleCards = [
  {
    type: "Airport activity",
    icon: "✈",
    headline: "DCA evening arrivals",
    detail: "Reagan National · Moderate pickup window 6–10 PM · Sample estimate",
    signal: "Airport watch",
    signalLevel: "medium"
  },
  {
    type: "Demand-zone preview",
    icon: "◎",
    headline: "Downtown DC · Evening",
    detail: "Elevated ride activity expected near office corridors and dining districts",
    signal: "Zone highlight",
    signalLevel: "high",
    zones: [
      { name: "Downtown DC", level: 85 },
      { name: "Arlington", level: 62 },
      { name: "Tysons", level: 48 }
    ]
  }
];

const featureAreas = [
  {
    title: "Weather impact",
    text: "Rain, snow, heat, and wind summaries tuned for driving — not just the forecast."
  },
  {
    title: "Local events",
    text: "Games, concerts, and festivals that cluster riders near venues and corridors."
  },
  {
    title: "Traffic demand",
    text: "Commute peaks and travel windows that shift demand across the region."
  },
  {
    title: "Airport demand",
    text: "Pickup context for DCA, IAD, and BWI without switching between apps."
  },
  {
    title: "Road closures",
    text: "Construction and closures from verified public sources when connected."
  },
  {
    title: "Best driving zones",
    text: "Regional highlights for where opportunity may be stronger today."
  }
];

const coverageAreas = [
  {
    name: "Washington, DC",
    detail: "Downtown, major event areas, commuter routes, and surrounding neighborhoods."
  },
  {
    name: "Northern Virginia",
    detail: "Arlington, Alexandria, Fairfax, Tysons, and key regional corridors."
  },
  {
    name: "Maryland suburbs",
    detail: "Montgomery County, Prince George's County, and nearby commuter communities."
  },
  {
    name: "Regional airports",
    detail: "Demand context for DCA, IAD, and BWI airport trips."
  }
];

const mvpItems = [
  { label: "Landing page & product story", done: true },
  { label: "Live weather intelligence (NWS API)", done: true },
  { label: "Events intelligence preview (static)", done: true },
  { label: "Static preview cards (airports, demand zones)", done: true },
  { label: "Product documentation", done: true },
  { label: "Live Vercel deployment", done: true },
  { label: "Live API feeds (events, traffic, airports)", done: false },
  { label: "User accounts & alerts", done: false },
  { label: "Payments & premium tier", done: false }
];

const roadmapPhases = [
  {
    phase: "Phase 0",
    status: "Now",
    title: "Foundation",
    items: ["Landing page", "Live weather (NWS)", "Events preview", "Product docs"]
  },
  {
    phase: "Phase 1",
    status: "Q3 2026",
    title: "Live data dashboard",
    items: ["Free public APIs", "Weather & events", "Airport summaries"]
  },
  {
    phase: "Phase 2",
    status: "Q4 2026",
    title: "Personalization",
    items: ["Accounts", "Saved zones", "Email digests"]
  },
  {
    phase: "Phase 3",
    status: "2027",
    title: "Premium & scale",
    items: ["Advanced insights", "Custom alerts", "Subscription tier"]
  }
];

export default function Home() {
  return (
    <>
      <header className="siteHeader">
        <div className="headerInner">
          <a className="logo" href="#top">
            DriveRadar<span>DMV</span>
          </a>
          <nav className="headerNav" aria-label="Primary">
            <a href="#weather">Weather</a>
            <a href="#events">Events</a>
            <a href="#preview">Preview</a>
            <a href="#features">Features</a>
            <a href="#roadmap">Roadmap</a>
            <a className="navCta" href={LIVE_DEMO_URL}>
              Live demo
            </a>
          </nav>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="heroContent">
            <p className="eyebrow">DMV driver intelligence · Weather &amp; Events MVP</p>
            <h1>Drive smarter across DC, Maryland &amp; Virginia</h1>
            <p className="heroText">
              One regional view for weather, events, airport activity, and demand
              zones — built for rideshare, delivery, and professional drivers who
              need clarity before every shift.
            </p>
            <div className="heroActions">
              <a className="btn btnPrimary" href={LIVE_DEMO_URL}>
                View live demo
              </a>
              <a className="btn btnSecondary" href={`${REPO_URL}#readme`}>
                Read on GitHub
              </a>
            </div>
            <div className="statusRow" aria-label="Current project status">
              <span>Weather + Events MVP</span>
              <span>Live NWS weather</span>
              <span>Static event preview</span>
            </div>
          </div>
        </section>

        <section className="problemSection" aria-labelledby="problem-title">
          <div className="sectionHeader centered">
            <p className="sectionLabel">The problem</p>
            <h2 id="problem-title">Drivers shouldn&apos;t guess before a shift</h2>
            <p className="sectionIntro">
              DMV drivers make hourly decisions with fragmented tools. DriveRadarDMV
              brings regional signals into one daily briefing — so you can plan
              where and when to drive with more confidence.
            </p>
          </div>
          <div className="problemGrid">
            {problemPoints.map((point) => (
              <article className="problemCard" key={point.title}>
                <h3>{point.title}</h3>
                <p>{point.text}</p>
              </article>
            ))}
          </div>
        </section>

        <WeatherIntelligence />

        <EventsIntelligence />

        <section className="previewSection" id="preview" aria-labelledby="preview-title">
          <div className="sectionHeader">
            <p className="sectionLabel">Intelligence preview</p>
            <h2 id="preview-title">What your daily briefing could look like</h2>
            <p className="sectionIntro">
              These cards use <strong>static sample content</strong> for airports
              and demand zones. Weather and events have dedicated sections above.
            </p>
          </div>
          <div className="sampleGrid">
            {sampleCards.map((card) => (
              <article className="sampleCard" key={card.type}>
                <div className="sampleCardTop">
                  <span className="sampleIcon" aria-hidden="true">
                    {card.icon}
                  </span>
                  <span className="sampleBadge">Sample data</span>
                </div>
                <p className="sampleType">{card.type}</p>
                <h3>{card.headline}</h3>
                <p className="sampleDetail">{card.detail}</p>
                {card.zones ? (
                  <ul className="zoneBars" aria-label="Sample demand zones">
                    {card.zones.map((zone) => (
                      <li key={zone.name}>
                        <span className="zoneName">{zone.name}</span>
                        <span className="zoneTrack">
                          <span
                            className="zoneFill"
                            style={{ width: `${zone.level}%` }}
                          />
                        </span>
                        <span className="zonePct">{zone.level}%</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
                <span className={`signalTag signalTag--${card.signalLevel}`}>
                  {card.signal}
                </span>
              </article>
            ))}
          </div>
        </section>

        <section className="features" id="features" aria-labelledby="features-title">
          <div className="sectionHeader">
            <p className="sectionLabel">Driver intelligence</p>
            <h2 id="features-title">Everything that shapes a DMV shift</h2>
            <p className="sectionIntro">
              Planned modules that turn regional noise into actionable driving
              context — starting with the factors drivers check most often.
            </p>
          </div>
          <div className="featureGrid">
            {featureAreas.map((feature) => (
              <article className="featureCard" key={feature.title}>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="coverage" aria-labelledby="coverage-title">
          <div className="coverageIntro">
            <p className="sectionLabel">Regional focus</p>
            <h2 id="coverage-title">Built for the DMV — not generic national data</h2>
            <p>
              DriveRadarDMV covers the connected roads, communities, and airports
              that define travel across the DC metropolitan area.
            </p>
          </div>
          <div className="coverageList">
            {coverageAreas.map((area) => (
              <article className="coverageItem" key={area.name}>
                <h3>{area.name}</h3>
                <p>{area.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mvpSection" aria-labelledby="mvp-title">
          <div className="mvpPanel">
            <div className="mvpIntro">
              <p className="sectionLabel">MVP status</p>
              <h2 id="mvp-title">Honest progress, no fake integrations</h2>
              <p>
                This MVP includes live weather from the National Weather Service,
                a static events intelligence preview, and sample cards for other
                modules — no accounts or payments yet.
              </p>
            </div>
            <ul className="mvpChecklist">
              {mvpItems.map((item) => (
                <li key={item.label} data-done={item.done}>
                  <span className="checkIcon" aria-hidden="true">
                    {item.done ? "✓" : "○"}
                  </span>
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="roadmapSection" id="roadmap" aria-labelledby="roadmap-title">
          <div className="sectionHeader centered">
            <p className="sectionLabel">Roadmap</p>
            <h2 id="roadmap-title">Shipping in focused phases</h2>
            <p className="sectionIntro">
              Each phase has a clear goal. See{" "}
              <a href={`${REPO_URL}/blob/main/docs/MVP_ROADMAP.md`}>docs/MVP_ROADMAP.md</a>{" "}
              for full details.
            </p>
          </div>
          <div className="roadmapGrid">
            {roadmapPhases.map((phase) => (
              <article className="roadmapCard" key={phase.phase}>
                <div className="roadmapCardHead">
                  <span className="roadmapPhase">{phase.phase}</span>
                  <span className="roadmapStatus">{phase.status}</span>
                </div>
                <h3>{phase.title}</h3>
                <ul>
                  {phase.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="ctaSection" aria-labelledby="cta-title">
          <div className="ctaPanel">
            <h2 id="cta-title">See the MVP live</h2>
            <p>
              Explore the static preview on Vercel, star the repo on GitHub, or
              run it locally — no API keys required.
            </p>
            <div className="heroActions">
              <a className="btn btnPrimary btnLight" href={LIVE_DEMO_URL}>
                Open live demo
              </a>
              <a className="btn btnGhost" href={REPO_URL}>
                View source
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="siteFooter">
        <div className="footerInner">
          <div className="footerBrand">
            <strong>DriveRadarDMV</strong>
            <p>Driver intelligence for the DMV</p>
          </div>
          <div className="footerLinks">
            <a href={LIVE_DEMO_URL}>Live demo</a>
            <a href={REPO_URL}>GitHub</a>
            <a href="https://www.driveradardmv.com">driveradardmv.com</a>
          </div>
          <span className="footerBadge">Weather &amp; Events MVP</span>
        </div>
      </footer>
    </>
  );
}

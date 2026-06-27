const helpSteps = [
  {
    number: "01",
    title: "See what may affect the road",
    text: "Review weather, events, closures, and other conditions that may change a driving plan."
  },
  {
    number: "02",
    title: "Understand possible demand",
    text: "Compare commute periods, airport activity, and local events that may bring more drivers and riders."
  },
  {
    number: "03",
    title: "Plan where and when to drive",
    text: "Use simple regional insights to identify promising areas and possible high-demand times."
  }
];

const featureAreas = [
  {
    title: "Weather Impact",
    text: "Understand how rain, snow, heat, and wind may affect local driving conditions."
  },
  {
    title: "Local Events",
    text: "See how concerts, games, festivals, and public events may influence nearby roads."
  },
  {
    title: "Traffic Demand",
    text: "Review possible demand changes around commutes and busy travel periods."
  },
  {
    title: "Airport Demand",
    text: "Prepare for possible pickup and drop-off activity near DCA, IAD, and BWI."
  },
  {
    title: "Road Closures",
    text: "Check planned closures and construction alerts when verified data becomes available."
  },
  {
    title: "Best Driving Zones",
    text: "Explore areas that may offer useful driving opportunities across the DMV."
  },
  {
    title: "High-Demand Times",
    text: "Identify time periods when driving activity may be stronger across the region."
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
    detail: "Future demand insights for DCA, IAD, and BWI airport trips."
  }
];

export default function Home() {
  return (
    <>
      <main>
        <section className="hero">
          <div className="heroContent">
            <p className="eyebrow">DMV driver intelligence · MVP preview</p>
            <h1>DriveRadarDMV</h1>
            <p className="heroText">
              A clearer way to prepare for driving across Washington, DC,
              Maryland, and Virginia. DriveRadarDMV will bring local conditions,
              demand signals, and regional driving insights into one simple view.
            </p>
            <div className="statusRow" aria-label="Current project status">
              <span>Coming Soon</span>
              <span>MVP Preview</span>
              <span>Placeholder Information</span>
            </div>
          </div>
        </section>

        <section className="helpSection" aria-labelledby="help-title">
          <div className="sectionHeader">
            <p className="sectionLabel">A simple daily view</p>
            <h2 id="help-title">How DriveRadarDMV Will Help Drivers</h2>
            <p className="sectionIntro">
              DriveRadarDMV is being designed to make regional driving
              information easier to understand before a driver gets on the road.
            </p>
          </div>
          <div className="helpGrid">
            {helpSteps.map((step) => (
              <article className="helpItem" key={step.number}>
                <span className="stepNumber" aria-hidden="true">
                  {step.number}
                </span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="features" aria-labelledby="features-title">
          <div className="sectionHeader">
            <p className="sectionLabel">Planned intelligence</p>
            <h2 id="features-title">One place for the factors that shape a drive</h2>
            <p className="sectionIntro">
              These features are planned for future releases. Live data and API
              connections are not included in this MVP preview.
            </p>
          </div>
          <div className="featureGrid">
            {featureAreas.map((feature) => (
              <article className="featureCard" key={feature.title}>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
                <span className="comingSoon">Coming Soon</span>
              </article>
            ))}
          </div>
        </section>

        <section className="coverage" aria-labelledby="coverage-title">
          <div className="coverageIntro">
            <p className="sectionLabel">Regional focus</p>
            <h2 id="coverage-title">DMV Coverage Area</h2>
            <p>
              DriveRadarDMV is focused on the connected roads, communities, and
              airports that shape travel throughout the DC metropolitan area.
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
      </main>

      <footer className="siteFooter">
        <div className="footerInner">
          <strong>DriveRadarDMV</strong>
          <a href="https://www.driveradardmv.com">www.driveradardmv.com</a>
          <span>Coming Soon</span>
        </div>
      </footer>
    </>
  );
}

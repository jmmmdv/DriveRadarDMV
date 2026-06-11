const featureAreas = [
  {
    title: "Weather Impact",
    text: "Preview how rain, heat, wind, or winter conditions may affect driving plans."
  },
  {
    title: "Local Events",
    text: "Track major concerts, games, and public events that may increase local traffic."
  },
  {
    title: "Traffic Demand",
    text: "Show simple demand signals for commute windows and busy travel periods."
  },
  {
    title: "Airport Demand",
    text: "Prepare for possible pickup and drop-off pressure near DCA, IAD, and BWI."
  },
  {
    title: "Road Closures",
    text: "Highlight planned closures and construction alerts once reliable sources are connected."
  },
  {
    title: "Best Driving Zones",
    text: "Suggest DMV areas that may be better for calm, efficient driving during the day."
  },
  {
    title: "High-Demand Times",
    text: "Preview time blocks when driver activity may be stronger across the region."
  }
];

const sampleZones = [
  "Washington DC core",
  "Northern Virginia corridors",
  "Montgomery and Prince George's counties",
  "Baltimore-Washington airport routes"
];

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="heroContent">
          <p className="eyebrow">MVP preview for DMV drivers</p>
          <h1>DriveRadarDMV</h1>
          <p className="heroText">
            A simple driving intelligence foundation for Washington DC, Maryland,
            and Virginia. The goal is to help drivers understand conditions,
            demand, and useful driving opportunities before live data is added.
          </p>
          <div className="statusRow" aria-label="Current MVP status">
            <span>Coming Soon</span>
            <span>Sample Data Only</span>
            <span>No Live APIs Yet</span>
          </div>
        </div>
      </section>

      <section className="overview" aria-labelledby="overview-title">
        <div>
          <p className="sectionLabel">Foundation</p>
          <h2 id="overview-title">Built to grow step by step</h2>
        </div>
        <p>
          This first version keeps the experience clear and focused. It presents
          the main DriveRadarDMV feature areas without promising live traffic,
          weather, event, airport, or closure data before those integrations are
          ready.
        </p>
      </section>

      <section className="features" aria-labelledby="features-title">
        <div className="sectionHeader">
          <p className="sectionLabel">Feature areas</p>
          <h2 id="features-title">What DriveRadarDMV will help drivers review</h2>
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

      <section className="preview" aria-labelledby="preview-title">
        <div className="previewText">
          <p className="sectionLabel">MVP preview</p>
          <h2 id="preview-title">Simple placeholder coverage</h2>
          <p>
            The app currently uses plain sample content only. These starter
            zones give the MVP a useful shape while future data sources are
            planned carefully.
          </p>
        </div>
        <ul className="zoneList">
          {sampleZones.map((zone) => (
            <li key={zone}>{zone}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}

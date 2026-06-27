export default function IntelCard({ title, badge, badgeType = "preview", rows, tag }) {
  return (
    <article className="intelCard">
      <div className="intelCardTop">
        <h3>{title}</h3>
        {badge ? (
          <span className={`intelBadge intelBadge--${badgeType}`}>{badge}</span>
        ) : null}
      </div>

      <dl className="intelDetails">
        {rows.map((row) => (
          <div className="intelRow" key={row.label}>
            <dt>{row.label}</dt>
            <dd>{row.value}</dd>
          </div>
        ))}
      </dl>

      {tag ? (
        <span className={`signalTag signalTag--${tag.level}`}>{tag.label}</span>
      ) : null}
    </article>
  );
}

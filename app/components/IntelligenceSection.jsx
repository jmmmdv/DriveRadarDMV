export default function IntelligenceSection({
  id,
  title,
  status,
  statusText,
  meta,
  intro,
  children
}) {
  return (
    <section
      className="intelSection"
      id={id}
      aria-labelledby={`${id}-title`}
    >
      <div className="intelSectionHead">
        <div className="intelSectionTitleBlock">
          <h2 id={`${id}-title`}>{title}</h2>
          {intro ? <p className="intelIntro">{intro}</p> : null}
        </div>
        <span className={`intelStatus intelStatus--${status}`}>{statusText}</span>
      </div>
      {meta ? <p className="intelMeta">{meta}</p> : null}
      {children}
    </section>
  );
}

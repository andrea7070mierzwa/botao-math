function RealLifeCard({ items }) {
  return (
    <article className="lesson-card real-life-card">
      <div className="lesson-title">
        <span>🌍</span>
        <h2>Onde vou usar isso?</h2>
      </div>

      <ul className="real-life-list">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  );
}

export default RealLifeCard;

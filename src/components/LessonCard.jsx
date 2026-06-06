function LessonCard({ icon, title, children }) {
  return (
    <article className="lesson-card">
      <div className="lesson-title">
        <span>{icon}</span>
        <h2>{title}</h2>
      </div>

      <div className="lesson-content">{children}</div>
    </article>
  );
}

export default LessonCard;

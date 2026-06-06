const topics = [
  { icon: "🧺", title: "Conjuntos", active: true },
  { icon: "🔢", title: "Números", active: false },
  { icon: "🌡️", title: "Inteiros", active: false },
  { icon: "🍕", title: "Frações", active: false },
  { icon: "📐", title: "Geometria", active: false },
];

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-title">
        <span>🧭</span>
        <div>
          <small>NAVEGAÇÃO</small>
          <h2>Trilhas</h2>
        </div>
      </div>

      <nav className="topic-list">
        {topics.map((topic) => (
          <button
            key={topic.title}
            className={`topic-button ${topic.active ? "active" : ""}`}
          >
            <span>{topic.icon}</span>
            {topic.title}
            {topic.active && <strong>Atual</strong>}
          </button>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;

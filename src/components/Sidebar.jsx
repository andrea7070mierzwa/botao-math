const topics = [
  {
    id: "sets-intro",
    icon: "🧺",
    title: "Conjuntos",
  },
  {
    id: "belongs",
    icon: "🔎",
    title: "Pertence",
  },
  {
    id: "numbers",
    icon: "🔢",
    title: "Números",
    disabled: true,
  },
  {
    id: "integers",
    icon: "🌡️",
    title: "Inteiros",
    disabled: true,
  },
  {
    id: "fractions",
    icon: "🍕",
    title: "Frações",
    disabled: true,
  },
];

function Sidebar({ activeModule, onChangeModule }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-title">
        <span>🧭</span>
        <div>
          <small>NAVEGAÇÃO</small>
          <h2>Trilhas</h2>
        </div>
      </div>

      <nav className="topic-list" aria-label="Trilhas do Botão Math">
        {topics.map((topic) => (
          <button
            key={topic.id}
            className={`topic-button ${
              activeModule === topic.id ? "active" : ""
            }`}
            onClick={() => !topic.disabled && onChangeModule(topic.id)}
            disabled={topic.disabled}
            aria-current={activeModule === topic.id ? "page" : undefined}
          >
            <span aria-hidden="true">{topic.icon}</span>
            {topic.title}
            {activeModule === topic.id && <strong>Atual</strong>}
          </button>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;

import { useState } from "react";

const topicGroups = [
  {
    id: "sets",
    icon: "🧺",
    title: "Conjuntos",
    items: [
      {
        id: "sets-intro",
        icon: "🧺",
        title: "O que é conjunto",
      },
      {
        id: "belongs",
        icon: "🔎",
        title: "Pertence",
      },
      {
        id: "empty-unitary",
        icon: "∅",
        title: "Vazio e unitário",
      },
      {
        id: "union",
        icon: "∪",
        title: "União",
      },
      {
        id: "intersection",
        icon: "∩",
        title: "Interseção",
      },
      {
        id: "difference",
        icon: "−",
        title: "Diferença",
      },
      {
        id: "subsets",
        icon: "⊂",
        title: "Subconjuntos",
      },
      {
        id: "numeric-sets",
        icon: "🔢",
        title: "Conjuntos numéricos",
      },
      {
        id: "sets-summary",
        icon: "📚",
        title: "Resumo da trilha",
      },
      {
        id: "sets-assessment",
        icon: "📝",
        title: "Prova guiada",
      },
    ],
  },
  {
    id: "numbers",
    icon: "🔢",
    title: "Números",
    items: [
      {
        id: "numbers-intro",
        icon: "🔢",
        title: "O que são números?",
      },
      {
        id: "natural-numbers",
        icon: "N",
        title: "Naturais",
      },
      {
        id: "integer-numbers",
        icon: "Z",
        title: "Inteiros",
      },
      {
        id: "rational-numbers",
        icon: "Q",
        title: "Racionais",
      },
      {
        id: "real-numbers",
        icon: "R",
        title: "Reais",
      },
      {
        id: "number-line",
        icon: "📏",
        title: "Reta numérica",
      },
      {
        id: "number-comparison",
        icon: "⚖️",
        title: "Comparação",
      },
      {
        id: "temperature-integers",
        icon: "🌡️",
        title: "Termômetro",
      },
      {
        id: "absolute-value",
        icon: "📍",
        title: "Distância do zero",
      },
      {
        id: "numbers-summary",
        icon: "📚",
        title: "Resumo da trilha",
      },
    ],
  },
  {
    id: "fractions",
    icon: "🍕",
    title: "Frações",
    items: [
      {
        id: "fraction-parts",
        icon: "🍕",
        title: "Parte do todo",
        disabled: true,
      },
      {
        id: "fraction-equivalent",
        icon: "=",
        title: "Equivalentes",
        disabled: true,
      },
    ],
  },
  {
    id: "geometry",
    icon: "📐",
    title: "Geometria",
    items: [
      {
        id: "angles",
        icon: "∠",
        title: "Ângulos",
        disabled: true,
      },
      {
        id: "pythagoras",
        icon: "△",
        title: "Pitágoras",
        disabled: true,
      },
    ],
  },
];

function Sidebar({ activeModule, onChangeModule }) {
  const [openGroups, setOpenGroups] = useState(["sets"]);

  function toggleGroup(groupId) {
    setOpenGroups((currentGroups) => {
      if (currentGroups.includes(groupId)) {
        return currentGroups.filter((id) => id !== groupId);
      }

      return [...currentGroups, groupId];
    });
  }

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
        {topicGroups.map((group) => {
          const isOpen = openGroups.includes(group.id);
          const hasActiveItem = group.items.some(
            (item) => item.id === activeModule
          );

          return (
            <section key={group.id} className="topic-group">
              <button
                type="button"
                className={`topic-group-button ${
                  hasActiveItem ? "has-active" : ""
                }`}
                onClick={() => toggleGroup(group.id)}
                aria-expanded={isOpen}
              >
                <span aria-hidden="true">{group.icon}</span>
                {group.title}
                <strong>{isOpen ? "−" : "+"}</strong>
              </button>

              {isOpen && (
                <div className="topic-submenu">
                  {group.items.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      className={`topic-button ${
                        activeModule === item.id ? "active" : ""
                      }`}
                      onClick={() => !item.disabled && onChangeModule(item.id)}
                      disabled={item.disabled}
                      aria-current={
                        activeModule === item.id ? "page" : undefined
                      }
                    >
                      <span aria-hidden="true">{item.icon}</span>
                      {item.title}
                      {activeModule === item.id && <strong>Atual</strong>}
                    </button>
                  ))}
                </div>
              )}
            </section>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;

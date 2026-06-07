import { useState } from "react";
import LessonCard from "../../components/LessonCard.jsx";
import RealLifeCard from "../../components/RealLifeCard.jsx";
import FeedbackMessage from "../../components/FeedbackMessage.jsx";
import ReadAloudButton from "../../components/ReadAloudButton.jsx";
import TutorAssistant from "../assessments/TutorAssistant.jsx";
import {
  applyEmptyAndUnitaryFilter,
  emptyAndUnitaryData,
} from "../../data/setsData.js";

function EmptyUnitaryActivity() {
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const resultItems = selectedFilter
    ? applyEmptyAndUnitaryFilter(selectedFilter.id, emptyAndUnitaryData.items)
    : [];

  function getSetLabel() {
    if (!selectedFilter) {
      return "{ ? }";
    }

    if (resultItems.length === 0) {
      return "∅";
    }

    return `{ ${resultItems
      .map((item) => `${item.emoji ? `${item.emoji} ` : ""}${item.label}`)
      .join(", ")} }`;
  }

  function getResultName() {
    if (!selectedFilter) {
      return "Escolha uma regra";
    }

    if (resultItems.length === 0) {
      return "Conjunto vazio";
    }

    if (resultItems.length === 1) {
      return "Conjunto unitário";
    }

    return "Conjunto com vários elementos";
  }

  function handleSelectFilter(filter) {
    setSelectedFilter(filter);

    const filteredItems = applyEmptyAndUnitaryFilter(
      filter.id,
      emptyAndUnitaryData.items
    );

    let typeMessage = "conjunto com vários elementos";

    if (filteredItems.length === 0) {
      typeMessage = "conjunto vazio";
    }

    if (filteredItems.length === 1) {
      typeMessage = "conjunto unitário";
    }

    setFeedback({
      type: "success",
      message: `Resultado encontrado: ${typeMessage}. ${filter.explanation}`,
    });
  }

  function handleReset() {
    setSelectedFilter(null);
    setFeedback({
      type: "neutral",
      message:
        "Filtro limpo. Escolha uma nova regra para descobrir que tipo de conjunto aparece.",
    });
  }

  return (
    <div className="sets-page">
      <div className="module-header">
        <span className="module-kicker">Conjuntos — parte 3</span>
        <h1>Vazio, unitário ou com vários elementos?</h1>
        <p>
          Agora vamos ver que o tamanho de um conjunto depende da regra usada
          para escolher seus elementos.
        </p>

        <ReadAloudButton
          label="Ouvir introdução"
          text="Um conjunto pode ser vazio, quando não tem nenhum elemento; unitário, quando tem apenas um elemento; ou ter vários elementos."
        />
      </div>

      <LessonCard icon="🧺" title={emptyAndUnitaryData.title}>
        <p>{emptyAndUnitaryData.explanation}</p>

        <div className="symbol-grid three-columns">
          <div>
            <strong>∅</strong>
            <span>vazio</span>
          </div>

          <div>
            <strong>{"{1}"}</strong>
            <span>unitário</span>
          </div>

          <div>
            <strong>{"{1, 2}"}</strong>
            <span>vários elementos</span>
          </div>
        </div>

        <ReadAloudButton
          text={`${emptyAndUnitaryData.title}. ${emptyAndUnitaryData.explanation}. Conjunto vazio não tem nenhum elemento. Conjunto unitário tem apenas um elemento. Um conjunto com vários elementos tem dois ou mais elementos.`}
        />
      </LessonCard>

      <RealLifeCard items={emptyAndUnitaryData.realLife} />

      <section className="interactive-lab">
        <div className="lab-info">
          <span className="module-kicker">Mexa você</span>
          <h2>Escolha uma regra de filtro</h2>
          <p>
            A lista abaixo tem números e objetos. Clique em uma regra para ver
            quais elementos entram no conjunto resultado.
          </p>

          <ReadAloudButton
            label="Ouvir desafio"
            text="Observe a lista de elementos. Escolha uma regra de filtro. O resultado pode ser um conjunto vazio, unitário ou com vários elementos."
          />
        </div>

        <div className="filter-lab-grid">
          <section className="source-set-card">
            <h3>Lista inicial</h3>

            <div className="source-items">
              {emptyAndUnitaryData.items.map((item) => (
                <span key={item.id} className="source-item">
                  {item.emoji && <span aria-hidden="true">{item.emoji}</span>}
                  {item.label}
                </span>
              ))}
            </div>
          </section>

          <section className="filter-rules-card">
            <h3>Regras</h3>

            <div className="filter-buttons">
              {emptyAndUnitaryData.filters.map((filter) => (
                <button
                  key={filter.id}
                  type="button"
                  className={
                    selectedFilter?.id === filter.id ? "active-filter" : ""
                  }
                  onClick={() => handleSelectFilter(filter)}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </section>

          <section className="result-set-card">
            <h3>Resultado</h3>

            <div className="result-set-display">
              <strong>{getSetLabel()}</strong>
              <span>{getResultName()}</span>
            </div>

            {selectedFilter && (
              <p className="result-explanation">{selectedFilter.explanation}</p>
            )}

            <button
              type="button"
              className="restart-button"
              onClick={handleReset}
            >
              Limpar filtro
            </button>
          </section>
        </div>

        <FeedbackMessage
          feedback={feedback}
          fallbackText="Escolha uma regra para descobrir se o resultado é vazio, unitário ou tem vários elementos."
        />

        <TutorAssistant topic="conjunto vazio e unitário" />
      </section>

      <LessonCard icon="🛟" title="Resumo de sobrevivência">
        <p>
          Se nenhuma coisa obedece à regra, temos um{" "}
          <strong>conjunto vazio</strong>. Se apenas uma coisa obedece à regra,
          temos um <strong>conjunto unitário</strong>. Se duas ou mais coisas
          obedecem à regra, temos um conjunto com vários elementos.
        </p>
      </LessonCard>
    </div>
  );
}

export default EmptyUnitaryActivity;

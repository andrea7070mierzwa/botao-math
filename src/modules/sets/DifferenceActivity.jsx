import { useState } from "react";
import LessonCard from "../../components/LessonCard.jsx";
import RealLifeCard from "../../components/RealLifeCard.jsx";
import FeedbackMessage from "../../components/FeedbackMessage.jsx";
import ReadAloudButton from "../../components/ReadAloudButton.jsx";
import TutorAssistant from "../assessments/TutorAssistant.jsx";
import { differenceData, getDifference } from "../../data/setsData.js";

function DifferenceActivity() {
  const [selectedDifference, setSelectedDifference] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const differenceAB = getDifference(
    differenceData.setA.elements,
    differenceData.setB.elements
  );

  const differenceBA = getDifference(
    differenceData.setB.elements,
    differenceData.setA.elements
  );

  const commonElements = differenceData.setA.elements.filter((element) =>
    differenceData.setB.elements.includes(element)
  );

  function formatSet(elements) {
    if (elements.length === 0) {
      return "∅";
    }

    return `{ ${elements.join(", ")} }`;
  }

  function handleShowDifference(type) {
    setSelectedDifference(type);

    if (type === "A-B") {
      setFeedback({
        type: "success",
        message:
          "Mostramos A - B: elementos que estão em A, mas não estão em B.",
      });
      return;
    }

    setFeedback({
      type: "success",
      message: "Mostramos B - A: elementos que estão em B, mas não estão em A.",
    });
  }

  function handleReset() {
    setSelectedDifference(null);
    setFeedback({
      type: "neutral",
      message:
        "Resultado escondido. Pode investigar outra diferença: a matemática adora comparar listas.",
    });
  }

  function getResultElements() {
    if (selectedDifference === "A-B") {
      return differenceAB;
    }

    if (selectedDifference === "B-A") {
      return differenceBA;
    }

    return [];
  }

  function getResultTitle() {
    if (selectedDifference === "A-B") {
      return "A - B";
    }

    if (selectedDifference === "B-A") {
      return "B - A";
    }

    return "Escolha uma diferença";
  }

  function getExplanation() {
    if (selectedDifference === "A-B") {
      return `A - B = ${formatSet(
        differenceAB
      )}. Esses elementos estão em A, mas não aparecem em B.`;
    }

    if (selectedDifference === "B-A") {
      return `B - A = ${formatSet(
        differenceBA
      )}. Esses elementos estão em B, mas não aparecem em A.`;
    }

    return "Clique em uma das opções para ver o resultado.";
  }

  function getItemClass(element, setName) {
    const isCommon = commonElements.includes(element);

    if (selectedDifference === "A-B" && setName === "A") {
      return isCommon ? "venn-item muted" : "venn-item difference";
    }

    if (selectedDifference === "A-B" && setName === "B") {
      return "venn-item muted";
    }

    if (selectedDifference === "B-A" && setName === "B") {
      return isCommon ? "venn-item muted" : "venn-item difference";
    }

    if (selectedDifference === "B-A" && setName === "A") {
      return "venn-item muted";
    }

    return isCommon ? "venn-item common" : "venn-item";
  }

  const resultElements = getResultElements();

  return (
    <div className="sets-page">
      <div className="module-header">
        <span className="module-kicker">Conjuntos — parte 6</span>
        <h1>Diferença de conjuntos</h1>
        <p>
          Agora vamos comparar dois conjuntos para descobrir o que existe em um,
          mas não existe no outro.
        </p>

        <ReadAloudButton
          label="Ouvir introdução"
          text="Diferença de conjuntos é quando observamos os elementos que estão em um conjunto, mas não estão no outro."
        />
      </div>

      <LessonCard icon="−" title={differenceData.title}>
        <p>{differenceData.explanation}</p>

        <div className="symbol-grid">
          <div>
            <strong>A - B</strong>
            <span>está em A, mas não em B</span>
          </div>

          <div>
            <strong>B - A</strong>
            <span>está em B, mas não em A</span>
          </div>
        </div>

        <ReadAloudButton
          text={`${differenceData.title}. ${differenceData.explanation}. A menos B mostra o que está em A, mas não está em B. B menos A mostra o que está em B, mas não está em A.`}
        />
      </LessonCard>

      <RealLifeCard items={differenceData.realLife} />

      <section className="interactive-lab">
        <div className="lab-info">
          <span className="module-kicker">Veja acontecendo</span>
          <h2>Compare os conjuntos A e B</h2>
          <p>
            Escolha se quer ver <strong>A - B</strong> ou <strong>B - A</strong>
            . A ordem importa: trocar a ordem muda o resultado.
          </p>

          <ReadAloudButton
            label="Ouvir desafio"
            text="Observe os conjuntos A e B. O conjunto A tem os números um, dois, três e quatro. O conjunto B tem os números três, quatro e cinco. A menos B mostra um e dois. B menos A mostra cinco."
          />
        </div>

        <div className="difference-lab">
          <section className="venn-card">
            <h3>A = {formatSet(differenceData.setA.elements)}</h3>

            <div className="venn-circle circle-a">
              {differenceData.setA.elements.map((element) => (
                <span
                  key={`a-${element}`}
                  className={getItemClass(element, "A")}
                >
                  {element}
                </span>
              ))}
            </div>
          </section>

          <section className="venn-card">
            <h3>B = {formatSet(differenceData.setB.elements)}</h3>

            <div className="venn-circle circle-b">
              {differenceData.setB.elements.map((element) => (
                <span
                  key={`b-${element}`}
                  className={getItemClass(element, "B")}
                >
                  {element}
                </span>
              ))}
            </div>
          </section>

          <section className="difference-action-card">
            <button
              type="button"
              className={
                selectedDifference === "A-B"
                  ? "difference-button active"
                  : "difference-button"
              }
              onClick={() => handleShowDifference("A-B")}
            >
              Ver A - B
            </button>

            <button
              type="button"
              className={
                selectedDifference === "B-A"
                  ? "difference-button active"
                  : "difference-button"
              }
              onClick={() => handleShowDifference("B-A")}
            >
              Ver B - A
            </button>

            <button
              type="button"
              className="restart-button"
              onClick={handleReset}
            >
              Esconder resultado
            </button>
          </section>

          <section
            className={`union-result-card ${selectedDifference ? "show" : ""}`}
          >
            <span className="module-kicker">Resultado</span>

            <h3>{getResultTitle()}</h3>

            <div className="union-result-display difference-result-display">
              {selectedDifference ? (
                resultElements.length > 0 ? (
                  resultElements.map((element) => (
                    <span
                      key={`difference-${element}`}
                      className="union-item difference"
                    >
                      {element}
                    </span>
                  ))
                ) : (
                  <strong className="empty-result">∅</strong>
                )
              ) : (
                <p>Clique em “Ver A - B” ou “Ver B - A”.</p>
              )}
            </div>

            {selectedDifference && (
              <p className="result-explanation">{getExplanation()}</p>
            )}
          </section>
        </div>

        <FeedbackMessage feedback={feedback} />

        <TutorAssistant topic="diferença de conjuntos" />
      </section>

      <LessonCard icon="🛟" title="Resumo de sobrevivência">
        <p>
          Diferença é comparar. <strong>A - B</strong> mostra o que está em A e
          não está em B. <strong>B - A</strong> mostra o que está em B e não
          está em A. Trocar a ordem muda o resultado — matemática também tem
          senso de direção.
        </p>
      </LessonCard>
    </div>
  );
}

export default DifferenceActivity;

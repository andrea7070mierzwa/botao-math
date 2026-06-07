import { useState } from "react";
import LessonCard from "../../components/LessonCard.jsx";
import RealLifeCard from "../../components/RealLifeCard.jsx";
import FeedbackMessage from "../../components/FeedbackMessage.jsx";
import ReadAloudButton from "../../components/ReadAloudButton.jsx";

import { getIntersection, intersectionData } from "../../data/setsData.js";

function IntersectionActivity() {
  const [showIntersection, setShowIntersection] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const intersectionResult = getIntersection(
    intersectionData.setA.elements,
    intersectionData.setB.elements
  );

  function handleShowIntersection() {
    setShowIntersection(true);

    setFeedback({
      type: "success",
      message:
        "Interseção encontrada! Mostramos apenas os elementos que aparecem em A e B ao mesmo tempo.",
    });
  }

  function handleReset() {
    setShowIntersection(false);

    setFeedback({
      type: "neutral",
      message:
        "Resultado escondido novamente. Pode investigar de novo: a matemática adora uma segunda olhada.",
    });
  }

  function formatSet(elements) {
    if (elements.length === 0) {
      return "∅";
    }

    return `{ ${elements.join(", ")} }`;
  }

  function isCommonElement(element) {
    return intersectionResult.includes(element);
  }

  return (
    <div className="sets-page">
      <div className="module-header">
        <span className="module-kicker">Conjuntos — parte 5</span>
        <h1>Interseção de conjuntos</h1>
        <p>
          Agora vamos encontrar o que dois conjuntos têm em comum. A interseção
          mostra apenas os elementos que aparecem nos dois conjuntos ao mesmo
          tempo.
        </p>

        <ReadAloudButton
          label="Ouvir introdução"
          text="Interseção de conjuntos é quando observamos apenas os elementos que aparecem nos dois conjuntos ao mesmo tempo."
        />
      </div>

      <LessonCard icon="∩" title={intersectionData.title}>
        <p>{intersectionData.explanation}</p>

        <div className="symbol-grid">
          <div>
            <strong>∩</strong>
            <span>interseção</span>
          </div>

          <div>
            <strong>A ∩ B</strong>
            <span>A interseção B</span>
          </div>
        </div>

        <ReadAloudButton
          text={`${intersectionData.title}. ${intersectionData.explanation}. O símbolo da interseção parece uma letra U virada para baixo e mostra o que os conjuntos têm em comum.`}
        />
      </LessonCard>

      <RealLifeCard items={intersectionData.realLife} />

      <section className="interactive-lab">
        <div className="lab-info">
          <span className="module-kicker">Veja acontecendo</span>
          <h2>Encontre o que A e B têm em comum</h2>
          <p>
            Clique no botão para destacar apenas os elementos que aparecem nos
            dois conjuntos.
          </p>

          <ReadAloudButton
            label="Ouvir desafio"
            text="Observe os conjuntos A e B. O conjunto A tem os números um, dois, três e quatro. O conjunto B tem os números três, quatro, cinco e seis. A interseção mostra apenas os números três e quatro, porque eles aparecem nos dois conjuntos."
          />
        </div>

        <div className="venn-intersection-lab">
          <section className="venn-card">
            <h3>A = {formatSet(intersectionData.setA.elements)}</h3>

            <div className="venn-circle circle-a">
              {intersectionData.setA.elements.map((element) => (
                <span
                  key={`a-${element}`}
                  className={
                    isCommonElement(element) ? "venn-item common" : "venn-item"
                  }
                >
                  {element}
                </span>
              ))}
            </div>
          </section>

          <section className="venn-card">
            <h3>B = {formatSet(intersectionData.setB.elements)}</h3>

            <div className="venn-circle circle-b">
              {intersectionData.setB.elements.map((element) => (
                <span
                  key={`b-${element}`}
                  className={
                    isCommonElement(element) ? "venn-item common" : "venn-item"
                  }
                >
                  {element}
                </span>
              ))}
            </div>
          </section>

          <section className="union-action-card">
            <button
              type="button"
              className="union-button"
              onClick={handleShowIntersection}
            >
              Fazer A ∩ B
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
            className={`union-result-card ${showIntersection ? "show" : ""}`}
          >
            <span className="module-kicker">Resultado</span>

            <h3>A ∩ B</h3>

            <div className="union-result-display intersection-result-display">
              {showIntersection ? (
                intersectionResult.map((element) => (
                  <span
                    key={`intersection-${element}`}
                    className="union-item common"
                  >
                    {element}
                  </span>
                ))
              ) : (
                <p>Clique em “Fazer A ∩ B” para ver o resultado.</p>
              )}
            </div>

            {showIntersection && (
              <p className="result-explanation">
                A ∩ B = {formatSet(intersectionResult)}. Esses são os elementos
                que aparecem nos dois conjuntos ao mesmo tempo.
              </p>
            )}
          </section>
        </div>

        <FeedbackMessage
          feedback={feedback}
          fallbackText="Clique em Fazer A ∩ B para descobrir o que os conjuntos têm em comum."
        />

        <TutorAssistant topic="interseção de conjuntos" />
      </section>

      <LessonCard icon="🛟" title="Resumo de sobrevivência">
        <p>
          Interseção é o que os conjuntos têm em comum. Se um elemento aparece
          em A e também aparece em B, ele entra em <strong>A ∩ B</strong>. É o
          famoso “está nos dois lugares ao mesmo tempo”, sem precisar virar
          ficção científica.
        </p>
      </LessonCard>
    </div>
  );
}

export default IntersectionActivity;

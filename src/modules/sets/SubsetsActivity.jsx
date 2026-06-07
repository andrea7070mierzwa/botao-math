import { useState } from "react";
import LessonCard from "../../components/LessonCard.jsx";
import RealLifeCard from "../../components/RealLifeCard.jsx";
import FeedbackMessage from "../../components/FeedbackMessage.jsx";
import ReadAloudButton from "../../components/ReadAloudButton.jsx";

import { isSubset, subsetsData } from "../../data/setsData.js";

function SubsetsActivity() {
  const [selectedExample, setSelectedExample] = useState(
    subsetsData.examples[0]
  );
  const [feedback, setFeedback] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const subsetResult = isSubset(selectedExample.setA, selectedExample.setB);

  function formatSet(elements) {
    if (elements.length === 0) {
      return "∅";
    }

    return `{ ${elements.join(", ")} }`;
  }

  function handleSelectExample(example) {
    setSelectedExample(example);
    setShowResult(false);
    setFeedback({
      type: "neutral",
      message:
        "Exemplo trocado. Observe os elementos com calma antes de verificar.",
    });
  }

  function handleCheckSubset() {
    setShowResult(true);

    setFeedback({
      type: subsetResult ? "success" : "error",
      message: selectedExample.explanation,
    });
  }

  function getItemClass(element) {
    if (!showResult) {
      return "subset-item";
    }

    if (selectedExample.setB.includes(element)) {
      return "subset-item included";
    }

    return "subset-item missing";
  }

  function getResultText() {
    if (!showResult) {
      return "Clique em verificar para descobrir.";
    }

    if (subsetResult) {
      return "Sim. O primeiro conjunto é subconjunto do segundo.";
    }

    return "Não. Existe pelo menos um elemento fora do conjunto maior.";
  }

  return (
    <div className="sets-page">
      <div className="module-header">
        <span className="module-kicker">Conjuntos — parte 7</span>
        <h1>Subconjuntos</h1>
        <p>
          Agora vamos ver quando um conjunto está completamente dentro de outro.
          É a ideia de grupo menor dentro de grupo maior.
        </p>

        <ReadAloudButton
          label="Ouvir introdução"
          text="Subconjunto é quando todos os elementos de um conjunto também aparecem dentro de outro conjunto maior."
        />
      </div>

      <LessonCard icon="⊂" title={subsetsData.title}>
        <p>{subsetsData.explanation}</p>

        <div className="symbol-grid">
          <div>
            <strong>⊂</strong>
            <span>é subconjunto de</span>
          </div>

          <div>
            <strong>A ⊂ B</strong>
            <span>A está dentro de B</span>
          </div>
        </div>

        <ReadAloudButton
          text={`${subsetsData.title}. ${subsetsData.explanation}. Se todos os elementos de A aparecem em B, então A é subconjunto de B.`}
        />
      </LessonCard>

      <RealLifeCard items={subsetsData.realLife} />

      <section className="interactive-lab">
        <div className="lab-info">
          <span className="module-kicker">Veja acontecendo</span>
          <h2>Confira se um conjunto está dentro do outro</h2>
          <p>
            Escolha um exemplo e verifique se todos os elementos do conjunto
            menor aparecem no conjunto maior.
          </p>

          <ReadAloudButton
            label="Ouvir desafio"
            text="Escolha um exemplo. Observe se todos os elementos do primeiro conjunto aparecem no segundo conjunto. Se todos aparecem, temos um subconjunto."
          />
        </div>
        <div className="subset-example-buttons">
          {subsetsData.examples.map((example) => (
            <button
              key={example.id}
              type="button"
              className={
                selectedExample.id === example.id
                  ? "subset-example-button active"
                  : "subset-example-button"
              }
              onClick={() => handleSelectExample(example)}
            >
              {example.title}
            </button>
          ))}
        </div>
        <div className="subset-lab">
          <section className="subset-big-box">
            <h3>Conjunto maior</h3>
            <strong>B = {formatSet(selectedExample.setB)}</strong>

            <div className="subset-box-area">
              {selectedExample.setB.map((element) => (
                <span key={`big-${element}`} className="subset-big-item">
                  {element}
                </span>
              ))}

              <div className="subset-small-box">
                <h4>Conjunto menor</h4>
                <strong>A = {formatSet(selectedExample.setA)}</strong>

                <div className="subset-small-items">
                  {selectedExample.setA.map((element) => (
                    <span
                      key={`small-${element}`}
                      className={getItemClass(element)}
                    >
                      {element}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="subset-result-card">
            <span className="module-kicker">Pergunta</span>
            <h3>A é subconjunto de B?</h3>

            <div className="subset-expression">
              <strong>A ⊂ B</strong>
            </div>

            <button
              type="button"
              className="union-button"
              onClick={handleCheckSubset}
            >
              Verificar
            </button>

            <p className="result-explanation">{getResultText()}</p>

            {showResult && (
              <p className="result-explanation">
                {selectedExample.explanation}
              </p>
            )}
          </section>
        </div>
        touch
        <FeedbackMessage
          feedback={feedback}
          fallbackText="Escolha um exemplo e clique em verificar para saber se é subconjunto."
        />
        <TutorAssistant topic="subconjuntos" />
      </section>

      <LessonCard icon="🛟" title="Resumo de sobrevivência">
        <p>
          Um conjunto é subconjunto de outro quando todos os seus elementos
          cabem dentro do conjunto maior. Se um único elemento ficou de fora,
          pronto: já não é subconjunto. Matemática às vezes é exigente, mas pelo
          menos avisa a regra.
        </p>
      </LessonCard>
    </div>
  );
}

export default SubsetsActivity;

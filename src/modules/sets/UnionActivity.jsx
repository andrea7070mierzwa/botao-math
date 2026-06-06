import { useState } from "react";
import LessonCard from "../../components/LessonCard.jsx";
import RealLifeCard from "../../components/RealLifeCard.jsx";
import FeedbackMessage from "../../components/FeedbackMessage.jsx";
import ReadAloudButton from "../../components/ReadAloudButton.jsx";
import TutorAssistant from "../assessments/TutorAssistant.jsx";
import { getUnion, unionData } from "../../data/setsData.js";

function UnionActivity() {
  const [showUnion, setShowUnion] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const unionResult = getUnion(
    unionData.setA.elements,
    unionData.setB.elements
  );
  const repeatedElements = unionData.setA.elements.filter((element) =>
    unionData.setB.elements.includes(element)
  );

  function handleShowUnion() {
    setShowUnion(true);

    setFeedback({
      type: "success",
      message:
        "União realizada! Juntamos os elementos de A e B, mas sem repetir quem já estava nos dois conjuntos.",
    });
  }

  function handleReset() {
    setShowUnion(false);

    setFeedback({
      type: "neutral",
      message:
        "Resultado escondido novamente. Pode unir de novo sem medo: conjunto não guarda rancor.",
    });
  }

  function formatSet(elements) {
    return `{ ${elements.join(", ")} }`;
  }

  return (
    <div className="sets-page">
      <div className="module-header">
        <span className="module-kicker">Conjuntos — parte 4</span>
        <h1>União de conjuntos</h1>
        <p>
          Agora vamos aprender a juntar dois conjuntos em um só, sem repetir os
          elementos que aparecem nos dois.
        </p>

        <ReadAloudButton
          label="Ouvir introdução"
          text="União de conjuntos é quando juntamos todos os elementos de dois conjuntos, sem repetir elementos iguais."
        />
      </div>

      <LessonCard icon="∪" title={unionData.title}>
        <p>{unionData.explanation}</p>

        <div className="symbol-grid">
          <div>
            <strong>∪</strong>
            <span>união</span>
          </div>

          <div>
            <strong>A ∪ B</strong>
            <span>A união B</span>
          </div>
        </div>

        <ReadAloudButton
          text={`${unionData.title}. ${unionData.explanation}. O símbolo da união parece uma letra U e significa juntar os elementos dos conjuntos.`}
        />
      </LessonCard>

      <RealLifeCard items={unionData.realLife} />

      <section className="interactive-lab">
        <div className="lab-info">
          <span className="module-kicker">Veja acontecendo</span>
          <h2>Una os conjuntos A e B</h2>
          <p>
            Clique no botão para juntar todos os elementos dos dois conjuntos. O
            número repetido aparece apenas uma vez no resultado.
          </p>

          <ReadAloudButton
            label="Ouvir desafio"
            text="Observe os conjuntos A e B. O conjunto A tem os números um, dois e três. O conjunto B tem os números três, quatro e cinco. A união junta todos os elementos sem repetir o número três."
          />
        </div>

        <div className="venn-union-lab">
          <section className="venn-card">
            <h3>A = {formatSet(unionData.setA.elements)}</h3>

            <div className="venn-circle circle-a">
              {unionData.setA.elements.map((element) => (
                <span
                  key={`a-${element}`}
                  className={
                    repeatedElements.includes(element)
                      ? "venn-item repeated"
                      : "venn-item"
                  }
                >
                  {element}
                </span>
              ))}
            </div>
          </section>

          <section className="venn-card">
            <h3>B = {formatSet(unionData.setB.elements)}</h3>

            <div className="venn-circle circle-b">
              {unionData.setB.elements.map((element) => (
                <span
                  key={`b-${element}`}
                  className={
                    repeatedElements.includes(element)
                      ? "venn-item repeated"
                      : "venn-item"
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
              onClick={handleShowUnion}
            >
              Fazer A ∪ B
            </button>

            <button
              type="button"
              className="restart-button"
              onClick={handleReset}
            >
              Esconder resultado
            </button>
          </section>

          <section className={`union-result-card ${showUnion ? "show" : ""}`}>
            <span className="module-kicker">Resultado</span>

            <h3>A ∪ B</h3>

            <div className="union-result-display">
              {showUnion ? (
                unionResult.map((element) => (
                  <span
                    key={`union-${element}`}
                    className={
                      repeatedElements.includes(element)
                        ? "union-item repeated"
                        : "union-item"
                    }
                  >
                    {element}
                  </span>
                ))
              ) : (
                <p>Clique em “Fazer A ∪ B” para ver o resultado.</p>
              )}
            </div>

            {showUnion && (
              <p className="result-explanation">
                A ∪ B = {formatSet(unionResult)}. O número{" "}
                {repeatedElements.join(", ")} apareceu nos dois conjuntos, mas
                entrou uma vez só no resultado.
              </p>
            )}
          </section>
        </div>

        <FeedbackMessage feedback={feedback} />

        <TutorAssistant topic="união de conjuntos" />
      </section>

      <LessonCard icon="🛟" title="Resumo de sobrevivência">
        <p>
          União é juntar todos os elementos dos conjuntos. Se um elemento
          aparece nos dois, ele não precisa aparecer duas vezes no resultado. Em
          conjunto, repetido não ganha cadeira extra.
        </p>
      </LessonCard>
    </div>
  );
}

export default UnionActivity;

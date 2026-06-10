import { useState } from "react";
import LessonCard from "../../components/LessonCard.jsx";
import RealLifeCard from "../../components/RealLifeCard.jsx";
import FeedbackMessage from "../../components/FeedbackMessage.jsx";
import ReadAloudButton from "../../components/ReadAloudButton.jsx";

const numberLineValues = [-10, -8, -5, -3, -1, 0, 1, 2, 4, 6, 8, 10];

const comparisonChallenges = [
  {
    id: 1,
    question: "Qual número é maior?",
    options: [-2, -5],
    correct: -2,
    explanation:
      "-2 é maior que -5 porque fica mais à direita na reta numérica.",
  },
  {
    id: 2,
    question: "Qual número fica mais à esquerda?",
    options: [3, -4],
    correct: -4,
    explanation:
      "-4 fica mais à esquerda que 3. Na reta numérica, esquerda indica valores menores.",
  },
  {
    id: 3,
    question: "Qual número está mais perto do zero?",
    options: [-7, 2],
    correct: 2,
    explanation:
      "2 está mais perto do zero do que -7. Distância do zero não é a mesma coisa que ser maior.",
  },
];

function NumberLineActivity() {
  const [selectedNumber, setSelectedNumber] = useState(0);
  const [activeChallenge, setActiveChallenge] = useState(
    comparisonChallenges[0]
  );
  const [feedback, setFeedback] = useState(null);

  function getMarkerPosition(value) {
    const min = -10;
    const max = 10;
    const percent = ((value - min) / (max - min)) * 100;

    return `${Math.max(0, Math.min(100, percent))}%`;
  }

  function handleSelectNumber(value) {
    setSelectedNumber(value);

    if (value < 0) {
      setFeedback({
        type: "success",
        message: `${value} fica à esquerda do zero. Ele é um número negativo.`,
      });
      return;
    }

    if (value > 0) {
      setFeedback({
        type: "success",
        message: `${value} fica à direita do zero. Ele é um número positivo.`,
      });
      return;
    }

    setFeedback({
      type: "neutral",
      message:
        "O zero fica no centro da reta. Ele separa os negativos dos positivos.",
    });
  }

  function handleChallengeAnswer(option) {
    const gotItRight = option === activeChallenge.correct;

    setFeedback({
      type: gotItRight ? "success" : "error",
      message: gotItRight
        ? `Isso! ${activeChallenge.explanation}`
        : `Ainda não. ${activeChallenge.explanation}`,
    });

    setSelectedNumber(option);
  }

  function handleNextChallenge() {
    const currentIndex = comparisonChallenges.findIndex(
      (challenge) => challenge.id === activeChallenge.id
    );

    const nextIndex = (currentIndex + 1) % comparisonChallenges.length;
    const nextChallenge = comparisonChallenges[nextIndex];

    setActiveChallenge(nextChallenge);
    setFeedback({
      type: "neutral",
      message: "Novo desafio carregado. Observe a reta antes de responder.",
    });
  }

  const readText =
    "A reta numérica mostra os números organizados em uma linha. Quanto mais à direita, maior é o número. Quanto mais à esquerda, menor é o número. O zero fica no meio, separando os negativos dos positivos.";

  return (
    <main className="lesson-page">
      <div className="module-header">
        <span className="module-kicker">Trilha 2 — Números</span>
        <h1>Reta numérica</h1>
        <p>
          Agora vamos ver os números como posições em uma linha. Isso ajuda a
          entender maior, menor, antes, depois, negativos e positivos.
        </p>

        <ReadAloudButton label="Ouvir introdução" text={readText} />
      </div>

      <LessonCard icon="📏" title="O que é a reta numérica?">
        <p>
          A reta numérica organiza os números em uma linha. Os números menores
          ficam mais à esquerda, e os maiores ficam mais à direita.
        </p>

        <div className="number-line-rule-card">
          <div>
            <strong>← menor</strong>
            <span>mais à esquerda</span>
          </div>

          <div>
            <strong>0</strong>
            <span>ponto de equilíbrio</span>
          </div>

          <div>
            <strong>maior →</strong>
            <span>mais à direita</span>
          </div>
        </div>

        <p className="chain-note">
          Essa ideia ajuda muito quando comparamos números negativos. Por
          exemplo: -2 é maior que -5 porque está mais à direita.
        </p>

        <ReadAloudButton text="Na reta numérica, os números menores ficam à esquerda e os números maiores ficam à direita. O zero separa os negativos dos positivos." />
      </LessonCard>

      <RealLifeCard
        items={[
          "Temperaturas abaixo e acima de zero",
          "Andares abaixo e acima do térreo",
          "Saldo negativo e positivo",
          "Linha do tempo",
          "Altitude abaixo ou acima do nível do mar",
          "Comparação de pontuações",
        ]}
      />

      <section className="interactive-lab">
        <div className="lab-info">
          <span className="module-kicker">Mexa você</span>
          <h2>Explore posições na reta</h2>
          <p>
            Clique em um número para mover o marcador. Observe se ele fica antes
            ou depois do zero.
          </p>

          <ReadAloudButton
            label="Ouvir desafio"
            text="Clique em um número para mover o marcador na reta numérica. Números negativos ficam à esquerda do zero. Números positivos ficam à direita do zero."
          />
        </div>

        <div className="number-line-lab">
          <section className="number-line-main-card">
            <h3>Reta de -10 a 10</h3>

            <div className="interactive-number-line">
              <div className="number-line-track-large">
                {[-10, -5, 0, 5, 10].map((tick) => (
                  <span
                    key={tick}
                    className="number-line-large-tick"
                    style={{ left: getMarkerPosition(tick) }}
                  >
                    {tick}
                  </span>
                ))}

                <div
                  className="number-line-large-marker"
                  style={{ left: getMarkerPosition(selectedNumber) }}
                >
                  {selectedNumber}
                </div>
              </div>
            </div>

            <div className="number-line-buttons">
              {numberLineValues.map((value) => (
                <button
                  key={value}
                  type="button"
                  className={
                    selectedNumber === value
                      ? "number-line-button active"
                      : "number-line-button"
                  }
                  onClick={() => handleSelectNumber(value)}
                >
                  {value}
                </button>
              ))}
            </div>

            <div className="selected-line-card" aria-live="polite">
              <span className="module-kicker">Selecionado</span>
              <h3>{selectedNumber}</h3>

              {selectedNumber < 0 && (
                <p>Está à esquerda do zero. É um número negativo.</p>
              )}

              {selectedNumber === 0 && (
                <p>Está no centro. O zero separa negativos e positivos.</p>
              )}

              {selectedNumber > 0 && (
                <p>Está à direita do zero. É um número positivo.</p>
              )}
            </div>
          </section>

          <section className="number-line-challenge-card">
            <h3>Desafio rápido</h3>

            <p>{activeChallenge.question}</p>

            <div className="challenge-options">
              {activeChallenge.options.map((option) => (
                <button
                  key={option}
                  type="button"
                  className="challenge-option-button"
                  onClick={() => handleChallengeAnswer(option)}
                >
                  {option}
                </button>
              ))}
            </div>

            <button
              type="button"
              className="restart-button"
              onClick={handleNextChallenge}
            >
              Trocar desafio
            </button>
          </section>
        </div>

        <FeedbackMessage
          feedback={feedback}
          fallbackText="Clique em um número na reta ou responda ao desafio."
        />
      </section>

      <LessonCard icon="🛟" title="Resumo de sobrevivência">
        <p>
          Na reta numérica, quanto mais à direita, maior é o número. Quanto mais
          à esquerda, menor é o número. O zero fica entre negativos e positivos.
          Se lembrar disso, os negativos começam a perder a pose de vilões.
        </p>
      </LessonCard>
    </main>
  );
}

export default NumberLineActivity;

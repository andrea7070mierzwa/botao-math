import { useState } from "react";
import LessonCard from "../../components/LessonCard.jsx";
import RealLifeCard from "../../components/RealLifeCard.jsx";
import FeedbackMessage from "../../components/FeedbackMessage.jsx";
import ReadAloudButton from "../../components/ReadAloudButton.jsx";

const absoluteValues = [-6, -4, -2, -1, 0, 1, 2, 4, 6];

const moduleChallenges = [
  {
    id: 1,
    number: -5,
    answer: 5,
    options: [5, -5, 0],
    explanation: "|-5| = 5 porque -5 está a 5 passos de distância do zero.",
  },
  {
    id: 2,
    number: 3,
    answer: 3,
    options: [-3, 0, 3],
    explanation: "|3| = 3 porque 3 está a 3 passos de distância do zero.",
  },
  {
    id: 3,
    number: 0,
    answer: 0,
    options: [-1, 0, 1],
    explanation: "|0| = 0 porque o zero está exatamente no próprio zero.",
  },
];

function AbsoluteValueActivity() {
  const [selectedNumber, setSelectedNumber] = useState(-4);
  const [activeChallenge, setActiveChallenge] = useState(moduleChallenges[0]);
  const [feedback, setFeedback] = useState(null);

  const distanceFromZero = Math.abs(selectedNumber);

  function getMarkerPosition(value) {
    const min = -6;
    const max = 6;
    const percent = ((value - min) / (max - min)) * 100;

    return `${Math.max(0, Math.min(100, percent))}%`;
  }

  function handleSelectNumber(value) {
    setSelectedNumber(value);

    setFeedback({
      type: "success",
      message: `A distância de ${value} até o zero é ${Math.abs(
        value
      )}. Distância nunca fica negativa.`,
    });
  }

  function handleChallengeAnswer(option) {
    const gotItRight = option === activeChallenge.answer;

    setSelectedNumber(activeChallenge.number);

    setFeedback({
      type: gotItRight ? "success" : "error",
      message: gotItRight
        ? `Isso! ${activeChallenge.explanation}`
        : `Ainda não. ${activeChallenge.explanation}`,
    });
  }

  function handleNextChallenge() {
    const currentIndex = moduleChallenges.findIndex(
      (challenge) => challenge.id === activeChallenge.id
    );

    const nextChallenge =
      moduleChallenges[(currentIndex + 1) % moduleChallenges.length];

    setActiveChallenge(nextChallenge);
    setSelectedNumber(nextChallenge.number);
    setFeedback({
      type: "neutral",
      message:
        "Novo desafio carregado. Conte quantos passos o número está distante do zero.",
    });
  }

  const readText =
    "A distância do zero mostra quantos passos um número está longe do zero na reta numérica. Essa distância também é chamada de módulo. O módulo nunca é negativo. Por exemplo, o módulo de menos quatro é quatro, e o módulo de quatro também é quatro.";

  return (
    <main className="lesson-page">
      <div className="module-header">
        <span className="module-kicker">Trilha 2 — Números</span>
        <h1>Distância do zero</h1>
        <p>
          Agora vamos entender uma ideia muito importante: a distância de um
          número até o zero. Na matemática, essa distância também é chamada de
          módulo.
        </p>

        <ReadAloudButton label="Ouvir introdução" text={readText} />
      </div>

      <LessonCard icon="📍" title="O que é distância do zero?">
        <p>
          A distância do zero mostra quantos passos um número está longe do{" "}
          <strong>0</strong> na reta numérica.
        </p>

        <p>
          Por exemplo, <strong>-4</strong> e <strong>4</strong> ficam em lados
          opostos, mas os dois estão a <strong>4 passos</strong> do zero.
        </p>

        <div className="absolute-rule-card">
          <div>
            <strong>|-4| = 4</strong>
            <span>-4 está a 4 passos do zero</span>
          </div>

          <div>
            <strong>|4| = 4</strong>
            <span>4 também está a 4 passos do zero</span>
          </div>

          <div>
            <strong>|0| = 0</strong>
            <span>zero não está distante dele mesmo</span>
          </div>
        </div>

        <p className="chain-note">
          O símbolo <strong>| |</strong> é chamado de módulo. Ele pergunta:
          “qual é a distância até o zero?” E distância não usa sinal de menos.
        </p>

        <ReadAloudButton text="O módulo mostra a distância de um número até o zero. O módulo de menos quatro é quatro. O módulo de quatro também é quatro. Distância nunca é negativa." />
      </LessonCard>

      <RealLifeCard
        items={[
          "Medir distância em uma estrada",
          "Comparar quanto uma temperatura se afastou de zero",
          "Ver quanto um saldo está longe de zerar",
          "Entender deslocamentos para esquerda e direita",
          "Comparar posições na reta numérica",
          "Separar valor do número e distância até o zero",
        ]}
      />

      <section className="interactive-lab">
        <div className="lab-info">
          <span className="module-kicker">Mexa você</span>
          <h2>Veja a distância até o zero</h2>
          <p>
            Clique em um número e observe quantos passos ele está distante do
            zero.
          </p>

          <ReadAloudButton
            label="Ouvir desafio"
            text="Clique em um número. Observe a distância desse número até o zero. Números negativos podem estar longe do zero, mas a distância sempre é positiva."
          />
        </div>

        <div className="absolute-lab">
          <section className="absolute-line-card">
            <h3>Reta numérica</h3>

            <div className="absolute-number-line">
              <div className="absolute-line-track">
                {[-6, -3, 0, 3, 6].map((tick) => (
                  <span
                    key={tick}
                    className="absolute-line-tick"
                    style={{ left: getMarkerPosition(tick) }}
                  >
                    {tick}
                  </span>
                ))}

                <div
                  className="absolute-distance"
                  style={{
                    left:
                      selectedNumber < 0
                        ? getMarkerPosition(selectedNumber)
                        : getMarkerPosition(0),
                    width: `${Math.abs(
                      Number.parseFloat(getMarkerPosition(selectedNumber)) -
                        Number.parseFloat(getMarkerPosition(0))
                    )}%`,
                  }}
                />

                <div
                  className="absolute-marker zero-marker"
                  style={{ left: getMarkerPosition(0) }}
                >
                  0
                </div>

                <div
                  className="absolute-marker selected-marker"
                  style={{ left: getMarkerPosition(selectedNumber) }}
                >
                  {selectedNumber}
                </div>
              </div>
            </div>

            <div className="absolute-buttons">
              {absoluteValues.map((value) => (
                <button
                  key={value}
                  type="button"
                  className={
                    selectedNumber === value
                      ? "absolute-button active"
                      : "absolute-button"
                  }
                  onClick={() => handleSelectNumber(value)}
                >
                  {value}
                </button>
              ))}
            </div>

            <div className="absolute-result-card" aria-live="polite">
              <span className="module-kicker">Resultado</span>
              <h3>
                |{selectedNumber}| = {distanceFromZero}
              </h3>
              <p>
                A distância de {selectedNumber} até o zero é{" "}
                <strong>{distanceFromZero}</strong>.
              </p>
            </div>
          </section>

          <section className="absolute-challenge-card">
            <h3>Desafio rápido</h3>

            <p>
              Quanto vale <strong>|{activeChallenge.number}|</strong>?
            </p>

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
          fallbackText="Clique em um número para ver a distância dele até o zero."
        />
      </section>

      <LessonCard icon="🛟" title="Resumo de sobrevivência">
        <p>
          A distância do zero, ou módulo, mostra quantos passos um número está
          longe do zero. <strong>|-5| = 5</strong> e <strong>|5| = 5</strong>. O
          número pode ser negativo, mas a distância não é. Distância com sinal
          de menos é igual GPS dramático: melhor não.
        </p>
      </LessonCard>
    </main>
  );
}

export default AbsoluteValueActivity;

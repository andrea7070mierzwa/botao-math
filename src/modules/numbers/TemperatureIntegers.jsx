import { useState } from "react";
import LessonCard from "../../components/LessonCard.jsx";
import RealLifeCard from "../../components/RealLifeCard.jsx";
import FeedbackMessage from "../../components/FeedbackMessage.jsx";
import ReadAloudButton from "../../components/ReadAloudButton.jsx";

const temperatureChallenges = [
  {
    id: 1,
    start: -3,
    change: 5,
    answer: 2,
    text: "A temperatura estava em -3°C e subiu 5 graus. Para onde foi?",
    explanation:
      "-3 + 5 chega em 2°C. Subir significa andar para a direita na reta.",
  },
  {
    id: 2,
    start: 4,
    change: -7,
    answer: -3,
    text: "A temperatura estava em 4°C e caiu 7 graus. Para onde foi?",
    explanation:
      "4 - 7 chega em -3°C. Cair significa andar para a esquerda na reta.",
  },
  {
    id: 3,
    start: -6,
    change: 6,
    answer: 0,
    text: "A temperatura estava em -6°C e subiu 6 graus. Para onde foi?",
    explanation: "-6 + 6 chega em 0°C. O zero é o ponto de equilíbrio.",
  },
];

function TemperatureIntegers() {
  const [temperature, setTemperature] = useState(0);
  const [activeChallenge, setActiveChallenge] = useState(
    temperatureChallenges[0]
  );
  const [feedback, setFeedback] = useState(null);

  function handleTemperatureChange(value) {
    const newTemperature = Number(value);
    setTemperature(newTemperature);

    if (newTemperature < 0) {
      setFeedback({
        type: "success",
        message: `${newTemperature}°C está abaixo de zero. É uma temperatura negativa.`,
      });
      return;
    }

    if (newTemperature > 0) {
      setFeedback({
        type: "success",
        message: `${newTemperature}°C está acima de zero. É uma temperatura positiva.`,
      });
      return;
    }

    setFeedback({
      type: "neutral",
      message:
        "0°C é o ponto de equilíbrio entre temperaturas negativas e positivas.",
    });
  }

  function handleChallengeAnswer(option) {
    const gotItRight = option === activeChallenge.answer;

    setTemperature(option);

    setFeedback({
      type: gotItRight ? "success" : "error",
      message: gotItRight
        ? `Isso! ${activeChallenge.explanation}`
        : `Ainda não. ${activeChallenge.explanation}`,
    });
  }

  function handleNextChallenge() {
    const currentIndex = temperatureChallenges.findIndex(
      (challenge) => challenge.id === activeChallenge.id
    );

    const nextChallenge =
      temperatureChallenges[(currentIndex + 1) % temperatureChallenges.length];

    setActiveChallenge(nextChallenge);
    setTemperature(nextChallenge.start);
    setFeedback({
      type: "neutral",
      message:
        "Novo desafio carregado. Observe se a temperatura sobe ou desce.",
    });
  }

  function getThermometerFill() {
    const min = -10;
    const max = 10;
    return `${((temperature - min) / (max - min)) * 100}%`;
  }

  const answerOptions = [
    activeChallenge.answer,
    activeChallenge.answer + 2,
    activeChallenge.answer - 2,
  ].sort((a, b) => a - b);

  const readText =
    "O termômetro ajuda a entender números positivos e negativos. Temperaturas abaixo de zero são negativas. Temperaturas acima de zero são positivas. Quando a temperatura sobe, andamos para a direita na reta numérica. Quando cai, andamos para a esquerda.";

  return (
    <main className="lesson-page">
      <div className="module-header">
        <span className="module-kicker">Trilha 2 — Números</span>
        <h1>Positivos e negativos no termômetro</h1>
        <p>
          Vamos usar o termômetro para entender temperaturas acima e abaixo de
          zero.
        </p>

        <ReadAloudButton label="Ouvir introdução" text={readText} />
      </div>

      <LessonCard icon="🌡️" title="O que o termômetro mostra?">
        <p>
          O termômetro é uma reta numérica em pé. Acima de zero temos
          temperaturas positivas. Abaixo de zero temos temperaturas negativas.
        </p>

        <div className="temperature-rule-card">
          <div>
            <strong>+5°C</strong>
            <span>acima de zero</span>
          </div>

          <div>
            <strong>0°C</strong>
            <span>ponto de equilíbrio</span>
          </div>

          <div>
            <strong>-5°C</strong>
            <span>abaixo de zero</span>
          </div>
        </div>

        <ReadAloudButton text="Temperaturas positivas ficam acima de zero. Temperaturas negativas ficam abaixo de zero. O zero separa os dois lados." />
      </LessonCard>

      <RealLifeCard
        items={[
          "Previsão do tempo",
          "Temperatura de freezer",
          "Clima em cidades frias",
          "Variação de temperatura durante o dia",
          "Entender subir e descer na reta numérica",
          "Comparar frio e calor",
        ]}
      />

      <section className="interactive-lab">
        <div className="lab-info">
          <span className="module-kicker">Mexa você</span>
          <h2>Controle a temperatura</h2>
          <p>
            Arraste o controle para subir ou descer a temperatura. Observe
            quando ela fica negativa, zero ou positiva.
          </p>

          <ReadAloudButton
            label="Ouvir desafio"
            text="Arraste o controle do termômetro. Valores abaixo de zero são negativos. Valores acima de zero são positivos."
          />
        </div>

        <div className="temperature-lab">
          <section className="thermometer-card">
            <h3>Termômetro</h3>

            <div className="thermometer-area">
              <div className="thermometer-scale">
                {[10, 5, 0, -5, -10].map((mark) => (
                  <span key={mark}>{mark}°C</span>
                ))}
              </div>

              <div className="thermometer">
                <div
                  className="thermometer-fill"
                  style={{ height: getThermometerFill() }}
                />
              </div>

              <div className="temperature-display">
                <strong>{temperature}°C</strong>
                {temperature < 0 && <span>negativa</span>}
                {temperature === 0 && <span>zero</span>}
                {temperature > 0 && <span>positiva</span>}
              </div>
            </div>

            <input
              className="temperature-slider"
              type="range"
              min="-10"
              max="10"
              value={temperature}
              onChange={(event) => handleTemperatureChange(event.target.value)}
              aria-label="Controle de temperatura"
            />
          </section>

          <section className="temperature-challenge-card">
            <h3>Desafio rápido</h3>

            <p>{activeChallenge.text}</p>

            <div className="temperature-start-change">
              <div>
                <span>Início</span>
                <strong>{activeChallenge.start}°C</strong>
              </div>

              <div>
                <span>Mudança</span>
                <strong>
                  {activeChallenge.change > 0 ? "+" : ""}
                  {activeChallenge.change}°
                </strong>
              </div>
            </div>

            <div className="challenge-options">
              {answerOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  className="challenge-option-button"
                  onClick={() => handleChallengeAnswer(option)}
                >
                  {option}°C
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
          fallbackText="Arraste o termômetro ou responda ao desafio."
        />
      </section>

      <LessonCard icon="🛟" title="Resumo de sobrevivência">
        <p>
          Temperaturas abaixo de zero são negativas. Temperaturas acima de zero
          são positivas. Quando a temperatura sobe, o número aumenta. Quando
          cai, o número diminui. O termômetro é uma reta numérica de casaco. 🧥
        </p>
      </LessonCard>
    </main>
  );
}

export default TemperatureIntegers;

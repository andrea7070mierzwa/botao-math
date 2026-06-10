import { useState } from "react";
import LessonCard from "../../components/LessonCard.jsx";
import RealLifeCard from "../../components/RealLifeCard.jsx";
import FeedbackMessage from "../../components/FeedbackMessage.jsx";
import ReadAloudButton from "../../components/ReadAloudButton.jsx";

const comparisonPairs = [
  {
    id: 1,
    left: 5,
    right: 2,
    correctSymbol: ">",
    explanation: "5 é maior que 2 porque fica mais à direita na reta numérica.",
  },
  {
    id: 2,
    left: -2,
    right: -5,
    correctSymbol: ">",
    explanation:
      "-2 é maior que -5 porque está mais perto do zero e fica mais à direita.",
  },
  {
    id: 3,
    left: -4,
    right: 1,
    correctSymbol: "<",
    explanation:
      "-4 é menor que 1 porque fica mais à esquerda na reta numérica.",
  },
  {
    id: 4,
    left: 3,
    right: 3,
    correctSymbol: "=",
    explanation: "3 é igual a 3 porque os dois números têm o mesmo valor.",
  },
  {
    id: 5,
    left: 0,
    right: -1,
    correctSymbol: ">",
    explanation:
      "0 é maior que -1 porque fica à direita de -1 na reta numérica.",
  },
];

const symbols = [
  {
    symbol: ">",
    name: "maior que",
    example: "5 > 2",
  },
  {
    symbol: "<",
    name: "menor que",
    example: "2 < 5",
  },
  {
    symbol: "=",
    name: "igual a",
    example: "3 = 3",
  },
];

function NumberComparison() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedSymbol, setSelectedSymbol] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const currentPair = comparisonPairs[currentIndex];

  function getMarkerPosition(value) {
    const min = -6;
    const max = 6;
    const percent = ((value - min) / (max - min)) * 100;

    return `${Math.max(0, Math.min(100, percent))}%`;
  }

  function handleSelectSymbol(symbol) {
    setSelectedSymbol(symbol);

    const gotItRight = symbol === currentPair.correctSymbol;

    setFeedback({
      type: gotItRight ? "success" : "error",
      message: gotItRight
        ? `Isso! ${currentPair.explanation}`
        : `Ainda não. Observe qual número fica mais à direita na reta. ${currentPair.explanation}`,
    });
  }

  function handleNextPair() {
    const nextIndex = (currentIndex + 1) % comparisonPairs.length;

    setCurrentIndex(nextIndex);
    setSelectedSymbol(null);
    setFeedback({
      type: "neutral",
      message: "Novo par carregado. Compare os números com calma.",
    });
  }

  const readText =
    "Comparar números é descobrir qual é maior, qual é menor ou se eles são iguais. Na reta numérica, o número que fica mais à direita é maior. O número que fica mais à esquerda é menor.";

  return (
    <main className="lesson-page">
      <div className="module-header">
        <span className="module-kicker">Trilha 2 — Números</span>
        <h1>Comparação de números</h1>
        <p>
          Agora vamos comparar números usando os sinais maior que, menor que e
          igual.
        </p>

        <ReadAloudButton label="Ouvir introdução" text={readText} />
      </div>

      <LessonCard icon="⚖️" title="Como comparar números?">
        <p>
          Comparar números é observar qual valor é maior, qual é menor ou se os
          dois valores são iguais.
        </p>

        <div className="comparison-symbol-grid">
          {symbols.map((item) => (
            <div key={item.symbol}>
              <strong>{item.symbol}</strong>
              <span>{item.name}</span>
              <small>{item.example}</small>
            </div>
          ))}
        </div>

        <p className="chain-note">
          Na reta numérica, o número que está mais à direita é maior. O que está
          mais à esquerda é menor.
        </p>

        <ReadAloudButton text="O sinal maior que aponta para uma comparação em que o primeiro número é maior. O sinal menor que indica que o primeiro número é menor. O sinal de igual indica valores iguais." />
      </LessonCard>

      <RealLifeCard
        items={[
          "Comparar preços no mercado",
          "Ver qual temperatura é maior",
          "Comparar pontuações em jogos",
          "Saber quem chegou em melhor colocação",
          "Comparar saldo positivo e negativo",
          "Organizar números em ordem crescente",
        ]}
      />

      <section className="interactive-lab">
        <div className="lab-info">
          <span className="module-kicker">Mexa você</span>
          <h2>Escolha o sinal correto</h2>
          <p>
            Observe os dois números e clique no sinal que deixa a comparação
            correta.
          </p>

          <ReadAloudButton
            label="Ouvir desafio"
            text={`Compare ${currentPair.left} e ${currentPair.right}. Escolha maior que, menor que ou igual.`}
          />
        </div>

        <div className="comparison-lab">
          <section className="comparison-main-card">
            <h3>Complete a comparação</h3>

            <div className="comparison-expression">
              <span>{currentPair.left}</span>
              <strong>{selectedSymbol || "?"}</strong>
              <span>{currentPair.right}</span>
            </div>

            <div className="comparison-symbol-buttons">
              {symbols.map((item) => (
                <button
                  key={item.symbol}
                  type="button"
                  className={
                    selectedSymbol === item.symbol
                      ? "comparison-symbol-button active"
                      : "comparison-symbol-button"
                  }
                  onClick={() => handleSelectSymbol(item.symbol)}
                >
                  {item.symbol}
                  <small>{item.name}</small>
                </button>
              ))}
            </div>

            <button
              type="button"
              className="restart-button"
              onClick={handleNextPair}
            >
              Trocar comparação
            </button>
          </section>

          <section className="comparison-line-card">
            <h3>Veja na reta numérica</h3>

            <div className="comparison-number-line">
              <div className="comparison-line-track">
                {[-6, -3, 0, 3, 6].map((tick) => (
                  <span
                    key={tick}
                    className="comparison-line-tick"
                    style={{ left: getMarkerPosition(tick) }}
                  >
                    {tick}
                  </span>
                ))}

                <div
                  className="comparison-marker left-marker"
                  style={{ left: getMarkerPosition(currentPair.left) }}
                >
                  {currentPair.left}
                </div>

                <div
                  className="comparison-marker right-marker"
                  style={{ left: getMarkerPosition(currentPair.right) }}
                >
                  {currentPair.right}
                </div>
              </div>
            </div>

            <p>
              Compare a posição dos marcadores. O que estiver mais à direita é
              maior.
            </p>
          </section>
        </div>

        <FeedbackMessage
          feedback={feedback}
          fallbackText="Escolha o sinal correto para comparar os dois números."
        />
      </section>

      <LessonCard icon="🛟" title="Resumo de sobrevivência">
        <p>
          Para comparar números, olhe a posição deles na reta numérica. Mais à
          direita significa maior. Mais à esquerda significa menor. Se estão no
          mesmo lugar, são iguais.
        </p>
      </LessonCard>
    </main>
  );
}

export default NumberComparison;

import { useState } from "react";
import LessonCard from "../../components/LessonCard.jsx";
import RealLifeCard from "../../components/RealLifeCard.jsx";
import FeedbackMessage from "../../components/FeedbackMessage.jsx";
import ReadAloudButton from "../../components/ReadAloudButton.jsx";

const realNumberExamples = [
  {
    id: "natural",
    label: "3",
    family: "Natural, inteiro, racional e real",
    position: 3,
    explanation:
      "3 é um número natural, inteiro, racional e real. Ele pode ser localizado na reta numérica.",
  },
  {
    id: "integer",
    label: "-2",
    family: "Inteiro, racional e real",
    position: -2,
    explanation:
      "-2 é inteiro, racional e real. Ele aparece antes do zero na reta numérica.",
  },
  {
    id: "rational",
    label: "1/2",
    family: "Racional e real",
    position: 0.5,
    explanation:
      "1/2 é racional e real. Ele fica entre 0 e 1 na reta numérica.",
  },
  {
    id: "decimal",
    label: "2,5",
    family: "Racional e real",
    position: 2.5,
    explanation:
      "2,5 é racional e real. Ele fica entre 2 e 3 na reta numérica.",
  },
  {
    id: "irrational",
    label: "√2",
    family: "Irracional e real",
    position: 1.4,
    explanation:
      "√2 é irracional e real. Ele também pode ser localizado na reta numérica, mesmo não virando uma fração simples.",
  },
  {
    id: "pi",
    label: "π",
    family: "Irracional e real",
    position: 3.14,
    explanation:
      "π é irracional e real. Ele aparece em cálculos com círculos e também tem lugar na reta numérica.",
  },
];

function RealNumbers() {
  const [selectedNumber, setSelectedNumber] = useState(realNumberExamples[0]);
  const [feedback, setFeedback] = useState(null);

  function handleSelectNumber(numberItem) {
    setSelectedNumber(numberItem);

    setFeedback({
      type: "success",
      message: `${numberItem.label} pertence aos números reais. ${numberItem.explanation}`,
    });
  }

  function getMarkerPosition(value) {
    const min = -3;
    const max = 4;
    const percent = ((value - min) / (max - min)) * 100;

    return `${Math.max(0, Math.min(100, percent))}%`;
  }

  const readText =
    "Números reais são todos os números que podemos localizar na reta numérica. Eles incluem naturais, inteiros, racionais e irracionais. Usamos números reais em medidas, gráficos, dinheiro, temperatura, distância e muitos cálculos do dia a dia.";

  return (
    <main className="lesson-page">
      <div className="module-header">
        <span className="module-kicker">Trilha 2 — Números</span>
        <h1>Números reais</h1>
        <p>
          Agora vamos conhecer a grande família dos números que podem aparecer
          na reta numérica.
        </p>

        <ReadAloudButton label="Ouvir introdução" text={readText} />
      </div>

      <LessonCard icon="R" title="O que são números reais?">
        <p>
          Os números reais reúnem os números que podemos localizar na{" "}
          <strong>reta numérica</strong>. Nessa família entram naturais,
          inteiros, racionais e irracionais.
        </p>

        <div className="real-family-card">
          <div className="real-family-box">
            <span>R</span>
            <strong>Reais</strong>
            <p>Naturais, inteiros, racionais e irracionais moram aqui.</p>
          </div>
        </div>

        <p className="chain-note">
          Pense nos reais como uma grande avenida: muitos tipos de números
          diferentes têm um endereço nela.
        </p>

        <ReadAloudButton text="Números reais são números que podem ser localizados na reta numérica. Eles incluem naturais, inteiros, racionais e irracionais." />
      </LessonCard>

      <RealLifeCard
        items={[
          "Medir altura, peso e distância",
          "Criar gráficos",
          "Representar dinheiro e preços",
          "Medir temperatura",
          "Calcular áreas e diagonais",
          "Ler valores em réguas, mapas e instrumentos",
        ]}
      />

      <section className="interactive-lab">
        <div className="lab-info">
          <span className="module-kicker">Mexa você</span>
          <h2>Localize números reais na reta</h2>
          <p>
            Clique em um número e veja onde ele fica na reta numérica. Alguns
            são inteiros, outros são frações, decimais ou irracionais.
          </p>

          <ReadAloudButton
            label="Ouvir desafio"
            text="Clique em um número. Observe onde ele aparece na reta numérica. Números reais podem ser naturais, inteiros, racionais ou irracionais."
          />
        </div>

        <div className="real-number-lab">
          <section className="real-number-picker-card">
            <h3>Escolha um número</h3>

            <div className="real-number-buttons">
              {realNumberExamples.map((numberItem) => (
                <button
                  key={numberItem.id}
                  type="button"
                  className={
                    selectedNumber.id === numberItem.id
                      ? "real-number-button active"
                      : "real-number-button"
                  }
                  onClick={() => handleSelectNumber(numberItem)}
                >
                  {numberItem.label}
                </button>
              ))}
            </div>
          </section>

          <section className="real-line-card">
            <h3>Reta numérica dos reais</h3>

            <div className="real-number-line">
              <div className="real-line-track">
                {[-3, -2, -1, 0, 1, 2, 3, 4].map((tick) => (
                  <span
                    key={tick}
                    className="real-line-tick"
                    style={{ left: getMarkerPosition(tick) }}
                  >
                    {tick}
                  </span>
                ))}

                <div
                  className="real-line-marker"
                  style={{ left: getMarkerPosition(selectedNumber.position) }}
                >
                  {selectedNumber.label}
                </div>
              </div>
            </div>

            <div className="selected-real-card" aria-live="polite">
              <span className="module-kicker">Selecionado</span>
              <h3>{selectedNumber.label}</h3>
              <strong>{selectedNumber.family}</strong>
              <p>{selectedNumber.explanation}</p>
            </div>
          </section>
        </div>

        <FeedbackMessage
          feedback={feedback}
          fallbackText="Clique em um número para ver onde ele fica na reta dos reais."
        />
      </section>

      <LessonCard icon="🛟" title="Resumo de sobrevivência">
        <p>
          Números reais são todos os números que podemos colocar na reta
          numérica. Eles aparecem em medidas, gráficos, dinheiro, temperatura,
          distâncias e muitas situações do mundo real. É a grande família dos
          números com endereço na reta.
        </p>
      </LessonCard>
    </main>
  );
}

export default RealNumbers;

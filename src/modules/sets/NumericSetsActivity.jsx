import { useState } from "react";
import LessonCard from "../../components/LessonCard.jsx";
import RealLifeCard from "../../components/RealLifeCard.jsx";
import FeedbackMessage from "../../components/FeedbackMessage.jsx";
import ReadAloudButton from "../../components/ReadAloudButton.jsx";
import TutorAssistant from "../assessments/TutorAssistant.jsx";
import { numericSetsData } from "../../data/setsData.js";

function NumericSetsActivity() {
  const [selectedSet, setSelectedSet] = useState(numericSetsData.sets[0]);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [feedback, setFeedback] = useState(null);

  function handleSelectSet(mathSet) {
    setSelectedSet(mathSet);
    setFeedback({
      type: "neutral",
      message: `Você selecionou o conjunto ${mathSet.symbol}: ${mathSet.name}. Observe os exemplos e a aplicação na vida real.`,
    });
  }

  function handleSelectNumber(numberItem) {
    setSelectedNumber(numberItem);
  }

  function setIsActive(symbol) {
    if (!selectedNumber) {
      return false;
    }

    return selectedNumber.belongsTo.includes(symbol);
  }

  return (
    <div className="sets-page">
      <div className="module-header">
        <span className="module-kicker">Conjuntos — parte 8</span>
        <h1>Conjuntos numéricos</h1>
        <p>
          Agora vamos ver que os números também vivem em famílias. Entender
          essas famílias ajuda a organizar tudo que vem depois: naturais,
          inteiros, frações, decimais, medidas e gráficos.
        </p>

        <ReadAloudButton
          label="Ouvir introdução"
          text="Conjuntos numéricos são grupos de números com características parecidas. Naturais, inteiros, racionais, irracionais e reais são algumas dessas famílias."
        />
      </div>

      <LessonCard icon="🔢" title={numericSetsData.title}>
        <p>{numericSetsData.explanation}</p>

        <div className="numeric-chain">
          <span>N</span>
          <strong>⊂</strong>
          <span>Z</span>
          <strong>⊂</strong>
          <span>Q</span>
          <strong>⊂</strong>
          <span>R</span>
        </div>

        <p className="chain-note">
          Essa leitura significa: naturais estão dentro dos inteiros; inteiros
          estão dentro dos racionais; racionais fazem parte dos reais.
        </p>

        <ReadAloudButton text="Naturais estão dentro dos inteiros. Inteiros estão dentro dos racionais. Racionais fazem parte dos reais. Os irracionais também fazem parte dos reais, mas não são racionais." />
      </LessonCard>

      <RealLifeCard items={numericSetsData.realLife} />

      <section className="interactive-lab">
        <div className="lab-info">
          <span className="module-kicker">Veja acontecendo</span>
          <h2>Explore as famílias dos números</h2>
          <p>
            Clique em um conjunto para ver exemplos. Depois clique em um número
            e observe em quais famílias ele aparece.
          </p>

          <ReadAloudButton
            label="Ouvir desafio"
            text="Clique em um conjunto numérico para ver exemplos. Depois clique em um número para descobrir a quais conjuntos ele pertence."
          />
        </div>

        <div className="numeric-lab">
          <section className="numeric-nested-card">
            <h3>Famílias dos números</h3>

            <div className="real-box numeric-box">
              <span className="box-label">R — Reais</span>

              <div className="rational-box numeric-box">
                <span className="box-label">Q — Racionais</span>

                <div className="integer-box numeric-box">
                  <span className="box-label">Z — Inteiros</span>

                  <div className="natural-box numeric-box">
                    <span className="box-label">N — Naturais</span>
                  </div>
                </div>
              </div>

              <div className="irrational-box numeric-box">
                <span className="box-label">I — Irracionais</span>
              </div>
            </div>
          </section>

          <section className="numeric-info-card">
            <h3>Escolha um conjunto</h3>

            <div className="numeric-set-buttons">
              {numericSetsData.sets.map((mathSet) => (
                <button
                  key={mathSet.id}
                  type="button"
                  className={
                    selectedSet.id === mathSet.id
                      ? "numeric-set-button active"
                      : "numeric-set-button"
                  }
                  onClick={() => handleSelectSet(mathSet)}
                >
                  <strong>{mathSet.symbol}</strong>
                  {mathSet.name}
                </button>
              ))}
            </div>

            <div className="selected-set-card">
              <span className="module-kicker">Selecionado</span>
              <h3>
                {selectedSet.symbol} — {selectedSet.name}
              </h3>

              <p>{selectedSet.description}</p>

              <div className="numeric-examples">
                {selectedSet.examples.map((example) => (
                  <span key={example}>{example}</span>
                ))}
              </div>
            </div>
          </section>

          <section className="numeric-classify-card">
            <h3>Teste os números</h3>
            <p>
              Clique em um número e veja a quais conjuntos ele pertence. Alguns
              números moram em mais de uma família.
            </p>

            <div className="number-chip-list">
              {numericSetsData.classifyItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={
                    selectedNumber?.id === item.id
                      ? "number-chip active"
                      : "number-chip"
                  }
                  onClick={() => handleSelectNumber(item)}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="membership-grid">
              {["N", "Z", "Q", "I", "R"].map((symbol) => (
                <div
                  key={symbol}
                  className={
                    setIsActive(symbol)
                      ? "membership-badge active"
                      : "membership-badge"
                  }
                >
                  {symbol}
                </div>
              ))}
            </div>

            {selectedNumber && (
              <p className="result-explanation">{selectedNumber.explanation}</p>
            )}
          </section>
        </div>

        <FeedbackMessage
          feedback={feedback}
          fallbackText="Clique em um conjunto ou número para explorar as famílias numéricas."
        />

        <TutorAssistant topic="conjuntos numéricos" />
      </section>

      <LessonCard icon="🛟" title="Resumo de sobrevivência">
        <p>
          Conjuntos numéricos são famílias de números. Os naturais ajudam a
          contar. Os inteiros incluem negativos. Os racionais podem ser escritos
          como fração. Os irracionais não viram fração simples. Os reais juntam
          racionais e irracionais. Parece reunião de família, mas com menos
          sobremesa e mais símbolo.
        </p>
      </LessonCard>
    </div>
  );
}

export default NumericSetsActivity;

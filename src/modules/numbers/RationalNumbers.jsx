import { useState } from "react";
import LessonCard from "../../components/LessonCard.jsx";
import RealLifeCard from "../../components/RealLifeCard.jsx";
import FeedbackMessage from "../../components/FeedbackMessage.jsx";
import ReadAloudButton from "../../components/ReadAloudButton.jsx";

const rationalExamples = [
  {
    id: "half",
    label: "1/2",
    visual: "🍕",
    title: "Metade de uma pizza",
    explanation:
      "1/2 representa uma parte de algo dividido em duas partes iguais.",
  },
  {
    id: "quarter",
    label: "1/4",
    visual: "🍫",
    title: "Um pedaço de chocolate",
    explanation:
      "1/4 representa uma parte de algo dividido em quatro partes iguais.",
  },
  {
    id: "money",
    label: "R$ 2,50",
    visual: "💰",
    title: "Dinheiro",
    explanation: "Valores com centavos usam números racionais no dia a dia.",
  },
  {
    id: "measure",
    label: "1,5 m",
    visual: "📏",
    title: "Medida",
    explanation:
      "Medidas com vírgula, como 1,5 metro, também podem ser racionais.",
  },
];

const fractionPieces = [
  { id: 1, label: "1/1", filled: 1, total: 1 },
  { id: 2, label: "1/2", filled: 1, total: 2 },
  { id: 3, label: "1/3", filled: 1, total: 3 },
  { id: 4, label: "1/4", filled: 1, total: 4 },
];

function RationalNumbers() {
  const [selectedExample, setSelectedExample] = useState(null);
  const [selectedFraction, setSelectedFraction] = useState(fractionPieces[1]);
  const [feedback, setFeedback] = useState(null);

  function handleSelectExample(example) {
    setSelectedExample(example);
    setFeedback({
      type: "success",
      message: `${example.visual} ${example.explanation}`,
    });
  }

  function handleSelectFraction(fraction) {
    setSelectedFraction(fraction);
    setFeedback({
      type: "success",
      message: `${fraction.label} mostra uma parte de um inteiro dividido em ${
        fraction.total
      } parte${fraction.total > 1 ? "s" : ""} igual${
        fraction.total > 1 ? "es" : ""
      }.`,
    });
  }

  const readText =
    "Números racionais são números que podem ser escritos como fração. Eles aparecem em partes de um todo, dinheiro, medidas, receitas, descontos e números com vírgula.";

  return (
    <main className="lesson-page">
      <div className="module-header">
        <span className="module-kicker">Trilha 2 — Números</span>
        <h1>Números racionais</h1>
        <p>
          Agora vamos conhecer os números que aparecem quando falamos de partes,
          medidas, dinheiro e valores com vírgula.
        </p>

        <ReadAloudButton label="Ouvir introdução" text={readText} />
      </div>

      <LessonCard icon="Q" title="O que são números racionais?">
        <p>
          Números racionais são números que podem ser escritos como{" "}
          <strong>fração</strong>. Eles ajudam a representar partes de um todo,
          medidas e valores que nem sempre são inteiros.
        </p>

        <div className="rational-preview">
          <span>1/2</span>
          <span>3/4</span>
          <span>0,5</span>
          <span>2,75</span>
          <span>-1/3</span>
        </div>

        <p className="chain-note">
          Nem todo número precisa representar uma quantidade inteira. Às vezes,
          precisamos falar de pedaços, medidas e valores quebradinhos — mas sem
          quebrar a cabeça.
        </p>

        <ReadAloudButton text="Números racionais podem ser escritos como fração. Eles aparecem quando falamos de metade, um quarto, dinheiro com centavos, medidas com vírgula e partes de um todo." />
      </LessonCard>

      <RealLifeCard
        items={[
          "Dividir uma pizza em partes",
          "Usar dinheiro com centavos",
          "Medir altura ou distância",
          "Seguir receitas culinárias",
          "Entender descontos e porcentagens",
          "Ler notas e médias escolares",
        ]}
      />

      <section className="interactive-lab">
        <div className="lab-info">
          <span className="module-kicker">Mexa você</span>
          <h2>Veja partes de um inteiro</h2>
          <p>
            Clique em uma fração para ver uma parte de um inteiro. Por enquanto,
            vamos só visualizar a ideia, sem entrar em contas.
          </p>

          <ReadAloudButton
            label="Ouvir desafio"
            text="Clique em uma fração para visualizar uma parte de um inteiro. Um meio mostra uma parte de duas. Um quarto mostra uma parte de quatro."
          />
        </div>

        <div className="rational-lab">
          <section className="fraction-picker-card">
            <h3>Escolha uma fração</h3>

            <div className="fraction-buttons">
              {fractionPieces.map((fraction) => (
                <button
                  key={fraction.id}
                  type="button"
                  className={
                    selectedFraction.id === fraction.id
                      ? "fraction-button active"
                      : "fraction-button"
                  }
                  onClick={() => handleSelectFraction(fraction)}
                >
                  {fraction.label}
                </button>
              ))}
            </div>
          </section>

          <section className="fraction-visual-card">
            <h3>Visualização: {selectedFraction.label}</h3>

            <div
              className="fraction-bar"
              style={{
                gridTemplateColumns: `repeat(${selectedFraction.total}, 1fr)`,
              }}
            >
              {Array.from({ length: selectedFraction.total }).map(
                (_, index) => (
                  <span
                    key={index}
                    className={index < selectedFraction.filled ? "filled" : ""}
                  />
                )
              )}
            </div>

            <p>
              A parte colorida mostra <strong>{selectedFraction.label}</strong>{" "}
              do inteiro.
            </p>
          </section>

          <section className="rational-examples-card">
            <h3>Racionais na vida real</h3>

            <div className="rational-example-list">
              {rationalExamples.map((example) => (
                <button
                  key={example.id}
                  type="button"
                  className={
                    selectedExample?.id === example.id
                      ? "rational-example-button active"
                      : "rational-example-button"
                  }
                  onClick={() => handleSelectExample(example)}
                >
                  <span aria-hidden="true">{example.visual}</span>
                  <strong>{example.label}</strong>
                  <small>{example.title}</small>
                </button>
              ))}
            </div>

            {selectedExample && (
              <div className="selected-number-use" aria-live="polite">
                <span>{selectedExample.visual}</span>
                <div>
                  <strong>{selectedExample.title}</strong>
                  <p>{selectedExample.explanation}</p>
                </div>
              </div>
            )}
          </section>
        </div>

        <FeedbackMessage
          feedback={feedback}
          fallbackText="Clique em uma fração ou exemplo para explorar os números racionais."
        />
      </section>

      <LessonCard icon="🛟" title="Resumo de sobrevivência">
        <p>
          Números racionais podem ser escritos como fração. Eles aparecem quando
          falamos de partes, dinheiro, medidas, receitas e números com vírgula.
          São os números dos pedaços — e pedaço bem explicado não assusta.
        </p>
      </LessonCard>
    </main>
  );
}

export default RationalNumbers;

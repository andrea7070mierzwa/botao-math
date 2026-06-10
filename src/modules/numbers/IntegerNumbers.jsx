import { useState } from "react";
import LessonCard from "../../components/LessonCard.jsx";
import RealLifeCard from "../../components/RealLifeCard.jsx";
import FeedbackMessage from "../../components/FeedbackMessage.jsx";
import ReadAloudButton from "../../components/ReadAloudButton.jsx";

const integerExamples = [
  {
    id: "temperature",
    icon: "🌡️",
    label: "-3°C",
    title: "Temperatura abaixo de zero",
    explanation:
      "Usamos números negativos para indicar temperaturas abaixo de zero.",
  },
  {
    id: "debt",
    icon: "💸",
    label: "-50 reais",
    title: "Dívida",
    explanation:
      "Um saldo negativo pode representar dinheiro que está faltando ou uma dívida.",
  },
  {
    id: "floor",
    icon: "🏢",
    label: "-1",
    title: "Subsolo",
    explanation:
      "Em prédios, andares abaixo do térreo podem ser representados por números negativos.",
  },
  {
    id: "score",
    icon: "🎮",
    label: "+10 pontos",
    title: "Pontos ganhos",
    explanation: "Números positivos podem indicar ganho, avanço ou aumento.",
  },
];

function IntegerNumbers() {
  const [selectedValue, setSelectedValue] = useState(0);
  const [selectedExample, setSelectedExample] = useState(null);
  const [feedback, setFeedback] = useState(null);

  function handleSelectValue(value) {
    setSelectedValue(value);

    if (value < 0) {
      setFeedback({
        type: "success",
        message: `${value} é um número inteiro negativo. Ele fica antes do zero na reta numérica.`,
      });
      return;
    }

    if (value > 0) {
      setFeedback({
        type: "success",
        message: `${value} é um número inteiro positivo. Ele fica depois do zero na reta numérica.`,
      });
      return;
    }

    setFeedback({
      type: "neutral",
      message:
        "O zero é o ponto de equilíbrio. Ele não é positivo nem negativo.",
    });
  }

  function handleSelectExample(example) {
    setSelectedExample(example);
    setFeedback({
      type: "success",
      message: `${example.icon} ${example.explanation}`,
    });
  }

  const readText =
    "Números inteiros incluem os números negativos, o zero e os números positivos. Eles aparecem em temperatura, dívidas, andares abaixo do térreo, saldos, lucros, prejuízos e posições na reta numérica.";

  return (
    <main className="lesson-page">
      <div className="module-header">
        <span className="module-kicker">Trilha 2 — Números</span>
        <h1>Números inteiros</h1>
        <p>
          Agora vamos conhecer os números que ficam antes e depois do zero:
          negativos, zero e positivos.
        </p>

        <ReadAloudButton label="Ouvir introdução" text={readText} />
      </div>

      <LessonCard icon="Z" title="O que são números inteiros?">
        <p>
          Os números inteiros formam uma família que inclui os números
          negativos, o zero e os números positivos.
        </p>

        <div className="integer-line-preview">
          <span>-3</span>
          <span>-2</span>
          <span>-1</span>
          <strong>0</strong>
          <span>1</span>
          <span>2</span>
          <span>3</span>
        </div>

        <p className="chain-note">
          Os negativos ficam antes do zero. Os positivos ficam depois do zero. O
          zero fica no meio, segurando a paz da vizinhança numérica.
        </p>

        <ReadAloudButton text="Números inteiros incluem os negativos, o zero e os positivos. Na reta numérica, os negativos ficam antes do zero e os positivos ficam depois do zero." />
      </LessonCard>

      <RealLifeCard
        items={[
          "Temperaturas abaixo de zero",
          "Dívidas e saldo negativo",
          "Andares abaixo do térreo",
          "Lucro e prejuízo",
          "Ganhar ou perder pontos em jogos",
          "Altitudes acima ou abaixo do nível do mar",
        ]}
      />

      <section className="interactive-lab">
        <div className="lab-info">
          <span className="module-kicker">Mexa você</span>
          <h2>Explore a reta dos inteiros</h2>
          <p>
            Clique em um número para ver se ele é negativo, positivo ou zero.
          </p>

          <ReadAloudButton
            label="Ouvir desafio"
            text="Clique em um número da reta. Números menores que zero são negativos. Números maiores que zero são positivos. O zero não é positivo nem negativo."
          />
        </div>

        <div className="integer-lab">
          <section className="integer-number-line-card">
            <h3>Reta dos inteiros</h3>

            <div className="integer-number-line">
              {[-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5].map((number) => (
                <button
                  key={number}
                  type="button"
                  className={
                    selectedValue === number
                      ? "integer-point active"
                      : "integer-point"
                  }
                  onClick={() => handleSelectValue(number)}
                >
                  {number}
                </button>
              ))}
            </div>

            <div className="integer-value-card">
              <span className="module-kicker">Selecionado</span>
              <h3>{selectedValue}</h3>

              {selectedValue < 0 && <p>Negativo: fica antes do zero.</p>}
              {selectedValue === 0 && <p>Zero: ponto de equilíbrio.</p>}
              {selectedValue > 0 && <p>Positivo: fica depois do zero.</p>}
            </div>
          </section>

          <section className="integer-examples-card">
            <h3>Inteiros na vida real</h3>

            <div className="integer-example-list">
              {integerExamples.map((example) => (
                <button
                  key={example.id}
                  type="button"
                  className={
                    selectedExample?.id === example.id
                      ? "integer-example-button active"
                      : "integer-example-button"
                  }
                  onClick={() => handleSelectExample(example)}
                >
                  <span aria-hidden="true">{example.icon}</span>
                  <strong>{example.label}</strong>
                  <small>{example.title}</small>
                </button>
              ))}
            </div>

            {selectedExample && (
              <div className="selected-number-use" aria-live="polite">
                <span>{selectedExample.icon}</span>
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
          fallbackText="Clique em um número ou exemplo para explorar os inteiros."
        />
      </section>

      <LessonCard icon="🛟" title="Resumo de sobrevivência">
        <p>
          Números inteiros incluem negativos, zero e positivos. Eles ajudam a
          representar situações de perda, dívida, frio abaixo de zero, andares
          abaixo do térreo, ganhos e posições na reta numérica.
        </p>
      </LessonCard>
    </main>
  );
}

export default IntegerNumbers;

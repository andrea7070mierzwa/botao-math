import { useState } from "react";
import LessonCard from "../../components/LessonCard.jsx";
import RealLifeCard from "../../components/RealLifeCard.jsx";
import FeedbackMessage from "../../components/FeedbackMessage.jsx";
import ReadAloudButton from "../../components/ReadAloudButton.jsx";

const numberUses = [
  {
    id: "quantity",
    icon: "🍎",
    title: "Quantidade",
    example: "3 maçãs",
    explanation: "Usamos números para contar quantas coisas existem.",
  },
  {
    id: "age",
    icon: "🎂",
    title: "Idade",
    example: "12 anos",
    explanation: "Usamos números para indicar há quanto tempo alguém nasceu.",
  },
  {
    id: "price",
    icon: "💰",
    title: "Preço",
    example: "R$ 10",
    explanation: "Usamos números para representar valores em dinheiro.",
  },
  {
    id: "temperature",
    icon: "🌡️",
    title: "Temperatura",
    example: "25°C",
    explanation: "Usamos números para medir calor e frio.",
  },
  {
    id: "order",
    icon: "🏁",
    title: "Ordem",
    example: "1º lugar",
    explanation: "Usamos números para indicar posição em uma sequência.",
  },
  {
    id: "measure",
    icon: "📏",
    title: "Medida",
    example: "1,50 m",
    explanation: "Usamos números para medir tamanho, altura, distância e peso.",
  },
];

function NumbersIntro() {
  const [selectedUse, setSelectedUse] = useState(null);
  const [feedback, setFeedback] = useState(null);

  function handleSelect(numberUse) {
    setSelectedUse(numberUse);
    setFeedback({
      type: "success",
      message: `${numberUse.icon} Muito bem! Em "${
        numberUse.example
      }", o número ajuda a representar ${numberUse.title.toLowerCase()}.`,
    });
  }

  const readText = `
    Números estão em toda parte. Eles servem para contar, medir, ordenar,
    comparar e representar informações do nosso dia a dia.
    Usamos números para falar de idade, preço, temperatura, quantidade,
    distância, tempo e muitas outras coisas.
    Antes de fazer contas, precisamos entender para que os números servem.
  `;

  return (
    <main className="lesson-page">
      <LessonCard
        kicker="Trilha 2 · Números"
        title="O que são números?"
        description="Números são símbolos que usamos para contar, medir, ordenar e representar informações."
      />

      <section className="content-card">
        <div className="section-heading">
          <span className="module-kicker">Ideia principal</span>
          <h2>Número não é só conta</h2>
        </div>

        <p>
          Quando muita gente pensa em número, já imagina uma conta difícil. Mas
          os números aparecem antes das operações. Eles ajudam a entender o
          mundo.
        </p>

        <p>
          Um número pode mostrar <strong>quantidade</strong>,{" "}
          <strong>idade</strong>, <strong>preço</strong>,{" "}
          <strong>temperatura</strong>, <strong>posição</strong> ou{" "}
          <strong>medida</strong>.
        </p>

        <ReadAloudButton text={readText} />
      </section>

      <RealLifeCard
        items={[
          "Ver as horas no relógio",
          "Contar moedas, livros, lápis ou brinquedos",
          "Medir altura, peso ou distância",
          "Comparar preços no mercado",
          "Olhar a temperatura do dia",
          "Ver a colocação de um time ou aluno",
        ]}
      />

      <section className="content-card">
        <div className="section-heading">
          <span className="module-kicker">Atividade</span>
          <h2>Onde o número está sendo usado?</h2>
        </div>

        <p>
          Clique nos cartões abaixo para descobrir como os números aparecem no
          dia a dia.
        </p>

        <div className="number-uses-grid">
          {numberUses.map((numberUse) => (
            <button
              key={numberUse.id}
              type="button"
              className={`number-use-card ${
                selectedUse?.id === numberUse.id ? "selected" : ""
              }`}
              onClick={() => handleSelect(numberUse)}
            >
              <span className="number-use-icon">{numberUse.icon}</span>
              <strong>{numberUse.title}</strong>
              <span>{numberUse.example}</span>
            </button>
          ))}
        </div>

        {selectedUse && (
          <div className="selected-number-use" aria-live="polite">
            <span>{selectedUse.icon}</span>
            <div>
              <strong>{selectedUse.example}</strong>
              <p>{selectedUse.explanation}</p>
            </div>
          </div>
        )}

        <FeedbackMessage
          feedback={feedback}
          fallbackText="Clique em um cartão para descobrir uma função dos números."
        />
      </section>

      <section className="survival-card">
        <h2>Resumo de sobrevivência</h2>
        <p>
          Números servem para representar informações. Antes de calcular,
          precisamos entender o que aquele número está dizendo.
        </p>
      </section>
    </main>
  );
}

export default NumbersIntro;

import LessonCard from "../../components/LessonCard.jsx";
import ReadAloudButton from "../../components/ReadAloudButton.jsx";
import ModuleFeedbackForm from "../../components/ModuleFeedbackForm.jsx";

const numbersSummaryData = {
  title: "Resumo da trilha de Números",
  explanation:
    "Nesta trilha, você aprendeu que números servem para representar quantidades, posições, medidas, valores, temperaturas e distâncias.",
  topics: [
    {
      icon: "🔢",
      title: "O que são números?",
      description:
        "Números são símbolos que usamos para contar, medir, ordenar, comparar e representar informações do dia a dia.",
    },
    {
      icon: "N",
      title: "Números naturais",
      description:
        "São usados para contar quantidades: 0, 1, 2, 3, 4 e assim por diante.",
    },
    {
      icon: "Z",
      title: "Números inteiros",
      description:
        "Incluem negativos, zero e positivos. Aparecem em temperatura, dívida, saldo e andares abaixo do térreo.",
    },
    {
      icon: "Q",
      title: "Números racionais",
      description:
        "Podem ser escritos como fração. Aparecem em partes, dinheiro, medidas e números com vírgula.",
    },
    {
      icon: "R",
      title: "Números reais",
      description:
        "São os números que podem ser localizados na reta numérica, incluindo naturais, inteiros, racionais e irracionais.",
    },
    {
      icon: "📏",
      title: "Reta numérica",
      description:
        "Mostra os números organizados em uma linha. Mais à direita significa maior; mais à esquerda significa menor.",
    },
    {
      icon: "⚖️",
      title: "Comparação",
      description:
        "Usamos >, < e = para comparar números. A reta numérica ajuda a enxergar qual número é maior ou menor.",
    },
    {
      icon: "🌡️",
      title: "Termômetro",
      description:
        "Ajuda a entender positivos, negativos e zero usando temperaturas acima e abaixo de 0°C.",
    },
    {
      icon: "📍",
      title: "Distância do zero",
      description:
        "Mostra quantos passos um número está longe do zero. Essa distância também é chamada de módulo.",
    },
  ],
  realLife:
    "Números aparecem quando contamos objetos, vemos preços, medimos altura, comparamos temperaturas, olhamos saldo, usamos régua, lemos gráficos e entendemos posições em uma reta.",
};

function NumbersSummary() {
  const summaryText = `${numbersSummaryData.title}. ${
    numbersSummaryData.explanation
  } Você estudou: ${numbersSummaryData.topics
    .map((topic) => `${topic.title}: ${topic.description}`)
    .join(" ")} Na vida real, ${numbersSummaryData.realLife}`;

  return (
    <main className="lesson-page">
      <div className="module-header">
        <span className="module-kicker">Fechamento da trilha</span>
        <h1>Resumo de Números</h1>
        <p>
          Antes da prova guiada, vamos revisar tudo o que apareceu nesta trilha.
          Aqui a gente junta as peças antes de seguir para novos desafios.
        </p>

        <ReadAloudButton label="Ouvir resumo" text={summaryText} />
      </div>

      <LessonCard icon="📚" title={numbersSummaryData.title}>
        <p>{numbersSummaryData.explanation}</p>

        <div className="summary-topic-grid">
          {numbersSummaryData.topics.map((topic) => (
            <article key={topic.title} className="summary-topic-card">
              <span className="summary-topic-icon" aria-hidden="true">
                {topic.icon}
              </span>

              <div>
                <h3>{topic.title}</h3>
                <p>{topic.description}</p>
              </div>
            </article>
          ))}
        </div>
      </LessonCard>

      <section className="summary-real-life-card">
        <span className="module-kicker">Onde tudo isso aparece?</span>
        <h2>Números na vida real</h2>
        <p>{numbersSummaryData.realLife}</p>

        <ReadAloudButton
          label="Ouvir aplicação"
          text={`Números na vida real. ${numbersSummaryData.realLife}`}
        />
      </section>

      <section className="ready-card">
        <div>
          <span className="module-kicker">Próximo passo</span>
          <h2>Pronto para a prova guiada?</h2>
          <p>
            Se você entendeu para que os números servem, como eles aparecem na
            reta numérica, como comparar valores e como pensar em positivos,
            negativos e distância do zero, já pode partir para a prova guiada.
          </p>
        </div>

        <div className="ready-badge" aria-hidden="true">
          📝
        </div>
      </section>

      <ModuleFeedbackForm
        moduleId="numbers-summary"
        moduleTitle="Resumo da trilha de Números"
      />
    </main>
  );
}

export default NumbersSummary;

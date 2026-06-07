import LessonCard from "../../components/LessonCard.jsx";
import ReadAloudButton from "../../components/ReadAloudButton.jsx";

import { setsSummaryData } from "../../data/setsData.js";

function SetsSummary() {
  const summaryText = `${setsSummaryData.title}. ${
    setsSummaryData.explanation
  }. Você estudou: ${setsSummaryData.topics
    .map((topic) => `${topic.title}: ${topic.description}`)
    .join(" ")} Na vida real, ${setsSummaryData.realLife}`;

  return (
    <div className="sets-page">
      <div className="module-header">
        <span className="module-kicker">Fechamento da trilha</span>
        <h1>Resumo de Conjuntos</h1>
        <p>
          Antes da prova guiada, vamos revisar tudo o que apareceu nesta trilha.
          É aquela parada estratégica antes de encarar o chefão matemático.
        </p>

        <ReadAloudButton label="Ouvir resumo" text={summaryText} />
      </div>

      <LessonCard icon="📚" title={setsSummaryData.title}>
        <p>{setsSummaryData.explanation}</p>

        <div className="summary-topic-grid">
          {setsSummaryData.topics.map((topic) => (
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
        <h2>Conjuntos na vida real</h2>
        <p>{setsSummaryData.realLife}</p>

        <ReadAloudButton
          label="Ouvir aplicação"
          text={`Conjuntos na vida real. ${setsSummaryData.realLife}`}
        />
      </section>

      <section className="ready-card">
        <div>
          <span className="module-kicker">Próximo passo</span>
          <h2>Pronto para a prova guiada?</h2>
          <p>
            Se você entendeu como organizar, comparar, unir e separar conjuntos,
            já pode partir para a revisão com questões. E calma: a IA Tutora
            segura a lanterna, mas quem encontra o caminho é você.
          </p>
        </div>

        <div className="ready-badge" aria-hidden="true">
          📝
        </div>
      </section>

      <TutorAssistant topic="resumo da trilha de conjuntos" />
    </div>
  );
}

export default SetsSummary;

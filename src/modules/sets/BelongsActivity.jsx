import { useState } from "react";
import LessonCard from "../../components/LessonCard.jsx";
import RealLifeCard from "../../components/RealLifeCard.jsx";
import FeedbackMessage from "../../components/FeedbackMessage.jsx";
import ReadAloudButton from "../../components/ReadAloudButton.jsx";
import { belongsData } from "../../data/setsData.js";

function BelongsActivity() {
  const [feedback, setFeedback] = useState(null);
  const [answers, setAnswers] = useState([]);

  const totalQuestions = belongsData.statements.length;
  const answeredCount = answers.length;
  const correctCount = answers.filter((answer) => answer.isCorrect).length;
  const wrongCount = answeredCount - correctCount;
  const scorePercent =
    totalQuestions === 0
      ? 0
      : Math.round((correctCount / totalQuestions) * 100);

  const finishedActivity = answeredCount === totalQuestions;

  function handleAnswer(statement, answer) {
    const gotItRight = answer === statement.isCorrect;

    const newAnswer = {
      statementId: statement.id,
      statementText: statement.text,
      readable: statement.readable,
      selectedAnswer: answer,
      correctAnswer: statement.isCorrect,
      isCorrect: gotItRight,
    };

    setAnswers((currentAnswers) => {
      const alreadyAnswered = currentAnswers.some(
        (item) => item.statementId === statement.id
      );

      if (alreadyAnswered) {
        return currentAnswers.map((item) =>
          item.statementId === statement.id ? newAnswer : item
        );
      }

      return [...currentAnswers, newAnswer];
    });

    setFeedback({
      type: gotItRight ? "success" : "error",
      message: gotItRight
        ? statement.explanation
        : `Ainda não. Repare no conjunto A e tente pensar se o elemento aparece lá. ${statement.explanation}`,
    });
  }

  function handleRestartActivity() {
    setAnswers([]);
    setFeedback({
      type: "neutral",
      message:
        "Atividade reiniciada. Vamos tentar de novo, agora com a matemática menos metida a misteriosa.",
    });
  }

  function getDiagnosticMessage() {
    if (!finishedActivity) {
      return "Responda todas as afirmações para receber uma sugestão de revisão.";
    }

    if (scorePercent === 100) {
      return "Excelente! Você identificou corretamente quem pertence e quem não pertence ao conjunto.";
    }

    if (scorePercent >= 70) {
      return "Muito bom! Você entendeu a ideia principal. Vale revisar com calma os símbolos ∈ e ∉ para não trocar os sinais.";
    }

    return "Vamos revisar juntos. Observe primeiro o símbolo e depois confira se o número aparece dentro das chaves do conjunto.";
  }

  return (
    <div className="sets-page">
      <div className="module-header">
        <span className="module-kicker">Conjuntos — parte 2</span>
        <h1>Pertence ou não pertence?</h1>
        <p>
          Agora vamos usar os símbolos matemáticos para dizer se um elemento faz
          parte de um conjunto ou ficou do lado de fora, olhando pela janela.
        </p>

        <ReadAloudButton
          label="Ouvir introdução"
          text="Pertence ou não pertence. Quando um elemento faz parte de um conjunto, usamos o símbolo pertence. Quando não faz parte, usamos o símbolo não pertence."
        />
      </div>

      <LessonCard icon="🔎" title={belongsData.title}>
        <p>{belongsData.explanation}</p>

        <div className="symbol-grid">
          <div>
            <strong>∈</strong>
            <span>pertence</span>
          </div>

          <div>
            <strong>∉</strong>
            <span>não pertence</span>
          </div>
        </div>

        <ReadAloudButton
          text={`${belongsData.title}. ${belongsData.explanation}. O símbolo pertence indica que o elemento está dentro do conjunto. O símbolo não pertence indica que o elemento não está dentro do conjunto.`}
        />
      </LessonCard>

      <RealLifeCard items={belongsData.realLife} />

      <section className="interactive-lab">
        <div className="lab-info">
          <span className="module-kicker">Desafio rápido</span>
          <h2>Observe o conjunto A</h2>
          <p>
            O conjunto A tem os números abaixo. Leia cada afirmação e marque se
            ela é verdadeira ou falsa.
          </p>

          <ReadAloudButton
            label="Ouvir desafio"
            text="Observe o conjunto A. Ele possui os números dois, quatro, seis e oito. Leia cada afirmação e marque se ela é verdadeira ou falsa."
          />
        </div>

        <div className="belong-set-card">
          <h3>A = {"{ 2, 4, 6, 8 }"}</h3>
          <p>
            Dica: se o número aparece dentro das chaves, ele pertence ao
            conjunto.
          </p>
        </div>

        <div className="statement-list">
          {belongsData.statements.map((statement) => (
            <article
              key={statement.id}
              className={`statement-card ${
                answers.some((answer) => answer.statementId === statement.id)
                  ? "answered"
                  : ""
              }`}
            >
              <div>
                <strong>{statement.text}</strong>
                <span>{statement.readable}</span>
              </div>

              <div className="answer-buttons">
                <button
                  type="button"
                  onClick={() => handleAnswer(statement, true)}
                  aria-label={`Marcar verdadeiro para: ${statement.readable}`}
                >
                  Verdadeiro
                </button>

                <button
                  type="button"
                  onClick={() => handleAnswer(statement, false)}
                  aria-label={`Marcar falso para: ${statement.readable}`}
                >
                  Falso
                </button>
              </div>
            </article>
          ))}
        </div>

        <FeedbackMessage
          feedback={feedback}
          fallbackText="Leia cada afirmação e marque se ela é verdadeira ou falsa."
        />

        <section className="performance-card" aria-label="Resumo de desempenho">
          <div className="performance-header">
            <div>
              <span className="module-kicker">Acompanhamento</span>
              <h2>Como foi sua atividade?</h2>
            </div>

            <strong className="score-badge">{scorePercent}%</strong>
          </div>

          <div className="performance-grid">
            <div>
              <strong>{answeredCount}</strong>
              <span>respondidas</span>
            </div>

            <div>
              <strong>{correctCount}</strong>
              <span>acertos</span>
            </div>

            <div>
              <strong>{wrongCount}</strong>
              <span>erros</span>
            </div>
          </div>

          <p className="diagnostic-message">{getDiagnosticMessage()}</p>

          {finishedActivity && (
            <button
              type="button"
              className="restart-button"
              onClick={handleRestartActivity}
            >
              Refazer atividade
            </button>
          )}
        </section>

        <TutorAssistant topic="pertence e não pertence" />
      </section>

      <LessonCard icon="🛟" title="Resumo de sobrevivência">
        <p>
          Se o elemento está dentro do conjunto, usamos <strong>∈</strong>. Se
          ele não está dentro do conjunto, usamos <strong>∉</strong>. É como uma
          lista de convidados: quem está na lista entra; quem não está, precisa
          conversar com a portaria matemática.
        </p>
      </LessonCard>
    </div>
  );
}

export default BelongsActivity;

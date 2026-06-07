import { useState } from "react";
import LessonCard from "../../components/LessonCard.jsx";
import FeedbackMessage from "../../components/FeedbackMessage.jsx";
import ReadAloudButton from "../../components/ReadAloudButton.jsx";

import { setsAssessmentData } from "../../data/setsData.js";

function SetsAssessment() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [finished, setFinished] = useState(false);

  const currentQuestion = setsAssessmentData.questions[currentQuestionIndex];
  const totalQuestions = setsAssessmentData.questions.length;

  const answeredCurrentQuestion = answers.find(
    (answer) => answer.questionId === currentQuestion.id
  );

  const correctCount = answers.filter((answer) => answer.isCorrect).length;
  const wrongCount = answers.length - correctCount;
  const scorePercent = Math.round((correctCount / totalQuestions) * 100);

  function handleAnswer(optionIndex) {
    const isCorrect = optionIndex === currentQuestion.correctIndex;

    const newAnswer = {
      questionId: currentQuestion.id,
      topic: currentQuestion.topic,
      selectedIndex: optionIndex,
      correctIndex: currentQuestion.correctIndex,
      isCorrect,
      review: currentQuestion.review,
    };

    setAnswers((currentAnswers) => {
      const alreadyAnswered = currentAnswers.some(
        (answer) => answer.questionId === currentQuestion.id
      );

      if (alreadyAnswered) {
        return currentAnswers.map((answer) =>
          answer.questionId === currentQuestion.id ? newAnswer : answer
        );
      }

      return [...currentAnswers, newAnswer];
    });

    setFeedback({
      type: isCorrect ? "success" : "error",
      message: isCorrect
        ? `Muito bem! ${currentQuestion.explanation}`
        : `Ainda não. ${currentQuestion.explanation}`,
    });
  }

  function handleNextQuestion() {
    setFeedback(null);

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      return;
    }

    setFinished(true);
  }

  function handlePreviousQuestion() {
    setFeedback(null);

    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  }

  function handleRestartAssessment() {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setFeedback(null);
    setFinished(false);
  }

  function getDiagnosticMessage() {
    if (scorePercent === 100) {
      return "Excelente! Você dominou muito bem a trilha de Conjuntos.";
    }

    if (scorePercent >= 75) {
      return "Muito bom! Você entendeu a maior parte da trilha. Revise os tópicos em que errou para fortalecer a base.";
    }

    if (scorePercent >= 50) {
      return "Você já começou a entender, mas ainda precisa revisar alguns pontos importantes antes de avançar.";
    }

    return "Vamos com calma. O ideal é voltar ao resumo e refazer os módulos principais antes de seguir para Números.";
  }

  function getReviewSuggestions() {
    const wrongAnswers = answers.filter((answer) => !answer.isCorrect);

    if (wrongAnswers.length === 0) {
      return [
        "Você acertou tudo. Pode seguir para a próxima trilha com confiança.",
      ];
    }

    return [...new Set(wrongAnswers.map((answer) => answer.review))];
  }

  if (finished) {
    return (
      <div className="sets-page">
        <div className="module-header">
          <span className="module-kicker">Resultado da prova</span>
          <h1>Como foi sua prova guiada?</h1>
          <p>
            Aqui está seu desempenho na trilha de Conjuntos. Erro aqui não é
            derrota: é mapa de revisão.
          </p>

          <ReadAloudButton
            label="Ouvir resultado"
            text={`Você acertou ${correctCount} de ${totalQuestions} questões. ${getDiagnosticMessage()}`}
          />
        </div>

        <section className="assessment-result-card">
          <div className="performance-header">
            <div>
              <span className="module-kicker">Desempenho</span>
              <h2>Resultado final</h2>
            </div>

            <strong className="score-badge">{scorePercent}%</strong>
          </div>

          <div className="performance-grid">
            <div>
              <strong>{totalQuestions}</strong>
              <span>questões</span>
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

          <div className="review-suggestions">
            <h3>Sugestões de revisão</h3>

            <ul>
              {getReviewSuggestions().map((suggestion) => (
                <li key={suggestion}>{suggestion}</li>
              ))}
            </ul>
          </div>

          <button
            type="button"
            className="restart-button"
            onClick={handleRestartAssessment}
          >
            Refazer prova guiada
          </button>
        </section>

        <TutorAssistant topic="resultado da prova guiada de conjuntos" />
      </div>
    );
  }

  return (
    <div className="sets-page">
      <div className="module-header">
        <span className="module-kicker">Prova guiada</span>
        <h1>Prova de Conjuntos</h1>
        <p>
          Responda uma questão por vez. Você pode ouvir o enunciado e usar a IA
          Tutora como apoio, mas quem escolhe a resposta é você.
        </p>

        <ReadAloudButton
          label="Ouvir introdução"
          text={setsAssessmentData.explanation}
        />
      </div>

      <LessonCard
        icon="📝"
        title={`Questão ${currentQuestionIndex + 1} de ${totalQuestions}`}
      >
        <div className="question-topic">
          Tema: <strong>{currentQuestion.topic}</strong>
        </div>

        <h3 className="assessment-question">{currentQuestion.question}</h3>

        <ReadAloudButton
          label="Ouvir questão"
          text={`Questão ${currentQuestionIndex + 1}. ${
            currentQuestion.question
          }. Opções: ${currentQuestion.options.join(". ")}.`}
        />

        <div className="assessment-options">
          {currentQuestion.options.map((option, index) => {
            const selected = answeredCurrentQuestion?.selectedIndex === index;
            const correct = currentQuestion.correctIndex === index;
            const showCorrect = answeredCurrentQuestion && correct;

            let optionClass = "assessment-option";

            if (selected) {
              optionClass += " selected";
            }

            if (answeredCurrentQuestion && selected && !correct) {
              optionClass += " wrong";
            }

            if (showCorrect) {
              optionClass += " correct";
            }

            return (
              <button
                key={option}
                type="button"
                className={optionClass}
                onClick={() => handleAnswer(index)}
              >
                <span>{String.fromCharCode(65 + index)}</span>
                {option}
              </button>
            );
          })}
        </div>
      </LessonCard>

      <section className="assessment-navigation">
        <button
          type="button"
          className="restart-button"
          onClick={handlePreviousQuestion}
          disabled={currentQuestionIndex === 0}
        >
          Voltar
        </button>

        <div className="assessment-progress">
          <strong>{answers.length}</strong> de <strong>{totalQuestions}</strong>{" "}
          respondidas
        </div>

        <button
          type="button"
          className="union-button"
          onClick={handleNextQuestion}
          disabled={!answeredCurrentQuestion}
        >
          {currentQuestionIndex === totalQuestions - 1
            ? "Finalizar prova"
            : "Próxima questão"}
        </button>
      </section>

      <FeedbackMessage
        feedback={feedback}
        fallbackText="Escolha uma alternativa para receber feedback da questão."
      />

      <TutorAssistant topic="prova guiada de conjuntos" />
    </div>
  );
}

export default SetsAssessment;

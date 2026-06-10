import { useState } from "react";
import LessonCard from "../../components/LessonCard.jsx";
import FeedbackMessage from "../../components/FeedbackMessage.jsx";
import ReadAloudButton from "../../components/ReadAloudButton.jsx";

const numbersAssessmentData = {
  title: "Prova guiada de Números",
  explanation:
    "Esta prova revisa os principais conceitos da trilha de Números. Leia com calma, use a leitura em voz alta se precisar e responda uma questão por vez.",
  questions: [
    {
      id: 1,
      topic: "O que são números?",
      question: "Para que usamos os números no dia a dia?",
      options: [
        "Apenas para fazer contas difíceis",
        "Para contar, medir, ordenar, comparar e representar informações",
        "Apenas para desenhar figuras",
        "Somente para escrever datas",
      ],
      correctIndex: 1,
      explanation:
        "Usamos números para contar, medir, ordenar, comparar e representar informações do cotidiano.",
      review: "Revise o módulo O que são números?.",
    },
    {
      id: 2,
      topic: "Números naturais",
      question: "Qual destes números é natural?",
      options: ["-3", "1/2", "4", "2,5"],
      correctIndex: 2,
      explanation:
        "4 é um número natural, porque pode ser usado para contar uma quantidade inteira.",
      review: "Revise o módulo Números naturais.",
    },
    {
      id: 3,
      topic: "Números inteiros",
      question: "Qual conjunto inclui negativos, zero e positivos?",
      options: [
        "Naturais",
        "Inteiros",
        "Apenas racionais",
        "Apenas irracionais",
      ],
      correctIndex: 1,
      explanation: "Os números inteiros incluem negativos, zero e positivos.",
      review: "Revise o módulo Números inteiros.",
    },
    {
      id: 4,
      topic: "Números racionais",
      question: "Qual exemplo representa um número racional?",
      options: ["1/2", "π", "√2", "Nenhum deles"],
      correctIndex: 0,
      explanation: "1/2 é racional porque pode ser escrito como fração.",
      review: "Revise o módulo Números racionais.",
    },
    {
      id: 5,
      topic: "Números reais",
      question: "O que os números reais têm em comum?",
      options: [
        "Todos são sempre positivos",
        "Todos podem ser localizados na reta numérica",
        "Todos são naturais",
        "Todos são números inteiros",
      ],
      correctIndex: 1,
      explanation:
        "Números reais são números que podem ser localizados na reta numérica.",
      review: "Revise o módulo Números reais.",
    },
    {
      id: 6,
      topic: "Reta numérica",
      question: "Na reta numérica, quanto mais à direita um número está:",
      options: [
        "Menor ele é",
        "Maior ele é",
        "Mais negativo ele é",
        "Mais perto do zero ele sempre está",
      ],
      correctIndex: 1,
      explanation: "Na reta numérica, quanto mais à direita, maior é o número.",
      review: "Revise o módulo Reta numérica.",
    },
    {
      id: 7,
      topic: "Comparação",
      question: "Qual comparação está correta?",
      options: ["-5 > -2", "-2 > -5", "0 < -1", "3 < -4"],
      correctIndex: 1,
      explanation:
        "-2 é maior que -5 porque fica mais à direita na reta numérica.",
      review: "Revise o módulo Comparação de números.",
    },
    {
      id: 8,
      topic: "Termômetro",
      question: "Uma temperatura de -4°C está:",
      options: [
        "Acima de zero",
        "Abaixo de zero",
        "Exatamente no zero",
        "Sempre maior que 4°C",
      ],
      correctIndex: 1,
      explanation:
        "-4°C está abaixo de zero, por isso representa uma temperatura negativa.",
      review: "Revise o módulo Termômetro.",
    },
    {
      id: 9,
      topic: "Distância do zero",
      question: "Quanto vale |-6|?",
      options: ["-6", "0", "6", "12"],
      correctIndex: 2,
      explanation: "|-6| = 6 porque -6 está a 6 passos de distância do zero.",
      review: "Revise o módulo Distância do zero.",
    },
    {
      id: 10,
      topic: "Distância x valor",
      question: "Qual frase está correta?",
      options: [
        "-5 é maior que -2 porque está mais longe do zero",
        "-5 é menor que -2, mas está mais longe do zero",
        "-2 é menor que -5",
        "Distância do zero sempre é negativa",
      ],
      correctIndex: 1,
      explanation:
        "-5 é menor que -2 porque fica mais à esquerda, mas está mais longe do zero.",
      review: "Revise Reta numérica, Comparação e Distância do zero.",
    },
  ],
};

function NumbersAssessment() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [finished, setFinished] = useState(false);

  const currentQuestion = numbersAssessmentData.questions[currentQuestionIndex];
  const totalQuestions = numbersAssessmentData.questions.length;

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
      return "Excelente! Você dominou muito bem a trilha de Números.";
    }

    if (scorePercent >= 80) {
      return "Muito bom! Você entendeu a maior parte da trilha. Revise os pontos em que errou para deixar a base ainda mais forte.";
    }

    if (scorePercent >= 60) {
      return "Você está no caminho. Vale revisar a reta numérica, comparação e distância do zero com calma.";
    }

    return "Vamos com calma. O ideal é voltar ao resumo e refazer os módulos principais antes de avançar.";
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
      <main className="lesson-page">
        <div className="module-header">
          <span className="module-kicker">Resultado da prova</span>
          <h1>Como foi sua prova guiada?</h1>
          <p>
            Aqui está seu desempenho na trilha de Números. Erro aqui não é
            tragédia: é bilhete dizendo onde revisar.
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
      </main>
    );
  }

  return (
    <main className="lesson-page">
      <div className="module-header">
        <span className="module-kicker">Prova guiada</span>
        <h1>Prova de Números</h1>
        <p>
          Responda uma questão por vez. Você pode ouvir o enunciado quantas
          vezes quiser. O importante é pensar com calma.
        </p>

        <ReadAloudButton
          label="Ouvir introdução"
          text={numbersAssessmentData.explanation}
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
    </main>
  );
}

export default NumbersAssessment;

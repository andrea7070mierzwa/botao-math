import { useState } from "react";
import LessonCard from "../../components/LessonCard.jsx";
import RealLifeCard from "../../components/RealLifeCard.jsx";
import FeedbackMessage from "../../components/FeedbackMessage.jsx";
import ReadAloudButton from "../../components/ReadAloudButton.jsx";
import { belongsData } from "../../data/setsData.js";

function BelongsActivity() {
  const [feedback, setFeedback] = useState(null);
  const [answeredIds, setAnsweredIds] = useState([]);

  function handleAnswer(statement, answer) {
    const gotItRight = answer === statement.isCorrect;

    if (!answeredIds.includes(statement.id)) {
      setAnsweredIds([...answeredIds, statement.id]);
    }

    setFeedback({
      type: gotItRight ? "success" : "error",
      message: gotItRight
        ? statement.explanation
        : `Ainda não. Repare no conjunto A e tente pensar se o elemento aparece lá. ${statement.explanation}`,
    });
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
                answeredIds.includes(statement.id) ? "answered" : ""
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

        <FeedbackMessage feedback={feedback} />
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

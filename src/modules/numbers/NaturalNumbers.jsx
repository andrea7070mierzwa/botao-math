import { useState } from "react";
import LessonCard from "../../components/LessonCard.jsx";
import RealLifeCard from "../../components/RealLifeCard.jsx";
import FeedbackMessage from "../../components/FeedbackMessage.jsx";
import ReadAloudButton from "../../components/ReadAloudButton.jsx";

const countingItems = [
  { id: 1, emoji: "📚", label: "livros" },
  { id: 2, emoji: "✏️", label: "lápis" },
  { id: 3, emoji: "🍎", label: "maçãs" },
  { id: 4, emoji: "🎒", label: "mochilas" },
  { id: 5, emoji: "⚽", label: "bolas" },
];

function NaturalNumbers() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [feedback, setFeedback] = useState(null);

  function handleCountChange(newCount) {
    setVisibleCount(newCount);

    if (newCount === 0) {
      setFeedback({
        type: "neutral",
        message:
          "Zero também aparece nos naturais quando queremos dizer que não há nenhum elemento.",
      });
      return;
    }

    setFeedback({
      type: "success",
      message: `Você mostrou ${newCount} elemento${
        newCount > 1 ? "s" : ""
      }. Esse número natural representa uma quantidade.`,
    });
  }

  const readText =
    "Números naturais são usados para contar. Eles aparecem quando contamos pessoas, objetos, livros, lápis, brinquedos, dias ou pontos. Podemos começar pelo zero e seguir: zero, um, dois, três, quatro, cinco e assim por diante.";

  return (
    <main className="lesson-page">
      <div className="module-header">
        <span className="module-kicker">Trilha 2 — Números</span>
        <h1>Números naturais</h1>
        <p>
          Agora vamos conhecer os números que usamos para contar coisas no dia a
          dia.
        </p>

        <ReadAloudButton label="Ouvir introdução" text={readText} />
      </div>

      <LessonCard icon="N" title="O que são números naturais?">
        <p>
          Os números naturais são usados para contar quantidades. Eles aparecem
          quando perguntamos: <strong>quantos?</strong>
        </p>

        <div className="numeric-chain">
          <span>0</span>
          <strong>→</strong>
          <span>1</span>
          <strong>→</strong>
          <span>2</span>
          <strong>→</strong>
          <span>3</span>
          <strong>→</strong>
          <span>...</span>
        </div>

        <p className="chain-note">
          Podemos seguir contando sem parar. Depois do 3 vem 4, 5, 6 e assim por
          diante.
        </p>

        <ReadAloudButton text="Números naturais são usados para contar quantidades. Eles respondem perguntas como: quantos livros, quantos alunos, quantas maçãs ou quantos lápis." />
      </LessonCard>

      <RealLifeCard
        items={[
          "Contar alunos em uma sala",
          "Contar livros na biblioteca",
          "Contar brinquedos em uma caixa",
          "Contar dias no calendário",
          "Contar pontos em um jogo",
          "Controlar quantidade de materiais",
        ]}
      />

      <section className="interactive-lab">
        <div className="lab-info">
          <span className="module-kicker">Mexa você</span>
          <h2>Monte uma quantidade</h2>
          <p>
            Clique em um número e veja a quantidade aparecer. O número natural
            mostra quantos elementos temos.
          </p>

          <ReadAloudButton
            label="Ouvir desafio"
            text="Clique em um número de zero a cinco. Veja a quantidade de objetos aparecer na tela. O número escolhido representa quantos elementos existem."
          />
        </div>

        <div className="natural-number-lab">
          <section className="number-picker-card">
            <h3>Escolha uma quantidade</h3>

            <div className="natural-number-buttons">
              {[0, 1, 2, 3, 4, 5].map((number) => (
                <button
                  key={number}
                  type="button"
                  className={
                    visibleCount === number
                      ? "natural-number-button active"
                      : "natural-number-button"
                  }
                  onClick={() => handleCountChange(number)}
                >
                  {number}
                </button>
              ))}
            </div>
          </section>

          <section className="quantity-display-card">
            <h3>Quantidade escolhida: {visibleCount}</h3>

            <div className="quantity-display">
              {visibleCount === 0 ? (
                <p>Nenhum elemento por enquanto.</p>
              ) : (
                countingItems.slice(0, visibleCount).map((item) => (
                  <span key={item.id} className="quantity-item">
                    <span aria-hidden="true">{item.emoji}</span>
                    {item.label}
                  </span>
                ))
              )}
            </div>
          </section>
        </div>

        <FeedbackMessage
          feedback={feedback}
          fallbackText="Clique em um número para montar uma quantidade."
        />
      </section>

      <LessonCard icon="🛟" title="Resumo de sobrevivência">
        <p>
          Números naturais servem para contar. Eles mostram quantos elementos
          existem em um grupo. Quando alguém pergunta “quantos?”, os naturais
          entram em cena.
        </p>
      </LessonCard>
    </main>
  );
}

export default NaturalNumbers;

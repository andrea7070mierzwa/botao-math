import { useState } from "react";
import LessonCard from "../../components/LessonCard.jsx";
import RealLifeCard from "../../components/RealLifeCard.jsx";
import FeedbackMessage from "../../components/FeedbackMessage.jsx";
import { draggableItems, setsIntroData } from "../../data/setsData.js";

function SetsIntro() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [feedback, setFeedback] = useState(null);

  function handleItemClick(item) {
    if (item.group === "fruta") {
      if (!selectedItems.includes(item.id)) {
        setSelectedItems([...selectedItems, item.id]);
      }

      setFeedback({
        type: "success",
        message: `${item.emoji} ${item.label} pertence ao conjunto das frutas. Muito bem!`,
      });

      return;
    }

    setFeedback({
      type: "error",
      message: `${item.emoji} ${item.label} não pertence ao conjunto das frutas. O conjunto protestou educadamente.`,
    });
  }

  const selectedFruits = draggableItems.filter((item) =>
    selectedItems.includes(item.id)
  );

  return (
    <div className="sets-page">
      <div className="module-header">
        <span className="module-kicker">Primeira trilha</span>
        <h1>Conjuntos</h1>
        <p>
          Antes de fazer contas, vamos aprender a organizar ideias. Conjunto é
          uma das primeiras formas de dizer: “isso faz parte deste grupo”.
        </p>
      </div>

      <LessonCard icon="🧺" title={setsIntroData.title}>
        <p>{setsIntroData.explanation}</p>

        <div className="example-grid">
          {setsIntroData.examples.map((example) => (
            <span key={example}>{example}</span>
          ))}
        </div>
      </LessonCard>

      <RealLifeCard items={setsIntroData.realLife} />

      <section className="interactive-lab">
        <div className="lab-info">
          <span className="module-kicker">Mexa você</span>
          <h2>Monte o conjunto das frutas</h2>
          <p>
            Clique nos elementos que pertencem ao conjunto. Se não for fruta, o
            conjunto vai reclamar, mas com educação matemática.
          </p>
        </div>

        <div className="lab-grid">
          <div className="items-bank">
            <h3>Elementos disponíveis</h3>

            <div className="item-buttons">
              {draggableItems.map((item) => (
                <button
                  key={item.id}
                  className="math-item"
                  onClick={() => handleItemClick(item)}
                >
                  <span>{item.emoji}</span>
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="set-circle">
            <h3>Conjunto das frutas</h3>

            <div className="circle-area">
              {selectedFruits.length === 0 ? (
                <p>O conjunto ainda está vazio.</p>
              ) : (
                selectedFruits.map((fruit) => (
                  <span key={fruit.id} className="inside-item">
                    {fruit.emoji} {fruit.label}
                  </span>
                ))
              )}
            </div>
          </div>
        </div>

        <FeedbackMessage feedback={feedback} />
      </section>

      <LessonCard icon="🛟" title="Resumo de sobrevivência">
        <p>
          Um conjunto é um grupo de elementos. Um elemento pode pertencer ou não
          pertencer a esse grupo. Parece simples, mas essa ideia vai aparecer em
          números, funções, gráficos, estatística e até programação.
        </p>
      </LessonCard>
    </div>
  );
}

export default SetsIntro;

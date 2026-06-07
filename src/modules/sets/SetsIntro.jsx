import { useState } from "react";
import LessonCard from "../../components/LessonCard.jsx";
import RealLifeCard from "../../components/RealLifeCard.jsx";
import FeedbackMessage from "../../components/FeedbackMessage.jsx";
import ReadAloudButton from "../../components/ReadAloudButton.jsx";
import { draggableItems, setsIntroData } from "../../data/setsData.js";

function SetsIntro() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [draggedItem, setDraggedItem] = useState(null);

  function handleDragStart(item) {
    setDraggedItem(item);
    setFeedback({
      type: "neutral",
      message: `Você está levando ${item.emoji} ${item.label}. Vamos ver se pertence ao conjunto...`,
    });
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDrop(event) {
    event.preventDefault();

    if (!draggedItem) {
      return;
    }

    handleItemSelect(draggedItem);
    setDraggedItem(null);
  }

  function handleItemSelect(item) {
    if (item.group !== "fruta") {
      setFeedback({
        type: "error",
        message: `${item.emoji} ${item.label} não pertence ao conjunto das frutas. O conjunto agradece a visita, mas não deixa entrar. 😄`,
      });
      return;
    }

    if (selectedItems.includes(item.id)) {
      setFeedback({
        type: "neutral",
        message: `${item.emoji} ${item.label} já está no conjunto. Repetição aqui não passa despercebida!`,
      });
      return;
    }

    setSelectedItems([...selectedItems, item.id]);
    setFeedback({
      type: "success",
      message: `${item.emoji} ${item.label} pertence ao conjunto das frutas. Muito bem!`,
    });
  }

  function handleRemoveItem(itemId) {
    setSelectedItems(selectedItems.filter((id) => id !== itemId));
    setFeedback({
      type: "neutral",
      message:
        "Elemento removido do conjunto. Matemática também tem botão de desfazer moral.",
    });
  }

  function handleResetActivity() {
    setSelectedItems([]);
    setFeedback({
      type: "neutral",
      message:
        "Conjunto esvaziado. Começamos de novo, sem julgamento matemático.",
    });
  }

  const selectedFruits = draggableItems.filter((item) =>
    selectedItems.includes(item.id)
  );

  const availableItems = draggableItems.filter(
    (item) => !selectedItems.includes(item.id)
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

        <ReadAloudButton
          text={`${setsIntroData.title}. ${setsIntroData.explanation}`}
        />

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
          <h2>Arraste para montar o conjunto das frutas</h2>
          <p>
            Arraste ou clique nos elementos que pertencem ao conjunto das
            frutas. Se ele pertence, entra. Se não pertence, o conjunto barra na
            portaria.
          </p>

          <ReadAloudButton
            label="Ouvir instrução"
            text="Arraste ou clique nos elementos que pertencem ao conjunto das frutas. Maçã, banana e uva pertencem ao conjunto. Cachorro, bola e número dois não pertencem."
          />
        </div>

        <div className="lab-grid">
          <div className="items-bank">
            <h3>Elementos disponíveis</h3>

            <div className="item-buttons">
              {availableItems.map((item) => (
                <button
                  key={item.id}
                  className="math-item"
                  draggable
                  onClick={() => handleItemSelect(item)}
                  onDragStart={() => handleDragStart(item)}
                  title="Arraste ou clique para testar se pertence ao conjunto"
                  aria-label={`${item.label}. Arraste ou clique para testar se pertence ao conjunto das frutas.`}
                >
                  <span aria-hidden="true">{item.emoji}</span>
                  {item.label}
                </button>
              ))}
            </div>

            <p className="drag-hint">
              Dica: clique, segure e arraste para dentro do conjunto. Ou só
              clique no item, que também funciona.
            </p>
          </div>

          <div
            className={`set-circle ${draggedItem ? "drop-ready" : ""}`}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <h3>Conjunto das frutas</h3>

            <div className="circle-area">
              {selectedFruits.length === 0 ? (
                <p>Arraste ou clique nas frutas para cá.</p>
              ) : (
                selectedFruits.map((fruit) => (
                  <button
                    key={fruit.id}
                    className="inside-item"
                    onClick={() => handleRemoveItem(fruit.id)}
                    title="Clique para remover"
                    aria-label={`Remover ${fruit.label} do conjunto das frutas`}
                  >
                    {fruit.emoji} {fruit.label}
                  </button>
                ))
              )}
            </div>

            <button
              className="reset-button"
              type="button"
              onClick={handleResetActivity}
            >
              Esvaziar conjunto
            </button>
          </div>
        </div>

        <FeedbackMessage
          feedback={feedback}
          fallbackText="Arraste ou clique nos elementos que pertencem ao conjunto das frutas."
        />
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

import { useState } from "react";
import ReadAloudButton from "../../components/ReadAloudButton.jsx";
import { getTutorMessage, tutorModes } from "./assessmentRules.js";

function TutorAssistant({ topic = "conjuntos" }) {
  const [mode, setMode] = useState(tutorModes.TRAINING);
  const [message, setMessage] = useState(
    getTutorMessage(tutorModes.TRAINING, "intro")
  );

  function handleModeChange(newMode) {
    setMode(newMode);
    setMessage(getTutorMessage(newMode, "intro"));
  }

  function handleTutorAction(action) {
    setMessage(getTutorMessage(mode, action));
  }

  return (
    <aside className="tutor-card" aria-label="Assistente de estudo">
      <div className="tutor-header">
        <span className="tutor-avatar" aria-hidden="true">
          🤖
        </span>

        <div>
          <span className="module-kicker">IA Tutora</span>
          <h2>Assistente de Estudo</h2>
        </div>
      </div>

      <p className="tutor-topic">
        Tema atual: <strong>{topic}</strong>
      </p>

      <div
        className="mode-buttons"
        aria-label="Escolha o modo de acompanhamento"
      >
        <button
          type="button"
          className={mode === tutorModes.TRAINING ? "active" : ""}
          onClick={() => handleModeChange(tutorModes.TRAINING)}
        >
          Treino
        </button>

        <button
          type="button"
          className={mode === tutorModes.TEST ? "active" : ""}
          onClick={() => handleModeChange(tutorModes.TEST)}
        >
          Prova
        </button>

        <button
          type="button"
          className={mode === tutorModes.REVIEW ? "active" : ""}
          onClick={() => handleModeChange(tutorModes.REVIEW)}
        >
          Revisão
        </button>
      </div>

      <div className="tutor-message" aria-live="polite">
        <p>{message}</p>
      </div>

      <div className="tutor-actions">
        <button type="button" onClick={() => handleTutorAction("hint")}>
          Pedir pista
        </button>

        <button type="button" onClick={() => handleTutorAction("symbol")}>
          Explicar símbolo
        </button>

        <button type="button" onClick={() => handleTutorAction("calm")}>
          Estou nervoso(a)
        </button>
      </div>

      <ReadAloudButton label="Ouvir ajuda" text={message} />

      <p className="tutor-note">
        A IA segura a lanterna, mas quem encontra o caminho é o aluno.
      </p>
    </aside>
  );
}

export default TutorAssistant;

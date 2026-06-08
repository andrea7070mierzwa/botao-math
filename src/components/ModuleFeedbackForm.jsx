import { useState } from "react";

const initialForm = {
  understood: "",
  explanationHelped: "",
  visualHelped: "",
  rating: "",
  confusion: "",
};

function ModuleFeedbackForm({ moduleId, moduleTitle }) {
  const [formData, setFormData] = useState(initialForm);
  const [saved, setSaved] = useState(false);

  function handleChange(field, value) {
    setFormData((currentData) => ({
      ...currentData,
      [field]: value,
    }));

    setSaved(false);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const newFeedback = {
      id: crypto.randomUUID(),
      moduleId,
      moduleTitle,
      createdAt: new Date().toISOString(),
      ...formData,
    };

    const savedFeedbacks = JSON.parse(
      localStorage.getItem("botao-math-feedbacks") || "[]"
    );

    localStorage.setItem(
      "botao-math-feedbacks",
      JSON.stringify([...savedFeedbacks, newFeedback])
    );

    setSaved(true);
    setFormData(initialForm);
  }

  return (
    <section className="module-feedback-card" aria-label="Ficha de avaliação">
      <div className="module-feedback-header">
        <span className="module-kicker">Sua opinião</span>
        <h2>Como foi esta atividade?</h2>
        <p>
          Esta ficha ajuda a melhorar o Botão Math. Pode responder rapidinho,
          sem medo: aqui feedback não leva nota. 😄
        </p>
      </div>

      <form onSubmit={handleSubmit} className="module-feedback-form">
        <fieldset>
          <legend>Você entendeu o que era para fazer?</legend>

          <label>
            <input
              type="radio"
              name={`${moduleId}-understood`}
              value="sim"
              checked={formData.understood === "sim"}
              onChange={(event) =>
                handleChange("understood", event.target.value)
              }
              required
            />
            😃 Sim
          </label>

          <label>
            <input
              type="radio"
              name={`${moduleId}-understood`}
              value="mais-ou-menos"
              checked={formData.understood === "mais-ou-menos"}
              onChange={(event) =>
                handleChange("understood", event.target.value)
              }
            />
            😐 Mais ou menos
          </label>

          <label>
            <input
              type="radio"
              name={`${moduleId}-understood`}
              value="nao"
              checked={formData.understood === "nao"}
              onChange={(event) =>
                handleChange("understood", event.target.value)
              }
            />
            😵 Não
          </label>
        </fieldset>

        <fieldset>
          <legend>A explicação ajudou?</legend>

          <label>
            <input
              type="radio"
              name={`${moduleId}-explanation`}
              value="sim"
              checked={formData.explanationHelped === "sim"}
              onChange={(event) =>
                handleChange("explanationHelped", event.target.value)
              }
              required
            />
            😃 Sim
          </label>

          <label>
            <input
              type="radio"
              name={`${moduleId}-explanation`}
              value="um-pouco"
              checked={formData.explanationHelped === "um-pouco"}
              onChange={(event) =>
                handleChange("explanationHelped", event.target.value)
              }
            />
            😐 Um pouco
          </label>

          <label>
            <input
              type="radio"
              name={`${moduleId}-explanation`}
              value="nao"
              checked={formData.explanationHelped === "nao"}
              onChange={(event) =>
                handleChange("explanationHelped", event.target.value)
              }
            />
            😵 Não
          </label>
        </fieldset>

        <fieldset>
          <legend>A parte visual/interativa ajudou?</legend>

          <label>
            <input
              type="radio"
              name={`${moduleId}-visual`}
              value="sim"
              checked={formData.visualHelped === "sim"}
              onChange={(event) =>
                handleChange("visualHelped", event.target.value)
              }
              required
            />
            😃 Sim
          </label>

          <label>
            <input
              type="radio"
              name={`${moduleId}-visual`}
              value="um-pouco"
              checked={formData.visualHelped === "um-pouco"}
              onChange={(event) =>
                handleChange("visualHelped", event.target.value)
              }
            />
            😐 Um pouco
          </label>

          <label>
            <input
              type="radio"
              name={`${moduleId}-visual`}
              value="nao"
              checked={formData.visualHelped === "nao"}
              onChange={(event) =>
                handleChange("visualHelped", event.target.value)
              }
            />
            😵 Não
          </label>
        </fieldset>

        <label className="text-feedback-label">
          O que ficou confuso? <span>opcional</span>
          <textarea
            value={formData.confusion}
            onChange={(event) => handleChange("confusion", event.target.value)}
            placeholder="Escreva aqui o que você não entendeu ou o que poderia melhorar."
            rows="4"
          />
        </label>

        <fieldset>
          <legend>Nota da atividade</legend>

          <div className="rating-options">
            {[1, 2, 3, 4, 5].map((rating) => (
              <label key={rating}>
                <input
                  type="radio"
                  name={`${moduleId}-rating`}
                  value={String(rating)}
                  checked={formData.rating === String(rating)}
                  onChange={(event) =>
                    handleChange("rating", event.target.value)
                  }
                  required
                />
                {rating}
              </label>
            ))}
          </div>
        </fieldset>

        <button type="submit" className="union-button">
          Enviar avaliação
        </button>

        {saved && (
          <p className="feedback success" aria-live="polite">
            Avaliação salva. Obrigada por ajudar o Botão Math a ficar melhor!
          </p>
        )}
      </form>
    </section>
  );
}

export default ModuleFeedbackForm;

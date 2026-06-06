function ReadAloudButton({ text, label = "Ouvir explicação" }) {
  function handleReadAloud() {
    if (!("speechSynthesis" in window)) {
      alert("Este navegador não possui suporte para leitura em voz alta.");
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "pt-BR";
    utterance.rate = 0.95;
    utterance.pitch = 1;

    window.speechSynthesis.speak(utterance);
  }

  return (
    <button className="read-button" type="button" onClick={handleReadAloud}>
      🔊 {label}
    </button>
  );
}

export default ReadAloudButton;

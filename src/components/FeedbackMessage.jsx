function FeedbackMessage({ feedback }) {
  if (!feedback) {
    return (
      <p className="feedback neutral" aria-live="polite">
        Arraste ou clique nos elementos que pertencem ao conjunto das frutas.
      </p>
    );
  }

  return (
    <p className={`feedback ${feedback.type}`} aria-live="polite">
      {feedback.message}
    </p>
  );
}

export default FeedbackMessage;

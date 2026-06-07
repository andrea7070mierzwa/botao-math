function FeedbackMessage({
  feedback,
  fallbackText = "Interaja com a atividade para receber um retorno.",
}) {
  if (!feedback) {
    return (
      <p className="feedback neutral" aria-live="polite">
        {fallbackText}
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

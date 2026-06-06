function FeedbackMessage({ feedback }) {
  if (!feedback) {
    return (
      <p className="feedback neutral">
        Arraste os elementos que pertencem ao conjunto das frutas.
      </p>
    );
  }

  return <p className={`feedback ${feedback.type}`}>{feedback.message}</p>;
}

export default FeedbackMessage;

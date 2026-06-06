function FeedbackMessage({ feedback }) {
  if (!feedback) {
    return (
      <p className="feedback neutral">
        Clique nos elementos que pertencem ao conjunto das frutas.
      </p>
    );
  }

  return <p className={`feedback ${feedback.type}`}>{feedback.message}</p>;
}

export default FeedbackMessage;

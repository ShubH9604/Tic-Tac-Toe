import "./Card.css";

const Card = ({ number, flipped, matched, onClick }) => {
  let cardClass = "card";

  if (flipped) {
    cardClass += " flipped";
  }
  if (matched) {
    cardClass += " matched";
  }

  return (
    <div className={cardClass} onClick={onClick}>
      {flipped || matched ? number : "?"}
    </div>
  );
};

export default Card;
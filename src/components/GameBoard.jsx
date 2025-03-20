import { useState, useEffect } from "react";
import Card from "./Card";
import "./GameBoard.css";

const numbers = [1, 2, 3, 4, 5, 6]; // Unique numbers

const GameBoard = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    startGame();
  }, []);

  const startGame = () => {
    const shuffled = [...numbers, ...numbers] // Duplicate numbers
      .map((num) => ({ id: Math.random(), number: num }))
      .sort(() => Math.random() - 0.5);

    setCards(shuffled);
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
  };

  const handleCardClick = (index) => {
    if (flippedCards.length === 2 || flippedCards.includes(index)) return;

    const newFlipped = [...flippedCards, index];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((prev) => prev + 1);
      checkMatch(newFlipped);
    }
  };

  const checkMatch = ([firstIndex, secondIndex]) => {
    if (cards[firstIndex].number === cards[secondIndex].number) {
      setMatchedCards([...matchedCards, cards[firstIndex].number]);
      setFlippedCards([]);
    } else {
      setTimeout(() => setFlippedCards([]), 1000);
    }
  };

  return (
    <div className="game-container">
      <h1>Number Memory Game</h1>
      <p><b>Moves : {moves}</b></p>
      <div className="game-grid">
        {cards.map((card, index) => (
          <Card
            key={card.id}
            number={card.number}
            flipped={flippedCards.includes(index)}
            matched={matchedCards.includes(card.number)}
            onClick={() => handleCardClick(index)}
          />
        ))}
      </div>
      <button onClick={startGame} className="restart-btn">Restart Game</button>
    </div>
  );
};

export default GameBoard;
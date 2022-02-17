import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const cardImages = [
  { name: 'batman', src: '/img/icons8-batman-200.png', matched: false },
  { name: 'casapapel', src: '/img/icons8-dinheiro-assalto-dali-200.png', matched: false },
  { name: 'bender', src: '/img/icons8-futurama-bender-200.png', matched: false },
  { name: 'potter', src: '/img/icons8-harry-potter-200.png', matched: false },
  { name: 'rick', src: '/img/icons8-rick-sanchez-200.png', matched: false },
  { name: 'ninja', src: '/img/icons8-tartaruga-ninja-200.png', matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [winGame, setWinGame] = useState(false);

  // shuffle cards
  const shuffleCards = () => {
    setWinGame(false);
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffledCards);
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(0);
  };

  // handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // compare choice
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            return card.src === choiceOne.src ? { ...card, matched: true } : card;
          });
        });
      } else {
      }
      setTimeout(() => resetTurn(), 1000);
    }
  }, [choiceOne, choiceTwo]);

  // resolving game won
  useEffect(() => {
    // console.log('filter', cards.filter((card) => card.matched).length);
    //                                              change to 0 for win con at start, 12 for normal con
    if (cards.filter((card) => card.matched).length === 12) {
      console.log('venceu');
      setWinGame(true);
    }
  }, [cards]);

  // reset choices and increase turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurn) => ++prevTurn);
    setDisabled(false);
  };

  // starting the game automatically
  useEffect(() => {
    shuffleCards();
  }, []);

  // console.log(cards);

  return (
    <>
      <div className={`App`}>
        <h1>Memory Game</h1>
        <button onClick={shuffleCards} className="button">
          New Game
        </button>
        <p>Turns: {turns}</p>

        <div>{winGame ? <h1 className={`${winGame ? 'won' : ''}`}>Congratulations!</h1> : <div></div>}</div>
        <div className="card-grid">
          {cards.map((card) => (
            <SingleCard
              key={card.id}
              card={card}
              handleChoice={handleChoice}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
              disabled={disabled}
            />
          ))}
        </div>
      </div>
      <footer>
        <p>
          Made with React by <a href="https://www.linkedin.com/in/rodrigo-simon/"> Rodrigo Simon</a>
        </p>
      </footer>
    </>
  );
}

export default App;

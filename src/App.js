import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const cardImages = [
  { name: 'batman', src: '/img/batman.png', matched: false },
  { name: 'casapapel', src: '/img/dinheiro-assalto-dali.png', matched: false },
  { name: 'bender', src: '/img/futurama-bender.png', matched: false },
  { name: 'potter', src: '/img/harry-potter.png', matched: false },
  { name: 'rick', src: '/img/rick-sanchez.png', matched: false },
  { name: 'ninja', src: '/img/ninja-turtle.png', matched: false },
  { name: 'captain', src: '/img/captain-america.png', matched: false },
  { name: 'cookie', src: '/img/cookie-monster.png', matched: false },
  { name: 'darth', src: '/img/darth-vader.png', matched: false },
  { name: 'homer', src: '/img/homer-simpson.png', matched: false },
  { name: 'neo', src: '/img/neo.png', matched: false },
  { name: 'pennywise', src: '/img/pennywise.png', matched: false },
  { name: 'wolverine', src: '/img/wolverine.png', matched: false },
  { name: 'wonder', src: '/img/wonder-woman.png', matched: false },
  { name: 'yoda', src: '/img/yoda.png', matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [winGame, setWinGame] = useState(false);
  const [difficulty, setDifficulty] = useState('easy');

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
  }

  // shuffle cards - easy 6 pairs / medium 10 pairs / hard 15 pairs
  const shuffleCards = () => {
    setWinGame(false);

    switch (difficulty) {
      case 'easy':
        const cardsEasy = shuffle(cardImages).slice(0, 6);
        console.log('cards Easy', cardsEasy);

        const shuffledCardsEasy = [...cardsEasy, ...cardsEasy]
          .sort(() => Math.random() - 0.5)
          .map((card) => ({ ...card, id: Math.random() }));

        setCards(shuffledCardsEasy);
        setChoiceOne(null);
        setChoiceTwo(null);
        setTurns(0);
        break;

      case 'medium':
        const cardsMedium = shuffle(cardImages).slice(0, 10);
        console.log('cards Medium', cardsMedium);

        const shuffledCardsMedium = [...cardsMedium, ...cardsMedium]
          .sort(() => Math.random() - 0.5)
          .map((card) => ({ ...card, id: Math.random() }));

        setCards(shuffledCardsMedium);
        setChoiceOne(null);
        setChoiceTwo(null);
        setTurns(0);
        break;

      case 'hard':
        const cardsHard = shuffle(cardImages);
        console.log('cards Hard', cardsHard);

        const shuffledCardsHard = [...cardsHard, ...cardsHard]
          .sort(() => Math.random() - 0.5)
          .map((card) => ({ ...card, id: Math.random() }));

        setCards(shuffledCardsHard);
        setChoiceOne(null);
        setChoiceTwo(null);
        setTurns(0);
        break;

      default:
        return;
    }
  };

  const handleDifficulty = (difficulty) => {
    setDifficulty(difficulty);
    shuffleCards();
  };

  // handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // compare choice
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src && choiceOne.id !== choiceTwo.id) {
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
    if (cards.filter((card) => card.matched).length === cards.length) {
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
  }, [difficulty]);

  // console.log(cards);

  return (
    <>
      <div className={`App`}>
        <h1>Memory Game</h1>
        <button onClick={shuffleCards} className="button">
          New Game
        </button>
        <p>Turns: {turns}</p>

        <div className="difficulty">
          <p>Select difficulty - {difficulty}</p>
          <button onClick={() => handleDifficulty('easy')} className="button">
            easy
          </button>
          <button onClick={() => handleDifficulty('medium')} className="button">
            medium
          </button>
          <button onClick={() => handleDifficulty('hard')} className="button">
            hard
          </button>
        </div>

        <div>{winGame ? <h1 className={`${winGame ? 'won' : ''}`}>Congratulations, you won!</h1> : <div></div>}</div>
        <div
          className={difficulty === 'hard' ? 'card-grid-hard' : difficulty === 'medium' ? 'card-grid-medium' : 'card-grid'}
        >
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

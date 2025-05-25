import './styles/App.css';
import Hand from './components/Hand';
import PlayingField from './components/PlayingField';
import ActionContainer from './components/ActionContainer';
import VictoryOverlay from './components/VictoryOverlay';

import { useState, useEffect } from 'react';
import { getRandomCard, getHandCards, evaluateExpression } from './utils/utils.js';

function App() {
  const [selectedCard, setSelectedCard] = useState({ card: undefined, from: null });
  const [handCards, setHandCards] = useState(getHandCards());
  const [playCards, setPlayCards] = useState([]);
  const [win, setWin] = useState(false);

  const [gameData, setGameData] = useState({
    currentNumber: 0,
    targetNumber: Math.floor(Math.random() * 10001),
    discardsUsed: 0,
    cardsPlayed: 0,
    turnCount: 0,
  });

  const {
    currentNumber,
    targetNumber,
    discardsUsed,
    cardsPlayed,
    turnCount,
  } = gameData;

  const dropCard = (index) => {
    const { card, from } = selectedCard;
    if (!card || !from) return;

    const newHand = handCards.filter(c => c.id !== card.id);
    const oldIndex = playCards.findIndex(c => c.id === card.id);
    let newField = [...playCards];

    if (from === 'field') {
      newField.splice(oldIndex, 1);
      if (oldIndex < index) index--;
    }

    if (from === 'hand') {
      setHandCards(newHand);
    }

    newField.splice(index, 0, card);

    setPlayCards(newField);
    setGameData(prev => ({ ...prev, cardsPlayed: prev.cardsPlayed + 1 }));
    setSelectedCard({ card: null, from: null });
  };

  const returnToHand = () => {
    const { card, from } = selectedCard;
    if (!card || card.fixed || from === 'hand') return;

    setPlayCards(playCards.filter(c => c !== card));
    setHandCards([...handCards, card]);
    setGameData(prev => ({ ...prev, cardsPlayed: prev.cardsPlayed - 1 }));
    setSelectedCard({ card: undefined, from: null });
  };

  const discardSelected = () => {
    const { card } = selectedCard;
    if (!card || !card.fixed || discardsUsed >= 1) return;

    setPlayCards(playCards.filter(c => c !== card));
    setGameData(prev => ({ ...prev, discardsUsed: prev.discardsUsed + 1 }));
  };

  const endTurn = () => {
    setGameData(prev => ({
      ...prev,
      discardsUsed: 0,
      cardsPlayed: 0,
      turnCount: prev.turnCount + 1,
    }));

    setSelectedCard({ card: undefined, from: null });
    setPlayCards(playCards.map(card => ({ ...card, fixed: true })));
  };

  const drawCard = () => {
    setHandCards([...handCards, getRandomCard()]);
    endTurn();
  };

  useEffect(() => {
    const expression = playCards.map(c => c.value).join('');
    const evaluated = evaluateExpression(expression);

    setGameData(prev => ({ ...prev, currentNumber: evaluated }));
    if (evaluated === targetNumber) setWin(true);
  }, [playCards, targetNumber]);

  const newGame = () => {
    setGameData({
      currentNumber: 0,
      targetNumber: Math.floor(Math.random() * 10001),
      discardsUsed: 0,
      cardsPlayed: 0,
      turnCount: 0,
    });
    setPlayCards([]);
    setHandCards(getHandCards());
    setWin(false);
  };

  return (
    <main className="game">
      <div className="content">
        <h1 style={{fontSize:"30px"}}>Equatorix ( Singleplayer Mode )</h1>
        <div className="instructions">
          <h3>Instructions:</h3>
          <ol>
            <li>At the start of the game a Target Value is generated and you are given 7 cards</li>
            <li>Select a card, then choose where on the playing area you wish to play the card</li>
            <li>You may also move played cards back to your hand so long as they aren't locked</li>
            <li>You may Draw a card only if you dont play any cards which will end your turn</li>
            <li>Ending your turn locks all dice in the playing area which can no longer be moved but can be discarded using the Discard button</li>
            <li>You may play as many cards as you want, and discard one card from the playing area</li>
            <li>Reach the target value with the least amount of turns and win!</li>
          </ol>
        </div>
        <span className="turn-text">Turn {turnCount}</span>

        <div className="number-header">
          <div className="current-number">
            <span><b>Current Value:</b></span>
            {!Number.isNaN(currentNumber) && currentNumber !== null
              ? <span>{currentNumber}</span>
              : <span>Invalid Expression</span>}
          </div>
          <div className="target-number">
            <span><b>Target Value:</b></span>
            {targetNumber}
          </div>
        </div>

        <PlayingField
          cards={playCards}
          setSelectedCard={setSelectedCard}
          selectedCard={selectedCard}
          dropCard={dropCard}
        />

        <div className="hand-wrapper">
          <Hand
            cards={handCards}
            setSelectedCard={setSelectedCard}
            selectedCard={selectedCard}
            returnTohand={returnToHand}
          />
        </div>

        <ActionContainer
          gameData={gameData}
          selectedCard={selectedCard}
          endTurn={endTurn}
          discardSelected={discardSelected}
          drawCard={drawCard}
        />

        {win && <VictoryOverlay turnCount={turnCount} onRestart={newGame} />}
      </div>

      <footer>
        <span>
          © 2025&nbsp;
          <span>
            Equatorix (Singleplayer)&nbsp;
          </span>
          | Created by
          <a>
            HamsterCoder
          </a>
        </span>
      </footer>
    </main>
  );
}

export default App;

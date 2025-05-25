import Confetti from 'react-confetti';

const VictoryOverlay = ({ turnCount, onRestart }) => {
  return (
    <div className="victory-overlay">
      <div>
        <h1>You have beat the game!</h1>
        <span>Turns Used: {turnCount}</span>
        <button onClick={onRestart}>Play Again!</button>
      </div>
      <Confetti width={window.innerWidth} height={window.innerHeight} />
    </div>
  );
};

export default VictoryOverlay;
import React from 'react'

const ActionContainer = ({selectedCard, gameData, endTurn, discardSelected, drawCard}) => {
  return (
    <div className="actions-container">
      <button
        className={`action-button next-turn-button ui ${gameData.cardsPlayed >= 1 ? 'activated' : ''}`}
        onClick={endTurn}
      >
        End Turn
      </button>
      <button
        className={`action-button trash-button ui ${
          selectedCard.card && selectedCard.card.fixed && gameData.discardsUsed < 1 ? 'activated' : ''
        }`}
        onClick={discardSelected}
      >
        Discard
      </button>
      <button
        className={`action-button draw-button ui ${
          gameData.cardsPlayed < 1 && gameData.discardsUsed < 1 ? 'activated' : ''
        }`}
        onClick={drawCard}
      >
        Draw Card
      </button>
    </div>
  )
}

export default ActionContainer
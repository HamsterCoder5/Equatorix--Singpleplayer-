import CardItem from './CardItem';
import { useEffect, useState } from 'react';

const Hand = ({ cards, selectedCard, setSelectedCard, returnTohand }) => {
  useEffect(() => {
    const handleClick = (e) => {
      if (!e.target.closest('.ui')) {
        setSelectedCard({ index: -1, from: null });
      }
    };

    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div className="hand ui" onClick={(e) => returnTohand(e)}>
      {cards.map((card) => (
        <CardItem 
          parent={"hand"}
          key={card.id} 
          card={card}
          selectedCard={selectedCard}
          setSelectedCard={setSelectedCard}
        />
      ))}
    </div>
  );
};

export default Hand;

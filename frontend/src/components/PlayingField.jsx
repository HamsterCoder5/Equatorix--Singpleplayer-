import CardItem from './CardItem';
import DropZone from './DropZone';

const PlayingField = ({ 
  cards, 
  selectedCard, 
  setSelectedCard,
  dropCard
}) => {
  const cardElements = cards.map((card, index) => {
    return (
      <CardItem 
        parent={"field"}
        dropCard = {dropCard}
        key={card.id} 
        card={card} 
        index={index}
        selectedCard={selectedCard}
        setSelectedCard={setSelectedCard}
      />
    );
  });

  return (
    <div className="playing-field ui">
      {cards.length > 0 && cardElements}
      {cards.length == 0 && 
        <DropZone index={0} dropCard={dropCard} dropping={selectedCard.card != undefined}/>
      }
    </div>
  );
};

export default PlayingField;

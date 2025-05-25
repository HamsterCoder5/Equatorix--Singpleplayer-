import DropZone from './DropZone.jsx';

const CardItem = ({ 
  parent,
  dropCard, 
  card, 
  selectedCard, 
  setSelectedCard, 
  index 
}) => {
  const selected = selectedCard ? (card == selectedCard.card) : false;

  function handleClick(e) {
    e.stopPropagation();  
    setSelectedCard({card: card, from:parent});
  }

  let dropping = (selectedCard.card != undefined && selectedCard.card.fixed == false);

  let className = "card";
  if (selected) className += " selected";
  if (card.fixed) className += " fixed";

  return (
    <>
      { parent == "field" && index == 0 && 
        <DropZone 
          index={0} 
          dropCard={dropCard} 
          dropping={dropping}
        />
      }
      <button 
        className={className} 
        onClick={(e) => {handleClick(e)}}
      >
        {card.value}
      </button>
      { parent == "field" &&
        <DropZone 
          index={index + 1} 
          dropCard={dropCard} 
          dropping={dropping}
        />
      }

    </>
  )

};

export default CardItem;

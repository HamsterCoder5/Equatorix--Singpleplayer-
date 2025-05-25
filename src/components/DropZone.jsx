const DropZone = ({ index, dropping, dropCard }) => {
  function handleClick(e) {
    if (!dropping)
        return;
      
    dropCard(index);
  }
  return (
    <button 
      className={`dropzone ${dropping ? "dropping" : ""}`}
      onClick={(e) => handleClick(e)}
    >

    </button>
  )
}

export default DropZone
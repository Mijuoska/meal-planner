

const Meal = ({ meal, toggleModal }) => {

const dragStartHandler = (e) => {
  e.dataTransfer.setData('text/plain', e.target.id)
  e.dataTransfer.dropEffect = "move"

}


    return (
        <div onDragStart={dragStartHandler} onDoubleClick={toggleModal}  
        className='meal-card' id={JSON.stringify(meal)} draggable='true'>
        {meal.recipe.name}
        </div>

    )

}

export default Meal
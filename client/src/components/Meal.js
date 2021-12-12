const Meal = ({ meal, toggleModal }) => {
  const dragStartHandler = (e) => {
    e.dataTransfer.setData("text/plain", e.target.id);
    e.dataTransfer.dropEffect = "move";
  };

const shortenRecipeName = (name) => {
  if (name.length > 30) {
  return name.substring(0,30) + '...'
  } else {
    return name;
  }
}

  return (
    <div
      onDragStart={dragStartHandler}
      onClick={toggleModal}
      className="meal-card"
      id={JSON.stringify(meal)}
      draggable="true"
    >
      {
        shortenRecipeName(meal.recipe_name)
      }
      <div className="meal-card-body">
        <span className="meal-assigned-to" style={{backgroundColor: meal.tag_color}}>{meal.assigned_to_name}</span>
      </div>
    </div>
  );
};

export default Meal;

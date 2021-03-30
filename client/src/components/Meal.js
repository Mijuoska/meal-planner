const Meal = ({ meal, toggleModal }) => {
  const dragStartHandler = (e) => {
    e.dataTransfer.setData("text/plain", e.target.id);
    e.dataTransfer.dropEffect = "move";
  };

  return (
    <div
      onDragStart={dragStartHandler}
      onClick={toggleModal}
      className="meal-card"
      id={JSON.stringify(meal)}
      draggable="true"
    >
      {meal.recipe_name}
      <div className="meal-card-body">
        <span className="meal-assigned-to">{meal.assigned_to_name}</span>
      </div>
    </div>
  );
};

export default Meal;

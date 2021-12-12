import helpers from '../helpers/helpers'

const Meal = ({ meal, toggleModal }) => {
  const dragStartHandler = (e) => {
    e.dataTransfer.setData("text/plain", e.target.id);
    e.dataTransfer.dropEffect = "move";
  };

const { shortenString } = helpers

  return (
    <div
      onDragStart={dragStartHandler}
      onClick={toggleModal}
      className="meal-card"
      id={JSON.stringify(meal)}
      draggable="true"
    >
      {
        shortenString(meal.recipe_name, 30)
      }
      <div className="meal-card-body">
        <span className="meal-assigned-to" style={{backgroundColor: meal.tag_color}}>{meal.assigned_to_name}</span>
      </div>
    </div>
  );
};

export default Meal;

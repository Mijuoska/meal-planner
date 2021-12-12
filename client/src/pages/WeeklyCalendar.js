import Meal from "../components/Meal";
import { useEffect, useState } from "react";
import Meals from "../services/Meals";
import Modal from "react-modal";
import MealForm from "../components/MealForm";

const WeeklyCalendar = ({ displayMessage, show }) => {

const [meals, setMeals] = useState([]);
const [isOpen, setIsOpen] = useState(false);
const [meal, setMeal] = useState("");


  const weekdayConfig = [
    { value: "monday", label: "Monday" },
    { value: "tuesday", label: "Tuesday" },
    { value: "wednesday", label: "Wednesday" },
    { value: "thursday", label: "Thursday" },
    { value: "friday", label: "Friday" },
    { value: "saturday", label: "Saturday" },
    { value: "sunday", label: "Sunday" },
  ];

  const mealConfig = [
    { value: "lunch", label: "Lunch" },
    { value: "dinner", label: "Dinner" },
  ];

  const calendarStyle = {
    gridTemplateColumns: `3fr ${weekdayConfig.map((n) => "5fr").join(" ")}`,
    gridTemplateRows: `50px ${mealConfig.map((n) => "150px").join(" ")}`,
  };

  const modalStyle = {
    content: {
      position: 'fixed',
      zIndex:2,
      width: "50%",
      margin: "auto",
      height: "26rem",
    },
  };

  

  const dropHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // get the dragged meal object from state
    const mealObj = JSON.parse(e.dataTransfer.getData("text/plain"));
    const movedMeal = meals.find((meal) => meal.id == mealObj.id);
    
    // update meal object with new day and meal type details
    const target = JSON.parse(e.currentTarget.id);
    if (meals.some(meal => meal.day === target.day && meal.type === target.meal.value))
      return

      movedMeal["day"] = target["day"];
    movedMeal["type"] = target["meal"]["value"];
    // Generate new meals array and update state
    const updatedMeals = meals
      .filter((meal) => meal.id != movedMeal.id)
      .concat(movedMeal);
    setMeals(updatedMeals);
    Meals.update(movedMeal, movedMeal.id);
  };

  const dragOverHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "move";
  };

  const toggleModal = (e) => {
    if (!isOpen) {
      const meal = JSON.parse(e.currentTarget.id);
      setMeal(meal);
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    Meals.getAll()
    .then((data) => {
      setMeals(data);
    }).catch(err => {
      displayMessage("We're having trouble retrieving your meal plan. Please try again later", "error", 5)
    })
  }, [show]);

  const generateHeader = () => {
    // Make a copy and create one empty slot
    const weekDays = weekdayConfig.map((day) => day);
    weekDays.unshift("");
    return weekDays.map((weekday) => (
      <div className="calendar-heading" id={weekday.value}>
        {weekday.label}
      </div>
    ));
  };

  const generateMealTypeLane = (meal) => {
    const weekDays = weekdayConfig.map((day) => day);
    weekDays.unshift(meal);
    return weekDays.map((weekday) =>
      weekDays.indexOf(weekday) == 0 ? (
        <div>
          <p>{weekday.label}</p>
        </div>
      ) : (
        <div
          className="meal-slot"
          id={JSON.stringify({
            day: weekday.value,
            meal: {
              value: meal.value,
              label: meal.label,
            },
          })}
          onDrop={dropHandler}
          onDragOver={dragOverHandler}
          onDoubleClick={toggleModal}
        >
          {meals
            .filter(
              (mealObj) =>
                mealObj.day == weekday.value && mealObj.type == meal.value
            )
            .map((meal) => {
              return <Meal meal={meal} toggleModal={toggleModal} />;
            })}

           <span id="create-new-meal">Double click to create new meal</span> 
        </div>
      )
    );
  };

  if (!show) {
    return null;
  }

  return (
    <div class="calendar" style={calendarStyle}>
      {generateHeader()}
      {mealConfig.map((meal) => generateMealTypeLane(meal))}

      <Modal
        isOpen={isOpen}
        onRequestClose={toggleModal}
        contentLabel="Uusi ateria"
        style={modalStyle}
      >
        <span className="modal-close" onClick={toggleModal}>
          X
        </span>
        <MealForm
          meal={meal}
          meals={meals}
          setMeals={setMeals}
          weekdays={weekdayConfig}
          setIsOpen={setIsOpen}
        />
      </Modal>
    </div>
  );
};

export default WeeklyCalendar;

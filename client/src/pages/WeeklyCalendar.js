import Meal from "../components/Meal";
import { useEffect, useState } from "react";
import Meals from "../services/Meals";
import Modal from "react-modal";
import MealForm from "../components/MealForm";
import config from '../config'

const WeeklyCalendar = ({ displayMessage, show }) => {

const [meals, setMeals] = useState([]);
const [isOpen, setIsOpen] = useState(false);
const [meal, setMeal] = useState("");


  const weekdayConfig = config.weekdayLabels

  const mealConfig = config.mealLabels


  const modalStyle = {
    content: {
      position: 'fixed',
      zIndex:2,
      width: "45%",
      margin: "auto",
      height: "28rem",
    },
  };

  

  const dropHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // get the dragged meal object from state
    const mealObj = JSON.parse(e.dataTransfer.getData("text/plain"));
    const movedMeal = meals.find((meal) => meal.id === mealObj.id);
    
    // update meal object with new day and meal type details
    const target = JSON.parse(e.currentTarget.id);
    if (meals.some(meal => meal.day === target.day && meal.type === target.meal.value))
      return

      movedMeal["day"] = target["day"];
    movedMeal["type"] = target["meal"]["value"];
    // Generate new meals array and update state
    const updatedMeals = meals
      .filter((meal) => meal.id !== movedMeal.id)
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
    if (show) {
    Meals.getAll()
    .then((data) => {      
      setMeals(data);
    }).catch(err => {
      displayMessage("We're having trouble retrieving your meal plan. Please try again later", "error", 5)
      
    })
    }
  }, [show]);

  const calendarStyle = {
    gridTemplateColumns: `3fr ${weekdayConfig.map((n) => "5fr").join(" ")}`,
    gridTemplateRows: `50px ${mealConfig.map((n) => "150px").join(" ")}`,
  };

  const generateHeader = () => {
    // Make a copy and create one empty slot
    const weekDays = weekdayConfig.map((day) => day);
    weekDays.unshift("");
    return weekDays.map((weekday) => (
      <div key={weekday.value} className="calendar-heading" id={weekday.value}>
        {weekday.label}
      </div>
    ));
  };

  const generateMealTypeLane = (meal) => {
    const weekDays = weekdayConfig.map((day) => day);
    weekDays.unshift(meal);
    return weekDays.map((weekday) =>
      weekDays.indexOf(weekday) === 0 ? (
        <div key={weekday.value}>
          <p>{weekday.label}</p>
        </div>
      ) : (
        <div key={weekday.value}
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
                mealObj.day === weekday.value && mealObj.type === meal.value
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
    <div className="calendar" style={calendarStyle}>
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
          displayMessage={displayMessage}
          meal={meal}
          meals={meals}
          setMeals={setMeals}
          weekdays={weekdayConfig}
          mealConfig={mealConfig}
          setIsOpen={setIsOpen}
        />
      </Modal>
    </div>
  );
};

export default WeeklyCalendar;

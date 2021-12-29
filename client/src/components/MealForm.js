import { useState, useEffect } from "react";
import Meals from "../services/Meals";
import Recipes from "../services/Recipes";
import Users from "../services/Users";

const MealForm = ({ displayMessage, meal, meals, setMeals, weekdays, mealConfig, setIsOpen }) => {

  const [editMode, setEditMode] = useState(meal.id ? true : false)
  const [day, setDay] = useState("");
  const [mealType, setMealType] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [recipe, setRecipe] = useState("");
  const [user, setUser] = useState("");
  const [users, setUsers] = useState([]);
  

  const getAndSetUser = (id) => {    
    const user = users.find((user) => user.id.toString() === id.toString())    
    setUser(user)
  }

  const submit = (e) => {
    e.preventDefault();
    const recipeObj = recipes.find((r) => r.id.toString() === recipe.toString());
    if (!recipeObj) {
      displayMessage('Cannot create a meal without a recipe. Please create a recipe first', 'error', 5)
      return;
    }
    const newMeal = {
      day: day,
      type: mealType.value ? mealType.value : mealType,
      recipe_id: recipe,
      recipe_name: recipeObj.name,
      assigned_to: user.id,
      assigned_to_name: user.first_name,
      tag_color: user.tag_color
    };

    

    if (!editMode) {
      Meals.create(newMeal)
        .then((data) => {
          newMeal.id = data[0].id
          const updatedMeals = meals.concat(newMeal);
          setMeals(updatedMeals);
        })
        .catch((err) => {
          console.log("something went wrong with creating a meal", err);
        });
    } else {
      Meals.update(newMeal, meal.id)
        .then(() => {
          newMeal.id = meal.id;
          const updatedMeals = meals
            .filter((m) => m.id != meal.id)
            .concat(newMeal);
          setMeals(updatedMeals);
        })
        .catch((err) => {
          console.log("something went wrong with updating a meal", err);
        });
    }
    setIsOpen(false);
  };

  const remove = (e) => {
    e.preventDefault();
    Meals.remove(meal.id)
      .then(() => {
        const updatedMeals = meals.filter((m) => m.id != meal.id);
        setMeals(updatedMeals);
        setIsOpen(false);
      })
      .catch((err) => {
        console.log("something went wrong with removing a meal", err);
      });
  };

  useEffect(() => {
/**
 * We're fetching all the recipes to populate the list  
 * If we're editing an existing meal, we set the default state
 * based on its values
 * Same goes for users
 */

    Recipes.getAll().then((data) => {
      setRecipes(data);
      if (editMode) {
        setRecipe(meal.recipe_id);
      } else if (data.length > 0) {
        setRecipe(data[0].id);
      }
    });
    setDay(meal.day);
    setMealType(meal.meal ? meal.meal.value : meal.type);

    Users.getAll().then((data) => {
      setUsers(data)
      if (editMode) {
      setUser({id: meal.assigned_to, first_name: meal.assigned_to_name});
    } else if (data.length > 0) {
    setUser(data[0])
        }
    });
  }, []);

  return (
    <div className="form-container">
      <div className="form-wrapper" id="meal-form-wrapper">
        <h2>{!meal.id ? "Create new meal" : "Update meal"}</h2>
        <form className="meal-form">
          <div>
            <label>Weekday</label>
            <select value={day} onChange={({ target }) => setDay(target.value)}>
              {weekdays.map((weekday) => (
                <option value={weekday.value}>{weekday.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Meal</label>
            <select
              value={mealType}
              onChange={({ target }) => setMealType(target.value)}
            >
            {mealConfig.map(mealObj => <option value={mealObj.value}>{mealObj.label}</option>)}
            </select>
          </div>
          <div>
            <label>Recipe</label>
            <select
              value={recipe}
              onChange={({ target }) => setRecipe(target.value)}
            >
              {recipes.map((recipe) => (
                <option value={recipe.id}>{recipe.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Assignee</label>
            <select
              value={user.id}
              onChange={({ target }) => getAndSetUser(target.value)}
            >
              {users.map((user) => (
                <option value={user.id}>{user.first_name}</option>
              ))}
            </select>
          </div>

          <button type="submit" className="submit-button" onClick={submit}>
            {!meal.id ? "Submit" : "Save changes"}
          </button>
          {meal.id ? (
            <button className="delete-button" type="delete" onClick={remove}>
              Delete
            </button>
          ) : null}
        </form>
      </div>
    </div>
  );
};

export default MealForm;

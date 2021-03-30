import { useState, useEffect } from "react";
import Meals from "../services/Meals";
import Recipes from "../services/Recipes";
import Users from "../services/Users";

const MealForm = ({ meal, meals, setMeals, weekdays, setIsOpen }) => {

  const [editMode, setEditMode] = useState(meal.id ? true : false)
  const [day, setDay] = useState("");
  const [mealType, setMealType] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [recipe, setRecipe] = useState("");
  const [user, setUser] = useState("");
  const [users, setUsers] = useState([]);


  const submit = (e) => {
    e.preventDefault();
    const recipeObj = recipes.find((r) => r.id == recipe);
    const newMeal = {
      day: day,
      type: mealType.value ? mealType.value : mealType,
      recipe_id: recipe,
      recipe_name: recipeObj.name,
      assigned_to: user.id,
    };

    if (!editMode) {
      Meals.create(newMeal)
        .then((data) => {
          data[0].assigned_to_name = user.first_name;
          const updatedMeals = meals.concat(data[0]);
          setMeals(updatedMeals);
        })
        .catch((err) => {
          console.log("something went wrong with creating a meal", err);
        });
    } else {
      Meals.update(newMeal, meal.id)
        .then((data) => {
            console.log(data[0])
        data[0].assigned_to_name = user.first_name;
          const updatedMeals = meals
            .filter((m) => m.id != meal.id)
            .concat(data[0]);
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
      .then((data) => {
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
      } else {
        setRecipe(data[0].id);
      }
    });
    setDay(meal.day);
    setMealType(meal.meal ? meal.meal : meal.type);

    Users.getAll().then((data) => {
      setUsers(data)
      if (editMode) {
      setUser({id: meal.assigned_to, first_name: meal.assigned_to.first_name});
    } else {
    setUser(data[0])
        }
    });
  }, []);

  return (
    <div className="meal-form-container">
      <div className="meal-form-wrapper">
        <h2>{!meal.id ? "Luo uusi ateria" : "Päivitä ateria"}</h2>
        <form className="meal-form">
          <div>
            <label>Viikonpäivä</label>
            <select value={day} onChange={({ target }) => setDay(target.value)}>
              {weekdays.map((weekday) => (
                <option value={weekday.value}>{weekday.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Ateria</label>
            <select
              value={mealType}
              onChange={({ target }) => setMealType(target.value)}
            >
              <option value="lunch">Lounas</option>
              <option value="dinner">Päivällinen</option>
            </select>
          </div>
          <div>
            <label>Resepti</label>
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
            <label>Vastuuhenkilö</label>
            <select
              value={user.id}
              onChange={({ target }) => setUser({'id': target.value, 'first_name': target.options[target.selectedIndex].textContent})}
            >
              {users.map((user) => (
                <option value={user.id}>{user.first_name}</option>
              ))}
            </select>
          </div>

          <button type="submit" className="submit-button" onClick={submit}>
            {!meal.id ? "Lähetä" : "Päivitä"}
          </button>
          {meal.id ? (
            <button className="delete-button" type="delete" onClick={remove}>
              Poista
            </button>
          ) : null}
        </form>
      </div>
    </div>
  );
};

export default MealForm;

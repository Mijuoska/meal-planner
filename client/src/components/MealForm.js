import { useState, useEffect } from 'react'
import Meals from '../services/Meals'
import Recipes from '../services/Recipes'
import Users from '../services/Users'


const MealForm = ({ meal, meals, setMeals, weekdays, setIsOpen }) => {


const [day, setDay] = useState('')
const [mealType, setMealType] = useState('')
const [recipes, setRecipes] = useState([])
const [recipe, setRecipe] = useState('')
const [user, setUser] = useState('')
const [users, setUsers] = useState([])


const submit = (e) => {
e.preventDefault()
const recipeObj = recipes.find(r => r.id == recipe)
const newMeal = {
    day: day,
    type: mealType.value ? mealType.value : mealType,
    recipe_id: recipe,
    recipe_name: recipeObj.name,
    assigned_to: user.id
}

if (!meal.id) {
Meals.create(newMeal).then(data => {
    const updatedMeals = meals.concat(newMeal);
    setMeals(updatedMeals)
}).catch(err => {
    console.log('something went wrong with creating a meal', err)
})
} else {
    Meals.update(newMeal, meal.id).then(data => {
     const updatedMeals = meals.filter(m => m.id != meal.id).concat(newMeal);
     console.log(updatedMeals)
     setMeals(updatedMeals)
    }).catch(err => {
        console.log('something went wrong with updating a meal', err)
    })
}
setIsOpen(false)
} 

const remove = (e) => {
    e.preventDefault()
    Meals.remove(meal.id).then(data => {
        const updatedMeals = meals.filter(m => m.id != meal.id)
        setMeals(updatedMeals)
        setIsOpen(false)
    }).catch(err => {
        console.log('something went wrong with removing a meal', err)
    })

}

useEffect(() => {
    Recipes.getAll().then(data => {
        setRecipes(data)
        if (meal.recipe_id) {
            setRecipe(meal.recipe_id)
        } else {
        setRecipe(data[0].id)
        }
    })
        setDay(meal.day)
        setMealType(meal.meal ? meal.meal : meal.type)


    Users.getAll().then(data => {
        setUsers(data)
        setUser(data[0])
    })

}, [])

    return (
        <div className="meal-form-container">
<div className="meal-form-wrapper">
<h2>{!meal.id ? "Luo uusi ateria" : "Päivitä ateria"}</h2>
<form className="meal-form">
<div>
<label>Viikonpäivä</label>
<select value={day} onChange={({ target }) => setDay(target.value)}>
{weekdays.map(weekday => <option value={weekday.value}>{weekday.label}</option>)}
</select>
</div>
<div>
<label>Ateria</label>
<select value={mealType} onChange={({ target }) => setMealType(target.value)}>
<option value="lunch">
Lounas
</option>
<option value="dinner">
Päivällinen
</option>
</select>
</div>
<div>
<label>Resepti</label>
<select value={recipe} onChange={({ target }) => setRecipe(target.value)}>
{recipes.map(recipe => <option value={recipe.id}>{recipe.name}</option>)}
</select>
</div>
<div>
<label>Vastuuhenkilö</label>
<select value={user} onChange={({ target }) => setUser(target.value)}>
{users.map(user => <option value={user.id}>{user.first_name}</option>)}
</select>
</div>

<button type="submit" className="submit-button" onClick={submit}>{!meal.id ? "Lähetä" : "Päivitä"}</button>
{meal.id ? <button className="delete-button" type="delete" onClick={remove}>Poista</button> : null}
</form>
</div>
</div>
    )

}

export default MealForm
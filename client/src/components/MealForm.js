import { useState, useEffect } from 'react'
import Meals from '../services/Meals'
import Recipes from '../services/Recipes'
import Users from '../services/Users'


const MealForm = ({ meal, meals, setMeals, weekdays, setIsOpen }) => {


const [weekday, setWeekday] = useState()
const [mealType, setMealType] = useState()
const [recipes, setRecipes] = useState([])
const [recipe, setRecipe] = useState('')
const [user, setUser] = useState('')
const [users, setUsers] = useState([])

console.log(recipes)

const submit = (e) => {
e.preventDefault()
const recipeObj = recipes.find(r => r.id == recipe)
const newMeal = {
    day: weekday,
    meal: {value: mealType},
    recipe: {name: recipeObj.name, id: recipeObj.id}
}

if (!meal.id) {
Meals.create(newMeal).then(data => {
}).catch(err => {
    console.log('something went wrong with creating a meal', err)
})
} else {
    Meals.update(newMeal, meal.id).then(data => {
     const updatedMeals = meals.filter(m => m.id != meal.id).concat(data);
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
    }).catch(err => {
        console.log('something went wrong with removing a meal', err)
    })

}

useEffect(() => {
    Recipes.getAll().then(data => {
        setRecipes(data)
        if (meal.recipe) {
            setRecipe(meal.recipe.id)
        } else {
        setRecipe(data[0].id)
        }
    })
        setWeekday(meal.day)
        setMealType(meal.meal.value)

    Users.getAll().then(data => {
        setUsers(data)
    })

}, [])

    return (
        <div className="meal-form-container">
<div className="meal-form-wrapper">
<h2>{!meal.id ? "Luo uusi ateria" : "Päivitä ateria"}</h2>
<form className="meal-form">
<div>
<label>Viikonpäivä</label>
<select value={weekday} onChange={({ target }) => setWeekday(target.value)}>
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
{users.map(user => <option value={user.id}>{user.name}</option>)}
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
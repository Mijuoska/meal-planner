import React, { useEffect, useState} from 'react'
import Recipes from '../services/Recipes'
import Ingredients from '../services/Ingredients'
import Units from '../services/Units'
import CreatableSelect from 'react-select/creatable';

const RecipeForm = ({ displayMessage, toggleModal, recipes, setRecipes, recipeID }) => {
    const [showForm, toggleForm] = useState(true)
    const [recipe, setRecipe] = useState(recipeID ? recipes.find(r => r.id.toString() === recipeID) : null)
    const [name, setName] = useState()
    const [units, setUnits] = useState([])
    const [ingredients, setIngredients] = useState([])
    const [ingredientOptions, setIngredientOptions] = useState([])
    const [duration, setDuration] = useState('')
    const [instructions, setInstructions] = useState('')


/**
 * Ingredient options are fetched and default quantities and units need to be populated
 */

useEffect(() => {
Units.getAll().then(data => {
    setUnits(data);
}).catch(err => {
    console.log(err);
})

 Ingredients.getAll().then(data => {
     const options = data.map(i => {
         return {'value': i.value, 'label': i.label, 'quantity': 1, 'unit': 'tl'}
     })
     setIngredientOptions(options);
 }).catch(err => {
      console.log(err);
     displayMessage('Something went wrong with fetching ingredients', 'error', 5)
    })

 /**
  * I an existing recipe is opened, we populate existing values. Form is not shown by default
  * 
  */
   if (recipe) {
        toggleForm(false)
         setName(recipe.name)
         setDuration(recipe.preparation_time)
         setInstructions(recipe.instructions)
         Recipes.getIngredients(recipe.id).then(data => {
            setIngredients(data)
         }).catch(err => {
            console.log(err);
             displayMessage('Something went wrong with fetching ingredients', 'error', 5)
         })
    
   }
}, [recipe])




/**
 * Populating ingredients state with the quantity and unit data each time 
 * the user modifies these
 */

const populateQuantity = (target) => {
    const q = ingredients.map(i => {
      return i.value.toString() === target.id.toString() ? 
      {...i, quantity: parseFloat(target.value)} : i
    })
    setIngredients(q)
}

const populateUnit = (target) => {
    const q = ingredients.map(i => {
        return i.value.toString() === target.id.toString() ? {
            ...i,
            unit: target.value
        } : i
    })
    setIngredients(q)
}

const createRecipe = (recipe) => {
    Recipes.create(recipe).then(data => {
    setRecipes(recipes.concat(data[0]))
 setName('')
 setIngredients([])
 setDuration('')
 setInstructions('')
 toggleModal()
 displayMessage(`Created new recipe "${data[0].name}"`,"success", 5)
 }).catch(err => {
     console.log(err)
     displayMessage('Something went wrong with saving the recipe',"error", 5)
  
 })

}

const createNewIngredient = (name) => {
    const newIngredient = {'name': name}
    Ingredients.create(newIngredient).then(data => {
       const createdIngredient =  {
            'value': data[0].id,
            'label': data[0].name,
            'quantity': 1,
            'unit': 'tl'
        }
      
        setIngredientOptions([...ingredientOptions, createdIngredient])
        setIngredients([...ingredients, createdIngredient])
    }).catch(err => {
        console.log(err)
        displayMessage('Something went wrong with creating a new ingredient', "error", 5)
    }) 
}

const updateRecipe = (id, recipe) => {
    Recipes.update(id, recipe).then(data => {
    const updatedRecipes = recipes.filter(r => r.id.toString() !== data[0].id.toString()).concat(data[0])
    setRecipes(updatedRecipes)
 setName(data[0].name)
 setDuration(data[0].preparation_time)
 setInstructions(data[0].instructions)
 toggleModal()
 displayMessage(`Saved changes to "${data[0].name}"`,"success",5)
 }).catch(err => {
     console.log(err)
     displayMessage('Something went wrong with saving the recipe',"error", 5)
 })

}

const deleteRecipe = (e, recipeID) => {
    e.preventDefault()
    Recipes.remove(recipeID).then(data => {
        const updatedRecipes = recipes.filter(r => r.id.toString() !== recipeID)
        setRecipes(updatedRecipes)
        displayMessage('Recipe deleted','success', 5)
        toggleModal()
    }).catch(err => {
        console.log(err)
        displayMessage('Failed deleting recipe', 'error', 5)
    })
}

const submit = (e) => {
    e.preventDefault();
   const newRecipe = {
       name,
       ingredients,
       instructions,
       duration: Number(duration)
   }
if (!recipeID) {
    createRecipe(newRecipe)
} else {
    updateRecipe(recipeID, newRecipe)
}
   

}

if (showForm) {
return (
  
<div className="form-container">
<div className="form-wrapper" id="recipe-form-wrapper">
<h2>{!recipe ? 'Create new recipe' : 'Edit recipe'}</h2>
<form className="recipe-form">
<div>
<label>
Name
</label>
<input style={{width: 520}} id="recipe-name" type="text" value={name} onChange={({target}) => setName(target.value)}/>
</div>
<div>
<label>Preparation time</label>
<input style={{width: 100}} id="preparation-time" type="number" value={duration} onChange={({target}) => setDuration(target.value)}/> min
</div>
<div>
<label>Ingredients</label>
<CreatableSelect id="ingredients-picker" onCreateOption={createNewIngredient} onChange={setIngredients} value={ingredients} placeholder="Search ingredients" options={ingredientOptions} isMulti={true} 
isSearchable={true}/>
</div>
<div>
<ul style={{listStyle: 'none'}}>
{ingredients.map(i => <li key={i.value} style={{width: '60%', borderBottom: '1px solid gray', margin: '0.5rem 0 0.5rem 0'}}> 
    
    <input type="number" style={{border: 'none', width: '3rem', marginRight: '5px'}} step="0.1" id={i.value} 
    value={i.quantity} className="quantity-input" 
    onChange={({ target }) => populateQuantity(target)}/>

    <select className="unit-input" id={i.value} style={{border: 'none', width: '2.5rem', paddingLeft: '0.5rem',
    marginRight: '5px', webkitAppearance: 'none'}} value={i.unit} onChange={({target})=>populateUnit(target)}>
    {units.map(u => <option value={u.name}>{u.name}</option>)}
    </select>
    
    {i.label}
    
    </li>)}
</ul>
</div>
<div>
<label>Instructions</label>
<textarea id="instructions" rows="15" cols="70" value={instructions} onChange={({target}) => setInstructions(target.value)}></textarea>
</div>
<button className="submit-button" type="submit" onClick={submit}>Save</button>
{recipeID ? <button className="delete-button" onClick={(e) => deleteRecipe(e, recipeID)}>Delete</button> : null}
</form>
</div>
</div>

)
} else {
    return (
        <div>
        <h2>{recipe.name}</h2>
        <p><strong>Preparation time:</strong> {recipe.preparation_time}</p>
        <div>
        <ul>
        {ingredients.map(i => <li>{i.quantity} {i.unit} {i.label}</li>)}
        </ul>
        </div>
        <p><strong>Instructions:</strong> {recipe.instructions}</p>

        <button id="edit-recipe-button" onClick={() => toggleForm(true)}>Edit</button>
        </div>
    )
}

}

export default RecipeForm
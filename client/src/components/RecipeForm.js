import {useEffect, useState} from 'react'
import Recipes from '../services/Recipes'
import Notification from './Notification'
import Ingredients from '../services/Ingredients'
import Select from 'react-select'

const RecipeForm = ({ setMessage, message, recipes, setRecipes, recipeID }) => {
    const [recipe, setRecipe] = useState(recipeID ? recipes.find(r => r.id == recipeID) : null)
    const [name, setName] = useState()
    const [ingredients, setIngredients] = useState([])
    const [ingredientOptions, setIngredientOptions] = useState([])
    const [duration, setDuration] = useState('')
    const [instructions, setInstructions] = useState('')

console.log(recipeID)
console.log(recipe)
const units = ['tl', 'rkl', 'dl', 'l', 'g', 'kg', 'kpl', 'prk', 'pkt', 'tlk', 'rs', 'ps']

/**
 * Ingredient options are fetched and default quantities and units need to be populated
 */


useEffect(() => {
 Ingredients.getAll().then(data => {
     const options = data.map(i => {
         return {'value': i.value, 'label': i.label, 'quantity': 1, 'unit': 'tl'}
     })
     setIngredientOptions(options);
 }).catch(err => {
     console.log(err);
 })

 /**
  * I an existing recipe is opened, we populate the form values, fetching ingredients from the server
  */
   if (recipe) {
         setName(recipe.name)
         setDuration(recipe.preparation_time)
         setInstructions(recipe.instructions)
         Recipes.getIngredients(recipe.id).then(data => {
            setIngredients(data)
         }).catch(error => {
             console.log(error);
         })
    
   }
}, [recipe])


/**
 * Populating ingredients state with the quantity and unit data each time 
 * the user modifies these
 */

const populateQuantity = (target) => {
    const q = ingredients.map(i => {
      return i.value == target.id ? 
      {...i, quantity: parseFloat(target.value)} : i
    })
    setIngredients(q)
}

const populateUnit = (target) => {
    const q = ingredients.map(i => {
        return i.value == target.id ? {
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
 setMessage({content: `Luotu uusi resepti "${data[0].name}"`, type:"success"})
 }).catch(err => {
     setMessage({content: 'Jokin meni vikaan reseptin tallentamisessa', type:"error"})
     console.log(err)
 })
setTimeout(() => {
    setMessage('')
}, 3000);
}

const updateRecipe = (id, recipe) => {
    Recipes.update(id, recipe).then(data => {
    const updatedRecipes = recipes.filter(r => r.id != data[0].id).concat(data[0])
    setRecipes(updatedRecipes)
 setName(data[0].name)
 setDuration(data[0].preparation_time)
 setInstructions(data[0].instructions)
 setMessage({content: `Tallennettu muutokset reseptiin "${data[0].name}"`, type:"success"})
 }).catch(err => {
     setMessage({content: 'Jokin meni vikaan reseptin tallentamisessa', type:"error"})
     console.log(err)
 })
 setTimeout(() => {
     setMessage('')
 }, 3000);
}


const submit = (e) => {
    e.preventDefault();
   const newRecipe = {
       name,
       ingredients,
       instructions,
       duration: Number(duration)
   }
if (!recipe.id) {
    createRecipe(newRecipe)
} else {
    updateRecipe(recipe.id, newRecipe)
}
   

}


return (
<div className="form-wrapper">
<h2>{!recipe ? 'Luo uusi resepti' : 'Muokkaa reseptiä'}</h2>
<form>
<div>
<label>
Nimi
</label>
<input style={{width: 370}} type="text" value={name} onChange={({target}) => setName(target.value)}/>
</div>
<div>
<label>Valmistusaika</label>
<input style={{width: 100}} type="number" value={duration} onChange={({target}) => setDuration(target.value)}/>
</div>
<div>
<label>Ainesosat</label>
<Select onChange={setIngredients} value={ingredients} placeholder="Etsi ainesosia" options={ingredientOptions} isMulti={true} 
isSearchable={true}/>
</div>
<div>
<ul>
{ingredients.map(i => <li key={i.value}>{i.label}
    <input type="number" step="0.1" id={i.value} value={i.quantity} placeholder="Määrä" className="quantity-input" 
    onChange={({ target }) => populateQuantity(target)}/>
    <select id={i.value} value={i.unit} onChange={({target})=>populateUnit(target)}>
    {units.map(u => <option value={u}>{u}</option>)}
    </select>
    </li>)}
</ul>
</div>
<div>
<label>Valmistusohjeet</label>
<textarea rows="10" cols="50" value={instructions} onChange={({target}) => setInstructions(target.value)}></textarea>
</div>
<button type="submit" onClick={submit}>Lähetä</button>
</form>
<Notification message={message}/>
</div>
)

}

export default RecipeForm
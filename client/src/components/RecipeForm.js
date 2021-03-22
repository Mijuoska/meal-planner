import {useState} from 'react'
import Recipes from '../services/Recipes'
import Notification from './Notification'

const RecipeForm = ({ setMessage, message }) => {
    const [name, setName] = useState('')
    const [ingredients, setIngredients] = useState('')
    const [duration, setDuration] = useState('')
    const [instructions, setInstructions] = useState('')


const submit = (e) => {
    e.preventDefault();
   const newRecipe = {
       name: name,
       duration: Number(duration),
       ingredients: ingredients,
       instructions: instructions,
   }
   Recipes.create(newRecipe)
   .then(data => {
 setName('')
 setIngredients('')
 setDuration('')
 setInstructions('')
 setMessage({content: `Luotu uusi resepti "${data.name}"`, type:"success"})
 setTimeout(() => {
     setMessage('')
 }, 3000);
 }).catch(err => {
     setMessage({content: 'Jokin meni vikaan reseptin tallentamisessa', type:"error"})
     console.log(err)
 })

}

return (
<div className="form-wrapper">
<form id="recipe-form">
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
<textarea rows="10" cols="50" value={ingredients} onChange={({target}) => setIngredients(target.value)}></textarea>
</div>
<div>
<label>Valmistuohjeet</label>
<textarea rows="10" cols="50" value={instructions} onChange={({target}) => setInstructions(target.value)}></textarea>
</div>
<button type="submit" onClick={submit}>Lähetä</button>
</form>
<Notification message={message}/>
</div>
)

}

export default RecipeForm
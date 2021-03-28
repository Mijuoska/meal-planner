import { useState, useEffect } from 'react'
import Recipes from '../services/Recipes'

const RecipesList = ( { show, recipeFormModal, toggleModal } ) => {

const [recipes, setRecipes] = useState([])
const [selectedRecipe, selectRecipe] = useState('')
const [filter, setFilter] = useState('')


const gridStyle = {
    display: 'grid',
    gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))",
//    gridTemplateRows: `50px 200px 200px`,
    gridGap: '0.2rem'
}


const setRecipe = (id) => {
    const recipe = recipes.find(r => r.id == id);
    selectRecipe(recipe)
}

useEffect(() => {
    Recipes.getAll()
    .then(data => {
        setRecipes(data)
    })
}, [])

if (!show) {
    return null
}

return (
<div>
<input type="text" className='search-box' placeholder="Hae reseptiä" onChange={({target})=> setFilter(target.value.toLowerCase())}/>
<ul className='recipes-list-container' style={gridStyle}>
{recipes.filter(recipe => recipe.name.toLowerCase().indexOf(filter) != -1)
    .map(recipe => <li class='recipes-list-card' onClick={({ currentTarget })=> {
                    console.log(currentTarget.id)
                    setRecipe(currentTarget.id)
                    toggleModal()
                        
                    }}
                    id={recipe.id} key={recipe.id}>
    {recipe.name}
    <div className="recipe-list-card-details">Valmistusaika: {recipe.duration} h</div>
   {recipeFormModal("Muokkaa reseptiä", selectedRecipe)}
    
 

    </li>)}

</ul>

</div>

)

}

export default RecipesList
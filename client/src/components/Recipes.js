import { useState, useEffect } from 'react'
import Recipes from '../services/Recipes'

const RecipesList = ( { show, modal, toggleModal } ) => {

const [recipes, setRecipes] = useState([])
const [recipeID, setRecipeID ] = useState('')
const [filter, setFilter] = useState('')

const gridStyle = {
    display: 'grid',
    gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))",
//    gridTemplateRows: `50px 200px 200px`,
    gridGap: '0.2rem'
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
    .map(recipe => <li class='recipes-list-card' onDoubleClick={({ target })=> {
                    setRecipeID(target.id)
                    toggleModal( target.id )
                        
                    }}
                    id={recipe.id} key={recipe.id}>
    {recipe.name}
    <div className="recipe-list-card-details">Valmistusaika: {recipe.duration} h</div>
   {modal("Muokkaa reseptiä", recipeID)}
    
 

    </li>)}

</ul>

</div>

)

}

export default RecipesList
import { useState, useEffect } from 'react'
import RecipeFormModal from './RecipeFormModal'
import Recipes from '../services/Recipes'
import Recipe from './Recipe'


const RecipesList = ( { show, setMessage, toggleModal, isOpen } ) => {

const [recipes, setRecipes] = useState([])
const [selectedRecipe, selectRecipe] = useState('')
const [filter, setFilter] = useState('')


const gridStyle = {
    display: 'grid',
    gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))",
//    gridTemplateRows: `50px 200px 200px`,
    gridGap: '0.2rem'
}

const modalStyle = {
    content: {
        width: '50%',
        margin: 'auto',
        height: 'auto',

    }
}

useEffect(() => {
    Recipes.getAll().then(data => {
        setRecipes(data)
    })
}, [])



if (!show) {
    return null
}

return (
<div>

<RecipeFormModal isOpen={isOpen} 
toggleModal={toggleModal}
label={'recipe form'} 
style={modalStyle} 
selectRecipe={selectRecipe}
selectedRecipe={selectedRecipe}
recipes={recipes}
setRecipes={setRecipes}
setMessage={setMessage}
/>
 

<input type="text" className='search-box' placeholder="Hae reseptiä" 
onChange={({target})=> setFilter(target.value.toLowerCase())}/>

<button style={{marginLeft: '1rem'}} id="create-recipe" onClick={() => toggleModal()}>Luo uusi resepti</button>


<ul className='recipes-list-container' style={gridStyle}>
{recipes.filter(recipe => recipe.name.toLowerCase().indexOf(filter) != -1)
    .map(recipe => <Recipe recipe={recipe} selectRecipe={selectRecipe} toggleModal={toggleModal}/>)}

</ul>

</div>

)

}

export default RecipesList
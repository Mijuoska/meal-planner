import { useState, useEffect } from 'react'
import RecipeFormModal from '../components/RecipeFormModal'
import Recipes from '../services/Recipes'
import Recipe from '../components/Recipe'


const RecipesList = ( { show, displayMessage, toggleModal, isOpen } ) => {

const [recipes, setRecipes] = useState([])
const [selectedRecipe, selectRecipe] = useState('')
const [filter, setFilter] = useState('')


const gridStyle = {
    display: 'grid',
    gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))",
//    gridTemplateRows: `50px 200px 200px`,
    gridGap: '0.5rem'
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
    }).catch(err => {
        if (err.response.status === 403) {
            window.localStorage.removeItem('loggedInUser')
    
        } else {
        displayMessage("We're having trouble fetching recipes. Please try again later", "error", 5)
        }
    })
}, [show])



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
displayMessage={displayMessage}
/>
 

<input type="text" className='search-box' placeholder="Search recipes" 
onChange={({target})=> setFilter(target.value.toLowerCase())}/>

<button style={{marginLeft: '1rem'}} id="create-recipe" onClick={() => toggleModal()}>Create new recipe</button>


<ul className='recipes-list-container' style={gridStyle}>
{recipes.filter(recipe => recipe.name.toLowerCase().indexOf(filter) !== -1)
    .map(recipe => <Recipe recipe={recipe} selectRecipe={selectRecipe} toggleModal={toggleModal}/>)}

</ul>

</div>

)

}

export default RecipesList
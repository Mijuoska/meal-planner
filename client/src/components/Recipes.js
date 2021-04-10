import { useState, useEffect } from 'react'
import Modal from 'react-modal'
import RecipeForm from './RecipeForm'
import Recipes from '../services/Recipes'


const RecipesList = ( { show, message, setMessage, toggleModal, isOpen } ) => {

const [recipes, setRecipes] = useState([])
const [selectedRecipe, selectRecipe] = useState('')
const [filter, setFilter] = useState('')

console.log(recipes)

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

  <Modal
        isOpen={isOpen}
        onRequestClose={toggleModal}
        shouldCloseOnOverlayClick={false}
        contentLabel={'Muokkaa reseptiä'}
        style={modalStyle}
        onAfterClose={() => selectRecipe('')}
      >
       <span className='modal-close' onClick={toggleModal}>X</span>
   <RecipeForm setMessage={setMessage} 
   message={message} recipes={recipes} 
   setRecipes={setRecipes} recipeID={selectedRecipe}/>
       
      </Modal>


<input type="text" className='search-box' placeholder="Hae reseptiä" 
onChange={({target})=> setFilter(target.value.toLowerCase())}/>
<ul className='recipes-list-container' style={gridStyle}>
{recipes.filter(recipe => recipe.name.toLowerCase().indexOf(filter) != -1)
    .map(recipe => <li class='recipes-list-card' onClick={({ currentTarget })=> {
                    selectRecipe(currentTarget.id)
                    toggleModal()
                        
                    }}
                    id={recipe.id} key={recipe.id}>
    {recipe.name}
    <div className="recipe-list-card-details">Valmistusaika: {recipe.preparation_time} min</div>
    
 

    </li>)}

</ul>

</div>

)

}

export default RecipesList
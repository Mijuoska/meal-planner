import React from 'react'
import Modal from 'react-modal'
import RecipeForm from './RecipeForm'

const RecipeFormModal = (props) => {

    return (
  <Modal
        isOpen={props.isOpen}
        onRequestClose={props.toggleModal}
        shouldCloseOnOverlayClick={true}
        contentLabel={props.label}
        style={props.style}
        onAfterClose={() => props.selectRecipe('')}
      >
       <span className='modal-close' onClick={props.toggleModal}>X</span>
    <RecipeForm displayMessage={props.displayMessage} 
   toggleModal={props.toggleModal}
   recipes={props.recipes} 
   setRecipes={props.setRecipes} recipeID={props.selectedRecipe}
   /> 
       </Modal>
    )
}

export default RecipeFormModal
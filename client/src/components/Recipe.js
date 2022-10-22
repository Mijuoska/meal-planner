import React from 'react'
import helpers from '../helpers/helpers'


const Recipe = ( { recipe, selectRecipe, toggleModal }) => {

const { shortenString } = helpers

    return (
        <li class='recipes-list-card' id={recipe.id} key={recipe.id} onClick={({ currentTarget })=> {
                    selectRecipe(currentTarget.id)
                    toggleModal()
                        
                    }}>
<b>{shortenString(recipe.name, 30)}</b>
    <div className="recipe-list-card-details">Preparation time: {recipe.preparation_time} min</div>

    <span className="edit-recipe"  
>Click to view</span>
</li>

    )
}

export default Recipe
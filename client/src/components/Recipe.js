

const Recipe = ( { recipe, selectRecipe, toggleModal }) => {

    return (
        <li class='recipes-list-card' key={recipe.id}>
    {recipe.name}
    <div className="recipe-list-card-details">Preparation time: {recipe.preparation_time} min</div>

    <span className="edit-recipe-link" id={recipe.id} onClick={({ currentTarget })=> {
                    selectRecipe(currentTarget.id)
                    toggleModal()
                        
                    }}
>Edit</span>
</li>

    )
}

export default Recipe
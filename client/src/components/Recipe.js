

const Recipe = ( { recipe, selectRecipe, toggleModal }) => {

    return (
        <li class='recipes-list-card' id={recipe.id} key={recipe.id} onClick={({ currentTarget })=> {
                    selectRecipe(currentTarget.id)
                    toggleModal()
                        
                    }}>
    {recipe.name}
    <div className="recipe-list-card-details">Preparation time: {recipe.preparation_time} min</div>

    <span className="edit-recipe"  
>Click to view</span>
</li>

    )
}

export default Recipe
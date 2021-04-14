

const Recipe = ( { recipe, selectRecipe, toggleModal }) => {

    return (
        <li class='recipes-list-card' key={recipe.id}>
    {recipe.name}
    <div className="recipe-list-card-details">Valmistusaika: {recipe.preparation_time} min</div>

    <span id={recipe.id} onClick={({ currentTarget })=> {
                    selectRecipe(currentTarget.id)
                    toggleModal()
                        
                    }}
>Muokkaa</span>
</li>

    )
}

export default Recipe
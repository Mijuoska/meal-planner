import { useEffect, useState } from 'react'
import WeeklyCalendar from './components/WeeklyCalendar'
import Recipes from './components/Recipes'
import RecipesService from './services/Recipes'


const App = () => {

const [page, setPage] = useState('weekly-calendar')
const [message, setMessage] = useState('')
const [isOpen, setIsOpen] = useState(false)
const [recipes, setRecipes] = useState([])

useEffect(() => {
RecipesService.getAll().then(data => {
  setRecipes(data)
})
}, [])

// const RecipeFormModal = (label, recipes, recipeID) => {

//   return (
//      <Modal
//         isOpen={isOpen}
//         onRequestClose={toggleModal}
//         shouldCloseOnOverlayClick={false}
//         contentLabel={label}
//         style={modalStyle}
//       >
//        <span className='modal-close' onClick={toggleModal}>X</span>
//    <RecipeForm setMessage={setMessage} 
//    message={message} recipes={recipes} 
//    setRecipes={setRecipes} recipeID={recipeID}/>
       
//       </Modal>
//   )

// }

const toggleModal = () => {
  if (!isOpen) {
    setIsOpen(true)
  } else {
    setIsOpen(false)
  }
}




  return (
    <div>
   <header>
   <div className='navbar'>
    <span className="brand" onClick={() => setPage('weekly-calendar')}>
   Viikon ruoat
   </span>
   <ul class="nav">
  
   <li id="create-recipe" onClick={() => toggleModal()}>
   Luo resepti</li>
   <li id="all-recipes" onClick={() => setPage('recipes')}>Kaikki reseptit</li>
<li className="auth" id="login">
   Kirjaudu sisään</li>
   <li className="auth" id="logout">
   Kirjaudu ulos</li>

   </ul>
   </div>
   </header>
   
   <Recipes show={page === 'recipes'} recipes={recipes} 
   setRecipes={setRecipes}
   message={message}
   setMessage={setMessage}
   toggleModal={toggleModal}
   isOpen={isOpen}
   />
   <WeeklyCalendar show={page === 'weekly-calendar'}/> 
   

    </div>

  )
}

export default App;

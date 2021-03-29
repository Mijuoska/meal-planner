import { useState } from 'react'
import RecipeForm from './components/RecipeForm'
import WeeklyCalendar from './components/WeeklyCalendar'
import Recipes from './components/Recipes'
import Modal from 'react-modal'


const App = () => {

const [page, setPage] = useState('weekly-calendar')
const [message, setMessage] = useState('')
const [isOpen, setIsOpen] = useState(false)
console.log(isOpen)

const modalStyle = {
  content: {
    width: '50%',
    margin: 'auto',
    height: 'auto',

  }
}

const RecipeFormModal = (label, recipe, callback) => {

  return (
     <Modal
        isOpen={isOpen}
        onRequestClose={toggleModal}
        shouldCloseOnOverlayClick={false}
        contentLabel={label}
        style={modalStyle}
        onAfterClose={callback}
      >
       <span className='modal-close' onClick={toggleModal}>X</span>
   <RecipeForm setMessage={setMessage} message={message} recipe={recipe}/>
       
      </Modal>
  )

}

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
   
   <Recipes show={page === 'recipes'} toggleModal={toggleModal} RecipeFormModal={RecipeFormModal}/>
   <WeeklyCalendar show={page === 'weekly-calendar'}/> 
   {RecipeFormModal('Luo uusi resepti', null)}

    </div>

  )
}

export default App;

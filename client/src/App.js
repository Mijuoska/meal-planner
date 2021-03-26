import { useState } from 'react'
import RecipeForm from './components/RecipeForm'
import WeeklyCalendar from './components/WeeklyCalendar'
import Recipes from './components/Recipes'
import Modal from 'react-modal'


const App = () => {


const [page, setPage] = useState('weekly-calendar')
const [message, setMessage] = useState('')
const [isOpen, setIsOpen] = useState(false)


const modalStyle = {
  content: {
    width: '50%',
    margin: 'auto',
    height: 'auto',

  }
}

const toggleModal = () => {
  if (!isOpen) {
    setIsOpen(true)
  } else {
    setIsOpen(false)
  }
}

const recipeFormModal = (label, recipeID) => {
return (
  <Modal
        isOpen={isOpen}
        onRequestClose={toggleModal}
        contentLabel={label}
        style={modalStyle}
        
      >
       <span className='modal-close' onClick={toggleModal}>X</span>
   <RecipeForm setMessage={setMessage} message={message} recipeID={recipeID}/>
       
      </Modal>

)
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
   
   <Recipes show={page === 'recipes'} modal={recipeFormModal} toggleModal={toggleModal}/>
   <WeeklyCalendar show={page === 'weekly-calendar'}/>
{recipeFormModal('Uusi resepti')}
    </div>
  )
}

export default App;

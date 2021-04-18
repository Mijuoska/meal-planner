import { useState } from 'react'
import WeeklyCalendar from './components/WeeklyCalendar'
import Recipes from './components/Recipes'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'


const App = () => {

const [page, setPage] = useState('weekly-calendar')
const [message, setMessage] = useState('')
const [isOpen, setIsOpen] = useState(false)



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
   
   <ul class="nav">
 <li className="brand" onClick={() => setPage('weekly-calendar')}>
   Weekly planner
   </li>
   <li id="all-recipes" onClick={() => setPage('recipes')}>All recipes</li>
<li className="auth" id="login" onClick={() => setPage('login')}>
   Login</li>
   <li className="auth" id="logout">
   Logout</li>

   </ul>
   </div>
      <Notification message={message}/>
   </header>
   
   <Recipes show={page === 'recipes'} 
   message={message}
   setMessage={setMessage}
   toggleModal={toggleModal}
   isOpen={isOpen}
   />
   <WeeklyCalendar show={page === 'weekly-calendar'}/> 
   <LoginForm show={page === 'login'}/>
   

    </div>

  )
}

export default App;

import { useState } from 'react'
import WeeklyCalendar from './components/WeeklyCalendar'
import Recipes from './components/Recipes'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import SignUpForm from './components/SignUpForm'


const App = () => {

const [page, setPage] = useState('weekly-calendar')
const [message, setMessage] = useState('')
const [isOpen, setIsOpen] = useState(false)
const [user, setUser] = useState(null)



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
  
 { !user ? <li className="auth" id="login" onClick={() => setPage('login')}>
   Login</li> : null}
  {!user ?  <li className="auth" id="sign-up" onClick={() => setPage('sign-up')}>
   Sign up</li> :
 <li className="auth" id="logout">
   Logout </li> }

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
   <LoginForm setPage={setPage} show={page === 'login'}/>
   <SignUpForm show={page === 'sign-up'}/>
   

    </div>

  )
}

export default App;

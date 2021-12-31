import { useEffect, useState } from 'react'
import WeeklyCalendar from './pages/WeeklyCalendar'
import Recipes from './pages/Recipes'
import Notification from './components/Notification'
import LoginForm from './pages/LoginForm'
import SignUpForm from './pages/SignUpForm'
import Account from './pages/Account'
import Auth from './services/Auth'
import { CgProfile } from 'react-icons/cg'
import {
  IconContext
} from "react-icons";


const App = () => {

const [page, setPage] = useState('weekly-calendar')
const [message, setMessage] = useState('')
const [isOpen, setIsOpen] = useState(false)
const [user, setUser] = useState(null)


const displayMessage = (content, type, secondsDuration) => {
  setMessage({content, type})
  setTimeout(() => {
    setMessage('')
  }, secondsDuration * 1000);
}

useEffect(() => {
  const loggedInUser = JSON.parse(window.localStorage.getItem('loggedInUser'))
  if (loggedInUser) {
    setUser(loggedInUser)
  } else {
    setPage('login')
  }
  
}, [])


const toggleModal = () => {
  if (!isOpen) {
    setIsOpen(true)
  } else {
    setIsOpen(false)
  }
}

const logOut = () => {
  Auth.logout().then(data => {
  window.localStorage.removeItem('loggedInUser')
  setUser(null)
  setPage('login')
  displayMessage('Successfully logged out', 'success', 5)
  })
}

const AuthLinks = () => {

  if (user) {
    return (
      <ul className="nav">
      <li onClick={() => setPage('account')}>
      <IconContext.Provider value={{ size: '1.5rem'}}>
      <CgProfile style={{marginRight: '0.5rem'}}/>
          </IconContext.Provider>
      My Account</li>
       <li className="auth" id="logout" onClick={() => logOut()}>
   Logout </li>a
   
</ul>
    )
    } else {
      return (
        <ul className="nav">
<li className="auth" id="login" onClick={() => setPage('login')}>
   Login</li> 
<li className="auth" id="sign-up" onClick={() => setPage('sign-up')}>
   Sign up</li> 
   </ul>
      )
    }
}



  return (
    <div>
   <header>
   <div className='navbar'>
   
   <ul className="nav">
 { user ? <li id="weekly-calendar" className="brand" onClick={() => setPage('weekly-calendar')}>
   Weekly planner
   </li> : null}
  { user ? <li id="all-recipes" onClick={() => setPage('recipes')}>Recipes</li> : null }

   </ul>
   {AuthLinks()}
   </div>
      <Notification message={message}/>
   </header>
   
   <Recipes show={page === 'recipes'} 
   message={message}
   displayMessage={displayMessage}
   toggleModal={toggleModal}
   isOpen={isOpen}
   />
   <WeeklyCalendar show={page === 'weekly-calendar'} displayMessage={displayMessage}/> 
   <LoginForm setPage={setPage} show={page === 'login'} displayMessage={displayMessage} setUser={setUser} setPage={setPage}/>
   <SignUpForm show={page === 'sign-up'} displayMessage={displayMessage} user={user} setUser={setUser} setPage={setPage}/>
      <Account loggedInUser={user} show={page === 'account'} displayMessage={displayMessage}/>


    </div>

  )
}

export default App;

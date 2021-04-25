import { useEffect, useState } from 'react'
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
  window.localStorage.removeItem('loggedInUser')
  setUser(null)
  setPage('login')
}

const AuthLinks = () => {

  if (user) {
    return (
      <ul className="nav">
      <li>Logged in as {user.name}</li>
       <li className="auth" id="logout" onClick={() => logOut()}>
   Logout </li>
   
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
 <li className="brand" onClick={() => setPage('weekly-calendar')}>
   Weekly planner
   </li>
   <li id="all-recipes" onClick={() => setPage('recipes')}>All recipes</li>

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
   <WeeklyCalendar show={page === 'weekly-calendar'}/> 
   <LoginForm setPage={setPage} show={page === 'login'} displayMessage={displayMessage} setUser={setUser} setPage={setPage}/>
   <SignUpForm show={page === 'sign-up'} displayMessage={displayMessage} setUser={setUser} setPage={setPage}/>
   

    </div>

  )
}

export default App;

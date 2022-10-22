
import React, { useState} from 'react'
import Auth from '../services/Auth'

const SignUpForm = ( { show, setUser, setPage, displayMessage } ) => {

const [username, setUsername] = useState('')
const [firstName, setFirstName] = useState('')
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')

function createUser (e)  {
    e.preventDefault()
    const newUser = {
        username, 
        firstName,
        email,
        password
    }
    Auth.register(newUser).then(data => {
       displayMessage(`Welcome ${data.name}! You are now logged in`, 'success', 5)
      window.localStorage.setItem('loggedInUser', JSON.stringify(data))
       setUser(data)
       setUsername('')
       setPassword('')
       setFirstName('')
       setEmail('')
       setPage('weekly-calendar')
     
       }).catch(err => {
             displayMessage(`Registration failed: ${err.response.data.message}`, 'error', 5)
             console.log(err)
             return
       })   
     
}



if (show) {
    return (
    <div className="form-container">
    <div className="form-wrapper" id="login-form-wrapper">
      <form id="sign-up-form" onSubmit={createUser}>
        <div>
        <label>
          Username
          </label>
          <input id='username'
            type="text"
            value={username}
            name="username"
            onChange={({ target }) => setUsername(target.value)}
          />
          </div>
          <div>
            <label>
          First name
          </label>
          <input id='first-name'
            type="text"
            value={firstName}
            name="firstName"
            onChange={({ target }) => setFirstName(target.value)}
          />
          </div>
           <div>
            <label>
          Email
          </label>
          <input id='email'
            type="email"
            value={email}
            name="email"
            onChange={({ target }) => setEmail(target.value)}
          />
          </div>
        <div>
        <label>
          Password
          </label>
          <input id='password'
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="sign-up-button" type="submit">Create account</button>
      </form>
      </div>
    </div>
  )
    } else {
        return null
    }

}



export default SignUpForm
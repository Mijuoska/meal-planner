
import { useState } from 'react'
import Auth from '../services/Auth'

const SignUpForm = ( { show, setUser } ) => {

const [username, setUsername] = useState('')
const [firstName, setFirstName] = useState('')
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')

const createUser = (e) => {
    e.preventDefault()
    const newUser = {
        username, 
        firstName,
        email,
        password
    }
    Auth.create(newUser).then(data => {
        // set local storage
        const user = data[0]
       window.localStorage.setItem('loggedInUser', JSON.stringify(user))
       setUser(user)
      }).catch(err => {
        console.log(err)
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
          <input id='first-name'
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
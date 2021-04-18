
import { useState } from 'react'
import Users from '../services/Users'

const SignUpForm = ( { show } ) => {

const [username, setUsername] = useState('')
const [password, setPassword] = useState('')

const createUser = (e) => {
    e.preventDefault()
    const newUser = {
        username, 
        password
    }
    Users.create(newUser).then(data => {
        // set local storage
        console.log(data)
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
          username
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
          password
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
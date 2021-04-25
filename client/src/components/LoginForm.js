
import { useState } from 'react'
import Auth from '../services/Auth'

const LoginForm = ( { show, setUser, setPage } ) => {

const [username, setUsername] = useState('')
const [password, setPassword] = useState('')

const handleLogin = (e) => {
    e.preventDefault()
    Auth.login({username, password})
    .then(data => {
      window.localStorage.setItem('loggedInUser', JSON.stringify(data))
      setUser(data)
      setUsername('')
      setPassword('')
      setPage('weekly-calendar')
    }).catch(err => {
      console.log(err)
    })

}

if (show) {
    return (
    <div className="form-container">
    <div className="form-wrapper" id="login-form-wrapper">
      <form id="login-form" onSubmit={handleLogin}>
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
        <button id="login-button" type="submit">login</button>
      </form>
      </div>
    </div>
  )
    } else {
        return null
    }

}



export default LoginForm
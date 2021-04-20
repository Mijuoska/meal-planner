
import { useState } from 'react'

const LoginForm = ( { show } ) => {

const [username, setUsername] = useState('')
const [password, setPassword] = useState('')

const handleLogin = (e) => {
    e.preventDefault()

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
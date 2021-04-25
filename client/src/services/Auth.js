import axios from 'axios'

const baseUrl = 'http://localhost:3000/api/auth'

const register = async (newUser) => {
    const req = axios.post(`${baseUrl}/register`, newUser)
    return req.then(response => response.data)
}

const login = async (user) => {
    const req = axios.post(`${baseUrl}/login`, user)
    return req.then(response => response.data)
}

export default { register, login }
import axios from 'axios'


const baseUrl = '/api/auth'


const register = async (newUser) => {
    const req = axios.post(`${baseUrl}/register`, newUser)
    return req.then(response => response.data)
}

const login = async (user) => {
    const req = axios.post(`${baseUrl}/login`, user)
    return req.then(response => response.data)
}

const logout = async () => {
     const req = axios.post(`${baseUrl}/logout`)
     return req.then(response => response.data)
}

const resetPassword = async (body) => {
const req = axios.put(`${baseUrl}/reset_password`, body);
return req.then(response => response.data)
}

const methods = {
    register,
    login,
    logout,
    resetPassword
}

export default methods
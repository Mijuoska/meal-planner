import axios from 'axios'

const baseUrl = 'http://localhost:3002/users'

const getAll = async () => {
    const req = axios.get(`${baseUrl}`)
    return req.then(response => response.data)
}

export default { getAll }

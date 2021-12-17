import axios from 'axios'
import helpers from '../helpers/helpers'

const baseUrl = 'http://localhost:3000/api/users'

const config = helpers.createAuthHeader()


const getAll = async () => {
    const req = axios.get(`${baseUrl}`)
    return req.then(response => response.data)
}

const get = async (ID) => {
    const req = axios.get(`${baseUrl}/${ID}`)
    return req.then(response => response.data)
}

const create = async (user) => {
    const req = axios.post(`${baseUrl}`, user)
    return req.then(response => response.data)
}

const update = async (ID, user) => {
    const req = axios.put(`${baseUrl}/${ID}`, user)
    return req.then(response => response.data)
}

export default { getAll, get, create, update }

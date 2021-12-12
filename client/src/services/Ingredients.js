import axios from 'axios'
import helpers from '../helpers/helpers'

const baseUrl = 'http://localhost:3000/api/ingredients'

const config = helpers.createAuthHeader()

const getAll = async () => {
    const req = axios.get(`${baseUrl}`, config);
    return req.then(response => response.data)
}

const get = async (ID) => {
    const req = axios.get(`${baseUrl}/${ID}`, config);
    return req.then(response => response.data)
}

const create = async (newIngredient) => {
    const req = axios.post(`${baseUrl}`, newIngredient, config)
    return req.then(response => response.data)
}



export default {
    getAll,
    get,
    create,
}
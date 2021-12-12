import axios from 'axios'
import helpers from '../helpers/helpers'


const baseUrl = 'http://localhost:3000/api/recipes'

const config = helpers.createAuthHeader()


const getAll = async () => {
    const req = axios.get(`${baseUrl}`, config);
    return req.then(response => response.data)
}

const getIngredients = async (ID) => {
    const req = axios.get(`${baseUrl}/${ID}/ingredients`, config)
    return req.then(response => response.data)
}

const get = async (ID) => {
    const req = axios.get(`${baseUrl}/${ID}`, config);
    return req.then(response => response.data)
}

const create = async (newRecipe) => {
    const req = axios.post(`${baseUrl}`, newRecipe, config)
    return req.then(response => response.data)
}

const update = async (ID, updatedRecipe) => {
    const req = axios.put(`${baseUrl}/${ID}`, updatedRecipe, config)
    return req.then(response => response.data)
}

const remove = async (ID) => {
    const req = axios.delete(`${baseUrl}/${ID}`, config)
    return req.then(response => response.data)
}



export default { getAll, getIngredients, get, create, update, remove }
import axios from 'axios'


const baseUrl = '/api/recipes'



const getAll = async () => {

    const req = axios.get(`${baseUrl}`);
    return req.then(response => response.data)
}

const getIngredients = async (ID) => {
    const req = axios.get(`${baseUrl}/${ID}/ingredients`)
    return req.then(response => response.data)
}

const get = async (ID) => {
    const req = axios.get(`${baseUrl}/${ID}`);
    return req.then(response => response.data)
}

const create = async (newRecipe) => {
    const req = axios.post(`${baseUrl}`, newRecipe)
    return req.then(response => response.data)
}

const update = async (ID, updatedRecipe) => {
    const req = axios.put(`${baseUrl}/${ID}`, updatedRecipe)
    return req.then(response => response.data)
}

const remove = async (ID) => {
    const req = axios.delete(`${baseUrl}/${ID}`)
    return req.then(response => response.data)
}

const methods = { getAll, getIngredients, get, create, update, remove } 


export default methods
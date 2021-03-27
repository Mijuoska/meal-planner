import axios from 'axios'

const baseUrl = 'http://localhost:3000/api/recipes'


const getAll = async () => {
    const req = axios.get(`${baseUrl}`);
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
    const req = axios.post(`${baseUrl}/${ID}`, updatedRecipe)
    return req.then(response => response.data)
}



export default { getAll, get, create, update }
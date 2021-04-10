import axios from 'axios'

const baseUrl = 'http://localhost:3000/api/ingredients'


const getAll = async () => {
    const req = axios.get(`${baseUrl}`);
    return req.then(response => response.data)
}

const get = async (ID) => {
    const req = axios.get(`${baseUrl}/${ID}`);
    return req.then(response => response.data)
}

const create = async (newIngredient) => {
    const req = axios.post(`${baseUrl}`, newIngredient)
    return req.then(response => response.data)
}



export default {
    getAll,
    get,
    create,
}
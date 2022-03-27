import axios from 'axios'

const baseUrl = '/api/meals'

axios.defaults.withCredentials = true

const getAll = async () => {
    const req = axios.get(`${baseUrl}`)
    return req.then(response => response.data)
}

const create = async (newMeal) => {
    const req = axios.post(`${baseUrl}`, newMeal)
    return req.then(response => response.data)
}

const update = async (meal, id) => {
    const req = axios.put(`${baseUrl}/${id}`, meal)
    return req.then(response => response.data)
}


const remove = async (id) => {
   const req = axios.delete(`${baseUrl}/${id}`, )
   return req.then(response => response.data)
}

const methods = {
    getAll,
    create,
    update,
    remove
}

export default methods

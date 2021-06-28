import axios from 'axios'
import helpers from '../helpers/helpers'

const baseUrl = 'http://localhost:3000/api/meals'

console.log(helpers)

const config = {
    headers: {
        authorization: helpers.extractToken()
    }
}

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


const remove = async (id, config) => {
   const req = axios.delete(`${baseUrl}/${id}`, config)
   return req.then(response => response.data)
}
export default { getAll, create, update, remove }

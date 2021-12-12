import axios from 'axios'
import helpers from '../helpers/helpers'

const baseUrl = 'http://localhost:3000/api/meals'

const config = helpers.createAuthHeader()

const getAll = async () => {
 // If user is not logged in, return an empty array without call to server

    if (!config) {
        return []
    }
    const req = axios.get(`${baseUrl}`, config)
    return req.then(response => response.data)

}

const create = async (newMeal) => {
    const req = axios.post(`${baseUrl}`, newMeal, config)
    return req.then(response => response.data)
}

const update = async (meal, id) => {
    const req = axios.put(`${baseUrl}/${id}`, meal, config)
    return req.then(response => response.data)
}


const remove = async (id) => {
    console.log(config)
   const req = axios.delete(`${baseUrl}/${id}`, config)
   return req.then(response => response.data)
}
export default { getAll, create, update, remove }

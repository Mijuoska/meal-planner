import axios from 'axios'


const baseUrl = 'http://localhost:3002/meals'

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
   const req = axios.delete(`${baseUrl}/${id}`)
   return req.then(response => response.data)
}
export default { getAll, create, update, remove }

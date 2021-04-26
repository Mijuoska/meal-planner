import axios from 'axios'

const baseUrl = 'http://localhost:3000/api/households'

const getAll = async (options) => {
    const req = axios.get(`${baseUrl}`, options);
    return req.then(response => response.data)
}

const get = async (ID) => {
    const req = axios.get(`${baseUrl}/${ID}`);
    return req.then(response => response.data)
}

const create = async (newHousehold) => {
    const req = axios.post(`${baseUrl}`, newHousehold)
    return req.then(response => response.data)
}

export default {
    getAll,
    get,
    create,
}
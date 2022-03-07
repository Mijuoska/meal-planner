import axios from 'axios'


const baseUrl = '/api/households'


const getAll = async () => {
    const req = axios.get(`${baseUrl}`);
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
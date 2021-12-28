import axios from 'axios'

const baseUrl = 'http://localhost:3000/api/units'


const getAll = async () => {
    const req = axios.get(`${baseUrl}`);
    return req.then(response => response.data)
}

const get = async (ID) => {
    const req = axios.get(`${baseUrl}/${ID}`);
    return req.then(response => response.data)
}




export default {
    getAll,
    get,
}
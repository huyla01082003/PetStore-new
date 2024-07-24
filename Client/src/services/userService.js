import axios from 'axios'

let URL = 'http://localhost:8000';

const handleLogin = (email, password) => {
    return axios.post(URL + '/api/login', { email, password });
}

const handleAdminLogin = (adminLogin, password) => {
    return axios.post(URL + '/api/adminLogin', { adminLogin, password });
}

const createNewUser = (data) => {
    return axios.post(URL + '/api/register', data);
}


const getUser = (id) => {
    return axios.post(URL + '/api/get_all_user', { id });
}



export { handleLogin, createNewUser, getUser, handleAdminLogin };
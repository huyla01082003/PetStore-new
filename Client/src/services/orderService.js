import axios from 'axios'

let URL = 'http://localhost:8000';

const getAllOrder = () => {
    return axios.get(URL + '/api/order');
}
const getOrderByID = (id) => {
    return axios.get(URL + `/api/order/${id}`);
}

const getOrderByUserID = (userId) => {
    return axios.get(URL + '/api/order-user', { userId });
}

const createOrder = (userId, total) => {
    return axios.post(URL + '/api/create-order', { userId, total });
}



export { getAllOrder, getOrderByID, createOrder, getOrderByUserID };
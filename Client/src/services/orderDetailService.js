import axios from 'axios'

let URL = 'http://localhost:8000';

const getAllOrderDetail = () => {
    return axios.get(URL + '/api/orderDetail');
}

const createOrderDetail = (orderId, productId) => {
    return axios.post(URL + '/api/create-orderDetail', { orderId, productId });
}



export { getAllOrderDetail, createOrderDetail };
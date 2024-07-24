import axios from 'axios'

let URL = 'http://localhost:8000';

const getAllCart = (userId) => {
    return axios.post(URL + '/api/cart', { userId });
}

const createCart = (userId, productId) => {
    return axios.post(URL + '/api/create-cart', { userId, productId });
}

const deleteCart = (userId, productId) => {
    return axios.delete(URL + '/api/delete-cart', {
        data: {
            userId: userId,
            productId: productId
        }
    });
}

const deleteAllCart = (userId) => {
    return axios.delete(URL + '/api/delete-all-cart', {
        data: {
            userId: userId,
        }
    });
}




export { getAllCart, createCart, deleteCart, deleteAllCart };
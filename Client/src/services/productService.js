import axios from 'axios'

let URL = 'http://localhost:8000';

const getAllProduct = () => {
    return axios.get(URL + '/api/product');
}

const getNewestProduct = () => {
    return axios.get(URL + '/api/newest-product');
}
const getProductByID = (id) => {
    return axios.get(URL + `/api/product/${id}`);
}


const createProduct = (name, category, image, price) => {
    return axios.post(URL + '/api/create-product', { name, category, image, price });
}



export { getAllProduct, getProductByID, createProduct, getNewestProduct };
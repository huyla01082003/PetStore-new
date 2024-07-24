const { Op, where } = require("sequelize");
const db = require("../models");

const getAllProduct = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let products = await db.Product.findAll();
            resolve(products);
        } catch (e) {
            reject(e);
        }
    })
}

const getNewsestProduct = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let products = await db.Product.findAll({
                order: [['createdAt', 'DESC']],
                limit: 4
            });
            resolve(products);
        } catch (e) {
            reject(e);
        }
    })
}

const getProductById = (productId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let products = await db.Product.findOne({
                where: {
                    id: productId
                }
            });
            resolve(products);
        } catch (e) {
            reject(e);
        }
    })
}

const createProduct = (name, category, image, price) => {
    return new Promise(async (resolve, reject) => {
        try {

            await db.Product.create({
                name: name,
                category: category,
                image: image,
                price: price
            });
            let product = await db.Product.findOne({
                where: {
                    name: name,
                    category: category,
                    image: image,
                    price: price
                },
            });
            resolve({
                product,
                errCode: 0,
                message: 'Create success'
            });


        } catch (e) {
            reject(e);
        }
    })
}


module.exports = {
    getAllProduct: getAllProduct,
    getProductById: getProductById,
    createProduct: createProduct,
    getNewsestProduct: getNewsestProduct
}
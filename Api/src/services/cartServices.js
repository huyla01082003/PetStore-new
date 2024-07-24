const { Op, where } = require("sequelize");
const db = require("../models");

const getAllCart = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let cartCount = await db.Cart.count({
                where: {
                    user_id: userId
                }
            });
            let carts = [];
            if (cartCount > 0) {
                carts = await db.Cart.findAll({
                    where: { user_id: userId },
                    include: { model: db.Product, attributes: ["id", "name", "image", "price"] }
                });
            }
            resolve(carts);
        } catch (e) {
            reject(e);
        }
    })
}


const createCart = (userId, productId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const test = await db.Cart.findOne({
                where: {
                    user_id: userId,
                    product_id: productId,
                }
            })
            if (!test) {
                await db.Cart.create({
                    user_id: userId,
                    product_id: productId,
                });
                let cart = await db.Cart.findOne({
                    where: {
                        user_id: userId,
                        product_id: productId,
                    },
                });
                resolve({
                    cart,
                    errCode: 0,
                    message: 'Create success'
                });
            } else {
                resolve({
                    errCode: 1,
                    message: 'Product exist in cart'
                });
            }



        } catch (e) {
            reject(e);
        }
    })
}

const deleteCart = (userId, productId) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Cart.destroy({
                where: {
                    user_id: userId,
                    product_id: productId
                },

            });
            resolve({
                errCode: 0,
                message: 'Delete cart'
            })

        } catch (e) {
            reject(e);
        }
    })
}

const deleteAllCart = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Cart.destroy({
                where: {
                    user_id: userId,
                },

            });
            resolve({
                errCode: 0,
                message: 'Delete cart'
            })

        } catch (e) {
            reject(e);
        }
    })
}


module.exports = {
    getAllCart: getAllCart,
    createCart: createCart,
    deleteCart: deleteCart,
    deleteAllCart: deleteAllCart
}
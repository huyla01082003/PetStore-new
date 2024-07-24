const { Op, where } = require("sequelize");
const db = require("../models");

const getAllOrder = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let orders = await db.Order.findAll({
                include: { model: db.User, attributes: ["id", "fullname", "email"] }
            });

            resolve(orders);
        } catch (e) {
            reject(e);
        }
    })
}

const getOrderById = (orderId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let orders = await db.Order.findOne({
                where: {
                    id: orderId
                }
            });
            resolve(orders);
        } catch (e) {
            reject(e);
        }
    })
}

const getOrderByUserId = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let orders = await db.Order.findAll({
                where: {
                    user_id: userId
                },
                include: { model: db.User, attributes: ["id", "fullname", "email"] }
            });
            resolve(orders);
        } catch (e) {
            reject(e);
        }
    })
}

const createOrder = (userId, total) => {
    return new Promise(async (resolve, reject) => {
        try {

            const newOrder = await db.Order.create({
                user_id: userId,
                total: total,
                status: false,
            });

            resolve({
                order: newOrder,
                errCode: 0,
                message: 'Create success'
            });


        } catch (e) {
            reject(e);
        }
    })
}


module.exports = {
    getAllOrder: getAllOrder,
    getOrderById: getOrderById,
    createOrder: createOrder,
    getOrderByUserId: getOrderByUserId
}
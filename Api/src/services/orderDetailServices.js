const { Op, where } = require("sequelize");
const db = require("../models");

const getAllOrderDetail = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let orderDetails = await db.OrderDetail.findAll();
            resolve(orderDetails);
        } catch (e) {
            reject(e);
        }
    })
}

const createOrderDetail = (orderId, productId) => {
    return new Promise(async (resolve, reject) => {
        try {

            const newOrderDetail = await db.OrderDetail.create({
                order_id: orderId,
                product_id: productId,
            });

            resolve({
                OrderDetail: newOrderDetail,
                errCode: 0,
                message: 'Create success'
            });


        } catch (e) {
            reject(e);
        }
    })
}


module.exports = {
    getAllOrderDetail: getAllOrderDetail,
    createOrderDetail: createOrderDetail
}
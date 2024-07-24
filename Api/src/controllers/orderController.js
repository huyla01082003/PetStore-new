const db = require("../models");
const orderServices = require("../services/orderServices");

let handleGetAllOrders = async (req, res) => {
    let orders = await orderServices.getAllOrder();
    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        orders
    })
}

let handleOrderById = async (req, res) => {
    let orderId = req.params.id;
    let order = await orderServices.getOrderById(orderId);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        order
    })
}

let handleOrderByUserId = async (req, res) => {
    let userId = req.body.id;
    let order = await orderServices.getOrderByUserId(userId);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        order
    })
}

let handleCreateOrder = async (req, res) => {
    let userId = req.body.userId;
    let total = req.body.total;
    if (!userId || !total) {
        return res.status(403).json({
            errCode: 1,
            message: "Missing info"
        })
    }
    let order = await orderServices.createOrder(userId, total);
    return res.status(200).json({
        errCode: 0,
        message: order.message,
        order: order ? order.order : {}
    })
}

module.exports = {
    handleGetAllOrders: handleGetAllOrders,
    handleOrderById: handleOrderById,
    handleCreateOrder: handleCreateOrder,
    handleOrderByUserId: handleOrderByUserId
}
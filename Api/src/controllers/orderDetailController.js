const db = require("../models");
const orderDetailServices = require("../services/orderDetailServices");

let handleGetAllOrderDetails = async (req, res) => {
    let orderDetails = await orderDetailServices.getAllOrderDetail();
    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        orderDetails
    })
}


let handleCreateOrderDetail = async (req, res) => {
    let orderId = req.body.orderId;
    let productId = req.body.productId;
    if (!orderId || !productId) {
        return res.status(403).json({
            errCode: 1,
            message: "Missing info"
        })
    }
    let orderDetail = await orderDetailServices.createOrderDetail(orderId, productId);
    return res.status(200).json({
        errCode: 0,
        message: orderDetail.message,
        orderDetail: orderDetail ? orderDetail.orderDetail : {}
    })
}

module.exports = {
    handleGetAllOrderDetails: handleGetAllOrderDetails,
    handleCreateOrderDetail: handleCreateOrderDetail
}
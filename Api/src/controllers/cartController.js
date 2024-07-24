const db = require("../models");
const cartServices = require("../services/cartServices");

let handleGetAllCarts = async (req, res) => {
    let userId = req.body.userId;
    let carts = await cartServices.getAllCart(userId);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        carts
    })
}

let handleCreateCart = async (req, res) => {
    let userId = req.body.userId;
    let productId = req.body.productId;
    if (!userId || !productId) {
        return res.status(403).json({
            errCode: 1,
            message: "Missing info"
        })
    }
    let cart = await cartServices.createCart(userId, productId);
    return res.status(200).json({
        errCode: 0,
        message: cart.message,
        cart: cart ? cart.cart : {}
    })
}

let handleDeleteCart = async (req, res) => {
    let userId = req.body.userId;
    let productId = req.body.productId;
    if (!userId || !productId) {
        return res.status(403).json({
            errCode: 1,
            message: "Thieu Id"
        })
    }
    let cart = await cartServices.deleteCart(userId, productId);
    return res.status(200).json({
        cart
    })
}

let handleDeleteAllCart = async (req, res) => {
    let userId = req.body.userId;
    if (!userId) {
        return res.status(403).json({
            errCode: 1,
            message: "Thieu Id"
        })
    }
    let cart = await cartServices.deleteAllCart(userId);
    return res.status(200).json({
        cart
    })
}


module.exports = {
    handleGetAllCarts: handleGetAllCarts,
    handleCreateCart: handleCreateCart,
    handleDeleteCart: handleDeleteCart,
    handleDeleteAllCart: handleDeleteAllCart
}
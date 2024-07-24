import express from "express";
import orderController from "../controllers/orderController";

let router = express.Router();

let orderRoute = (app) => {

    router.get('/api/order', orderController.handleGetAllOrders);
    router.get('/api/order/:id', orderController.handleOrderById);
    router.post('/api/order-user', orderController.handleOrderByUserId);
    router.post('/api/create-order', orderController.handleCreateOrder);

    return app.use("/", router);
}

module.exports = orderRoute;
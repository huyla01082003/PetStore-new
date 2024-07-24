import express from "express";
import orderDetailController from "../controllers/orderDetailController";

let router = express.Router();

let orderDetailRoute = (app) => {

    router.get('/api/orderDetail', orderDetailController.handleGetAllOrderDetails);
    router.post('/api/create-orderDetail', orderDetailController.handleCreateOrderDetail);

    return app.use("/", router);
}

module.exports = orderDetailRoute;
import express from "express";
import cartController from "../controllers/cartController";

let router = express.Router();

let cartRoute = (app) => {

    router.post('/api/cart', cartController.handleGetAllCarts);
    router.post('/api/create-cart', cartController.handleCreateCart);
    router.delete('/api/delete-cart', cartController.handleDeleteCart);
    router.delete('/api/delete-all-cart', cartController.handleDeleteAllCart);

    return app.use("/", router);
}

module.exports = cartRoute;
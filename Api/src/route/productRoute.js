import express from "express";
import productController from "../controllers/productController";

let router = express.Router();

let productRoute = (app) => {

    router.get('/api/product', productController.handleGetAllProducts);
    router.get('/api/newest-product', productController.handleGetNewestProducts);
    router.get('/api/product/:id', productController.handleProductById);
    router.post('/api/create-product', productController.handleCreateProduct);

    return app.use("/", router);
}

module.exports = productRoute;
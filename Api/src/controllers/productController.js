const db = require("../models");
const productServices = require("../services/productServices");

let handleGetAllProducts = async (req, res) => {
    let products = await productServices.getAllProduct();
    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        products
    })
}

let handleGetNewestProducts = async (req, res) => {
    let products = await productServices.getNewsestProduct();
    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        products
    })
}

let handleProductById = async (req, res) => {
    let productId = req.params.id;
    let product = await productServices.getProductById(productId);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        product
    })
}

let handleCreateProduct = async (req, res) => {
    let name = req.body.name;
    let category = req.body.category;
    let image = req.body.image;
    let price = req.body.price;
    if (!name || !category || !image || !price) {
        return res.status(403).json({
            errCode: 1,
            message: "Missing info"
        })
    }
    let product = await productServices.createProduct(name, category, image, price);
    return res.status(200).json({
        errCode: 0,
        message: product.message,
        product: product ? product.product : {}
    })
}

module.exports = {
    handleGetAllProducts: handleGetAllProducts,
    handleProductById: handleProductById,
    handleCreateProduct: handleCreateProduct,
    handleGetNewestProducts: handleGetNewestProducts
}
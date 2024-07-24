import express from "express";
import userController from "../controllers/userController";

let router = express.Router();

let userRoute = (app) => {

    router.post('/api/login', userController.handleLogin);
    router.post('/api/adminLogin', userController.handleAdminLogin);
    router.post('/api/get_all_user', userController.handleGetAllUsers);
    router.post('/api/register', userController.handleCreateNewUser);
    router.post('/api/register-admin', userController.handleCreateNewAdmin);

    return app.use("/", router);
}

module.exports = userRoute;
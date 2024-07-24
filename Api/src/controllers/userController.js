const db = require("../models");
const userServices = require("../services/userServices");


let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        return res.status(401).json({
            errCode: 1,
            message: 'Please fill information'
        })
    }

    let userData = await userServices.handleUserLogin(email, password);
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.message,
        user: userData.user ? userData.user : {}
    })
}

let handleAdminLogin = async (req, res) => {
    let adminLogin = req.body.adminLogin;
    let password = req.body.password;

    if (!adminLogin || !password) {
        return res.status(401).json({
            errCode: 1,
            message: 'Please fill information'
        })
    }

    let adminData = await userServices.handleAdminLogin(adminLogin, password);
    return res.status(200).json({
        errCode: adminData.errCode,
        message: adminData.message,
        admin: adminData.admin ? adminData.admin : {}
    })
}


let handleGetAllUsers = async (req, res) => {
    let id = req.body.id;
    if (!id) {
        return res.status(403).json({
            errCode: 1,
            errMessage: 'Missing id',
            users: []
        })
    }
    let users = await userServices.getAllUsers(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        users
    })
}




let handleCreateNewUser = async (req, res) => {
    let message = await userServices.createNewUser(req.body);
    return res.status(200).json(message);
}

let handleCreateNewAdmin = async (req, res) => {
    let message = await userServices.createNewAdmin(req.body);
    return res.status(200).json(message);
}


module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers,
    handleCreateNewUser: handleCreateNewUser,
    handleCreateNewAdmin: handleCreateNewAdmin,
    handleAdminLogin: handleAdminLogin
}
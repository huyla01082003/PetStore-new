const { Op, where } = require("sequelize");
const db = require("../models");
import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);

const handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);
            if (isExist) {
                let user = await db.User.findOne({
                    attributes: ['id', 'email', 'fullname', 'password_hash', "isAdmin"],
                    where: { email: email },
                    raw: true
                });
                if (user) {
                    let check = await bcrypt.compareSync(password, user.password_hash);

                    if (check) {
                        userData.errCode = 0;
                        userData.message = 'oke';

                        delete user.password_hash;

                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.message = "Wrong password";
                    }
                } else {
                    userData.errCode = 2;
                    userData.errCode = "User not found"
                }
            } else {
                userData.errCode = 1;
                userData.message = 'Your email is wrong';

            }
            resolve(userData)
        } catch (e) {
            reject(e);
        }
    })
}

const handleAdminLogin = (adminLogin, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(adminLogin)
            let adminData = {};
            let isExist = await checkAdmin(adminLogin);
            if (isExist) {
                let admin = await db.Admin.findOne({
                    where: { adminLogin: adminLogin },
                    raw: true
                });
                if (admin) {
                    let check = await bcrypt.compareSync(password, admin.password_hash);

                    if (check) {
                        adminData.errCode = 0;
                        adminData.message = 'oke';

                        delete admin.password_hash;

                        adminData.admin = admin;
                    } else {
                        adminData.errCode = 3;
                        adminData.message = "Wrong password";
                    }
                } else {
                    adminData.errCode = 2;
                    adminData.errCode = "Admin not found"
                }
            } else {
                adminData.errCode = 1;
                adminData.message = 'Admin account is wrong';

            }
            resolve(adminData)
        } catch (e) {
            reject(e);
        }
    })
}


const checkUserEmail = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: email }
            });
            if (user) {
                resolve(true)
            } else {
                resolve(false);
            }
        } catch (e) {
            reject(e);
        }
    })
}

const checkAdmin = (adminLogin) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.Admin.findOne({
                where: { adminLogin: adminLogin }
            });
            if (user) {
                resolve(true)
            } else {
                resolve(false);
            }
        } catch (e) {
            reject(e);
        }
    })
}


const getAllUsers = (userID) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if (userID === 'ALL') {
                users = db.User.findAll({
                    attributes: {
                        exclude: ['password_hash']
                    }
                })
            } if (userID && userID !== 'ALL') {
                users = await db.User.findOne({
                    where: { id: userID }
                })
            }
            resolve(users);
        } catch (e) {
            reject(e);
        }
    })
}


const hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    })
}

const createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let checkEmail = await checkUserEmail(data.email);
            if (checkEmail === true) {
                resolve({
                    errCode: 1,
                    errMessage: 'Email is existed'
                })

            }
            else {
                let hashPasswordFromBcrypt = await hashUserPassword(data.password);
                await db.User.create({
                    email: data.email,
                    fullname: data.fullname,
                    password_hash: hashPasswordFromBcrypt
                })
                resolve({
                    errCode: 0,
                    errMessage: 'Tạo tài khoản thành công'
                })
            }

        } catch (e) {
            reject(e);
        }
    })
}

const createNewAdmin = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let checkAdminAccount = await checkAdmin(data.adminLogin);
            if (checkAdminAccount === true) {
                resolve({
                    errCode: 1,
                    errMessage: 'Admin is existed'
                })

            }
            else {
                let hashPasswordFromBcrypt = await hashUserPassword(data.password);
                await db.Admin.create({
                    adminLogin: data.adminLogin,
                    password_hash: hashPasswordFromBcrypt
                })
                resolve({
                    errCode: 0,
                    errMessage: 'Tạo tài khoản thành công'
                })
            }

        } catch (e) {
            reject(e);
        }
    })
}


module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    createNewAdmin: createNewAdmin,
    handleAdminLogin: handleAdminLogin
}
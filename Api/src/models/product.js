'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Product.hasMany(models.Cart, { foreignKey: 'product_id' });
        }
    }
    Product.init({
        name: DataTypes.STRING,
        category: DataTypes.STRING,
        image: DataTypes.STRING,
        price: DataTypes.DOUBLE,
    }, {
        sequelize,
        modelName: 'Product',
    });
    return Product;
};
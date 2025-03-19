const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product_Tags_Product = sequelize.define('Product_Tags_Product', {
    product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    tag_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
}, {
    tableName:'product_tags_products'
});

module.exports = Product_Tags_Product;

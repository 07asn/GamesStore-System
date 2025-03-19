const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product_Image = sequelize.define('Product_Image', {
    image_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    image_url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image_type: {
        type: DataTypes.STRING,
    },
}, {
tableName:'product_images'
});

module.exports = Product_Image;

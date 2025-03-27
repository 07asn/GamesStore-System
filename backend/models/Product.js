// models/Product.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
    product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    discounted_price: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: null,
    },
    stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    delivery_type: {
        type: DataTypes.STRING,
    },
    platform: {
        type: DataTypes.STRING,
    },
    is_deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    featured: { 
        type: DataTypes.BOOLEAN,
        defaultValue: false, 
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    timestamps: false,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'products'
});

const Category = require('./Category');
const Product_Image = require('./Product_Image');



  
module.exports = Product;

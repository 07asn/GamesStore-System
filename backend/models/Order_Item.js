const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Order_Item = sequelize.define('Order_Item', {
    order_item_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    inventory_id: { 
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    price_at_purchase: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
}, {
    timestamps: false,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'order_items'
});

module.exports = Order_Item;

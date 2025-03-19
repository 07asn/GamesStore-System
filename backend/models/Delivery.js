const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Delivery = sequelize.define('Delivery', {
    delivery_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    inventory_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },
    delivery_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    delivery_method: {
        type: DataTypes.STRING,
    },
    delivery_status: {
        type: DataTypes.STRING,
        defaultValue: 'delivered',
    },
    delivery_details: {
        type: DataTypes.TEXT,
    },
}, {
    timestamps: false,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

module.exports = Delivery;

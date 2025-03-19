const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Order = sequelize.define('Order', {
    order_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    order_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    total_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    order_status: {
        type: DataTypes.STRING,
        defaultValue: 'pending',
    },
    payment_status: {
        type: DataTypes.STRING,
        defaultValue: 'pending',
    },
    delivery_status: {
        type: DataTypes.STRING,
        defaultValue: 'pending',
    },
    payment_method: {
        type: DataTypes.STRING,
    },
}, {
    timestamps: false,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

module.exports = Order;

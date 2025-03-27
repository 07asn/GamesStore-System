const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Order_Coupon = sequelize.define('Order_Coupon', {
    order_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    coupon_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
}, {
    timestamps: false,
    tableName: 'order_coupons'
});

module.exports = Order_Coupon;

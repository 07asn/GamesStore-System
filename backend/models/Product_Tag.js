const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product_Tag = sequelize.define('Product_Tag', {
    tag_id: {
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
    image_url: {
        type: DataTypes.STRING,
    },
}, {
    timestamps: false,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

module.exports = Product_Tag;

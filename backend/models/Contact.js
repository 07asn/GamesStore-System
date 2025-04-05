const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/database');

const Contact = sequelize.define('Contact', {
    contact_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    full_name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    subject: {
        type: DataTypes.STRING,
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    },
}, {
    timestamps: false,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'contacts'
});

module.exports = Contact;

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Contact = sequelize.define('Contact', {
    contact_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    subject: {
        type: DataTypes.STRING,
    },
    message: {
        type: DataTypes.TEXT,
    },
    contact_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    response_date: {
        type: DataTypes.DATE,
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'open',
    },
}, {
    timestamps: false,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'contacts'
});

module.exports = Contact;

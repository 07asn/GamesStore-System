const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Inventory = sequelize.define(
    "Inventory",
    {
        inventory_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        asset_code: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        status: {
            type: DataTypes.STRING,
            defaultValue: "available",
        },
        assigned_at: {
            type: DataTypes.DATE,
        },
    },
    {
        timestamps: false,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);

module.exports = Inventory;

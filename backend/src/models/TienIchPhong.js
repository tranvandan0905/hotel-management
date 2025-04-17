const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const TienIchPhong = sequelize.define(
    "TienIchPhong",
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        TenTienIch: { type: DataTypes.STRING, allowNull: false },
        MoTa: { type: DataTypes.TEXT, allowNull: true },
    },
    { tableName: "tienichphong", timestamps: false }
);

module.exports = TienIchPhong;

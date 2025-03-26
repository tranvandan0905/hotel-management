const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const LoaiPhong = sequelize.define(
  "LoaiPhong",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    TenLoai: { type: DataTypes.STRING, allowNull: false },
  },
  { tableName: "loaiphong", timestamps: false }
);

module.exports = LoaiPhong;

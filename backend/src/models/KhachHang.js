const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");
const KhachHang = sequelize.define(
  "KhachHang",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    HoTen: { type: DataTypes.STRING, allowNull: false },
    SDT: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    CCCD: { type: DataTypes.INTEGER, allowNull: false },
    GioiTinh: { type: DataTypes.BOOLEAN, allowNull: false },
  },
  { tableName: "khachhang", timestamps: false }
);

module.exports = KhachHang;

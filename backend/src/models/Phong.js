const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const Phong = sequelize.define(
  "Phong",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    SoPhong: { type: DataTypes.INTEGER, allowNull: false },
    Loai: { type: DataTypes.STRING, allowNull: false },
    Tang: { type: DataTypes.INTEGER, allowNull: false },
    Gia: { type: DataTypes.INTEGER, allowNull: false },
    TrangThai: { type: DataTypes.BOOLEAN, allowNull: false },
    HinhAnh: { type: DataTypes.STRING, allowNull: true },
  },
  { tableName: "phong", timestamps: false }
);

module.exports = Phong;

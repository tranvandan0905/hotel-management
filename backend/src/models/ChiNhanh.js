const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const ChiNhanh = sequelize.define(
  "ChiNhanh",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    tenChiNhanh: { type: DataTypes.STRING, allowNull: false },
    DiaChi: { type: DataTypes.STRING, allowNull: false },
  },
  { tableName: "chinhanh", timestamps: false }
);

module.exports = ChiNhanh;

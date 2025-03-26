const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const ViTri = sequelize.define(
  "ViTri",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    tenViTri: { type: DataTypes.STRING, allowNull: false },
  },
  { tableName: "vitri", timestamps: false }
);

module.exports = ViTri;

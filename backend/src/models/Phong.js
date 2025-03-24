const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const ChiNhanh = require("./Chinhanh");

const Phong = sequelize.define(
  "Phong",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    SoPhong: { type: DataTypes.INTEGER, allowNull: false },
    Loai: { type: DataTypes.STRING, allowNull: false },
    Tang: { type: DataTypes.INTEGER, allowNull: false },
    SucChua: { type: DataTypes.INTEGER, allowNull: false },
    Gia: { type: DataTypes.INTEGER, allowNull: false },
    TrangThai: { type: DataTypes.BOOLEAN, allowNull: false },
  },
  { tableName: "phong", timestamps: false }
);

Phong.belongsTo(ChiNhanh, { foreignKey: "id_chinhanh" });

module.exports = Phong;

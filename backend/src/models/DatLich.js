const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");
const KhachHang = require("./KhachHang");
const Phong = require("./Phong");

const DatLich = sequelize.define(
  "DatLich",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    NgayNhan: { type: DataTypes.DATE, allowNull: false },
    NgayTra: { type: DataTypes.DATE, allowNull: false },
    TongTien: { type: DataTypes.INTEGER, allowNull: false },
  },
  { tableName: "datlich", timestamps: false }
);

DatLich.belongsTo(KhachHang, { foreignKey: "id_khachhang" });
DatLich.belongsTo(Phong, { foreignKey: "id_phong" });

module.exports = DatLich;

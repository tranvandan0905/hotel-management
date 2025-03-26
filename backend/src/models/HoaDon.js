const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");
const KhachHang = require("./KhachHang");
const DatLich = require("./DatLich");

const HoaDon = sequelize.define(
  "HoaDon",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    HinhThucThanhToan: { type: DataTypes.STRING, allowNull: false },
    TongTien: { type: DataTypes.INTEGER, allowNull: false },
    TrangThai: { type: DataTypes.STRING, allowNull: false },
  },
  { tableName: "hoadon", timestamps: false }
);

HoaDon.belongsTo(KhachHang, { foreignKey: "id_khachhang" });
HoaDon.belongsTo(DatLich, { foreignKey: "id_lichdat" });

module.exports = HoaDon;

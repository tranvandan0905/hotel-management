const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const ChiNhanh = require("./Chinhanh");
const ViTri = require("./ViTri");

const NhanVien = sequelize.define(
  "NhanVien",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    HoTen: { type: DataTypes.STRING, allowNull: false },
    SDT: { type: DataTypes.STRING, allowNull: false },
    CCCD: { type: DataTypes.INTEGER, allowNull: false },
    GioiTinh: { type: DataTypes.BOOLEAN, allowNull: false },
    Email: { type: DataTypes.STRING, allowNull: false },
    Password: { type: DataTypes.STRING, allowNull: false },
    Luong: { type: DataTypes.INTEGER, allowNull: false },
  },
  { tableName: "nhanvien", timestamps: false }
);

NhanVien.belongsTo(ChiNhanh, { foreignKey: "id_chiNhanh" });
NhanVien.belongsTo(ViTri, { foreignKey: "id_viTri" });

module.exports = NhanVien;

const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");
const ChiNhanh = require("./ChiNhanh");
const LoaiPhong = require("./LoaiPhong");

const Phong = sequelize.define(
  "Phong",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    SoPhong: { type: DataTypes.INTEGER, allowNull: false },
    Tang: { type: DataTypes.INTEGER, allowNull: false },
    SucChua: { type: DataTypes.INTEGER, allowNull: false },
    Gia: { type: DataTypes.INTEGER, allowNull: false },
    TrangThai: { type: DataTypes.BOOLEAN, allowNull: false },
  },
  { tableName: "phong", timestamps: false }
);

// Thiết lập khóa ngoại với ChiNhanh
Phong.belongsTo(ChiNhanh, { foreignKey: "id_chinhanh" });

// Thiết lập khóa ngoại với LoaiPhong
Phong.belongsTo(LoaiPhong, { foreignKey: "id_loaiphong" });

module.exports = Phong;

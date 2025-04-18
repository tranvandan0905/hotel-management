const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const DatLich = sequelize.define(
  "DatLich",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    HoTen: { type: DataTypes.STRING, allowNull: false },
    SDT: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    GioiTinh: { type: DataTypes.BOOLEAN, allowNull: false },
    SoNguoi: { type: DataTypes.INTEGER, allowNull: false },
    NgayNhan: { type: DataTypes.DATE, allowNull: false },
    NgayTra: { type: DataTypes.DATE, allowNull: false },
    TongTien: { type: DataTypes.INTEGER, allowNull: false },
    Check: { type: DataTypes.TINYINT, allowNull: true, defaultValue: 0 }, //toi can mot loi xin loi cua backend
  },
  { tableName: "datlich", timestamps: false }
);

module.exports = DatLich;

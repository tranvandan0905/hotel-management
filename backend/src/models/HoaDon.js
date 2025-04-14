const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const HoaDon = sequelize.define(
  "HoaDon",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    HinhThucThanhToan: { type: DataTypes.STRING, allowNull: false },
    TongTien: { type: DataTypes.INTEGER, allowNull: false },
    TrangThai: { type: DataTypes.STRING, allowNull: false },
    TrangThai_Delete: {  // Trường trạng thái (hidden or visible)
      type: DataTypes.BOOLEAN,
      defaultValue: true,  // Mặc định là true, tức là hóa đơn sẽ hiển thị
    },
  },
  { tableName: "hoadon", timestamps: false }
);

module.exports = HoaDon;

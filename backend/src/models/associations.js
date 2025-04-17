const DatLich = require("./DatLich");
const HoaDon = require("./HoaDon");
const Phong = require("./Phong");
const NhanVien = require("./NhanVien");
const ChiNhanh = require("./ChiNhanh");
const TienIchPhong = require("./TienIchPhong");
const sequelize = require("../database/database");

// Định nghĩa quan hệ giữa DatLich và HoaDon (1-N)
HoaDon.belongsTo(DatLich, { foreignKey: "id_lichdat" });
DatLich.hasMany(HoaDon, { foreignKey: "id_lichdat" });

// Định nghĩa quan hệ giữa DatLich và Phong (1-N)
DatLich.belongsTo(Phong, { foreignKey: "id_phong" });
Phong.hasMany(DatLich, { foreignKey: "id_phong" });

// Quan hệ giữa NhanVien và ChiNhanh (1-N)
NhanVien.belongsTo(ChiNhanh, { foreignKey: "id_chinhanh"  });
ChiNhanh.hasMany(NhanVien, { foreignKey: "id_chinhanh" });

// Phòng thuộc về một chi nhánh (1-N)
Phong.belongsTo(ChiNhanh, { foreignKey: "id_chinhanh" });
ChiNhanh.hasMany(Phong, { foreignKey: "id_chinhanh" });



// Định nghĩa bảng trung gian giữa Phòng và Tiện Ích Phòng (N-N)

const Phong_TienIch = sequelize.define(
    "Phong_TienIch",
    {
        id_phong: {
            type: sequelize.Sequelize.INTEGER,
            primaryKey: true,
            references: { model: Phong, key: "id" },
            onDelete: "CASCADE",
        },
        id_tienich: {
            type: sequelize.Sequelize.INTEGER,
            primaryKey: true,
            references: { model: TienIchPhong, key: "id" },
            onDelete: "CASCADE",
        },
    },
    { tableName: "Phong_TienIch", timestamps: false }
);

// Quan hệ nhiều - nhiều giữa Phòng và Tiện Ích Phòng
Phong.belongsToMany(TienIchPhong, { through: Phong_TienIch, foreignKey: "id_phong" });
TienIchPhong.belongsToMany(Phong, { through: Phong_TienIch, foreignKey: "id_tienich" });

module.exports = { DatLich, HoaDon, Phong, NhanVien, ChiNhanh, Phong_TienIch, TienIchPhong };

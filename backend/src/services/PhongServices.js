const { saveImage, deleteImage, updateImage } = require('../services/ImgesServices');
const Phong = require("../models/Phong");
const TienIchPhong = require("../models/TienIchPhong");
const { Phong_TienIch } = require('../models/associations');

const getAllPhong = async () => {
    try {
        return await Phong.findAll({
            include: [
                { model: TienIchPhong, through: Phong_TienIch, foreignKey: "id_phong" },
            ],
        });
    } catch (error) {
        throw new Error("Error fetching rooms");
    }
};

const getPhongById = async (id) => {
    try {
        const phong = await Phong.findOne({
            where: { id },
            include: [
                { model: TienIchPhong, through: Phong_TienIch, foreignKey: "id_phong" },
            ],
        });

        if (!phong) {
            throw new Error("Room not found");
        }

        return phong;
    } catch (error) {
        throw new Error("Error fetching room");
    }
};

// Tạo phòng mới (bao gồm ảnh)
const createPhong = async (SoPhong, Loai, Tang, Gia, TrangThai, id_chinhanh, file) => {
    try {
        let imageName = null;
        if (file) {
            imageName = await saveImage(file);
        }
        const newPhong = await Phong.create({
            SoPhong,
            Loai,
            Tang,
            Gia,
            TrangThai,
            HinhAnh: imageName,
            id_chinhanh,
        });

        return newPhong;
    } catch (error) {
        throw new Error("Error creating room: " + error.message);
    }
};
const updatePhong = async (id, SoPhong, Loai, Tang, Gia, TrangThai, HinhAnh, id_chinhanh) => {
    try {
        const phong = await Phong.findOne({ where: { id } });
        if (!phong) {
            throw new Error("Phòng không tồn tại");
        }
        phong.SoPhong = SoPhong || phong.SoPhong;
        phong.Loai = Loai || phong.Loai;
        phong.Tang = Tang || phong.Tang;
        phong.Gia = Gia || phong.Gia;
        phong.TrangThai = TrangThai || phong.TrangThai;
        phong.HinhAnh = HinhAnh || phong.HinhAnh; // Cập nhật ảnh mới hoặc giữ ảnh cũ
        phong.id_chinhanh = id_chinhanh || phong.id_chinhanh;

        await phong.save();
        return phong;
    } catch (error) {
        throw new Error("Lỗi khi cập nhật phòng: " + error.message);
    }
};
const deletePhong = async (id) => {
    try {
        const phong = await Phong.findOne({ where: { id } });
        if (!phong) {
            throw new Error("Room not found");
        }
        if (phong.HinhAnh) {
            await deleteImage(phong.HinhAnh);
        }

        await phong.destroy();
        return { message: "Room deleted successfully" };
    } catch (error) {
        throw new Error("Error deleting room");
    }
};

module.exports = {
    getAllPhong,
    getPhongById,
    createPhong,
    updatePhong,
    deletePhong,
};

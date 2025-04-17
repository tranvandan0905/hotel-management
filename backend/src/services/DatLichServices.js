const DatLich = require("../models/DatLich");
const  Phong  = require("../models/Phong");

const getAllDatLich = async () => {
    try {
        return await DatLich.findAll({
            include: [Phong],
        });
    } catch (error) {
        throw new Error("Error fetching bookings");
    }
};

const getDatLichById = async (id) => {
    try {
        const datlich = await DatLich.findOne({
            where: { id },
            include: [Phong],
        });
        if (!datlich) {
            throw new Error("Booking not found");
        }
        return datlich;
    } catch (error) {
        throw new Error("Error fetching booking");
    }
};

const createDatLich = async (HoTen, SDT, email, GioiTinh, NgayNhan, SoNguoi, NgayTra, TongTien, id_phong) => {
    try {
        const phong = await Phong.findOne({ where: { id: id_phong } });
        if (!phong) {
            throw new Error("Phong not found");
        }

        const newDatLich = await DatLich.create({
            HoTen,
            SDT,
            email,
            GioiTinh,
            NgayNhan,
            NgayTra,
            SoNguoi,
            TongTien,
            id_phong,
        });

        return newDatLich;
    } catch (error) {
        throw new Error("Error creating booking");
    }
};

const updateDatLich = async (id, HoTen, SDT, email, GioiTinh, NgayNhan, SoNguoi, NgayTra, TongTien, id_phong) => {
    try {
        const datlich = await DatLich.findOne({ where: { id } });
        if (!datlich) {
            throw new Error("Booking not found");
        }

        const phong = await Phong.findOne({ where: { id: id_phong } });
        if (!phong) {
            throw new Error("Phong not found");
        }

        datlich.HoTen = HoTen || datlich.HoTen;
        datlich.SDT = SDT || datlich.SDT;
        datlich.email = email || datlich.email;
        datlich.GioiTinh = GioiTinh || datlich.GioiTinh;
        datlich.NgayNhan = NgayNhan || datlich.NgayNhan;
        datlich.NgayTra = NgayTra || datlich.NgayTra;
        datlich.TongTien = TongTien || datlich.TongTien;
        datlich.id_phong = id_phong || datlich.id_phong;
        datlich.TongTien = SoNguoi || datlich.SoNguoi;
        await datlich.save();
        return datlich;
    } catch (error) {
        throw new Error("Error updating booking");
    }
};

const deleteDatLich = async (id) => {
    try {
        const datlich = await DatLich.findOne({ where: { id } });
        if (!datlich) {
            throw new Error("Booking not found");
        }

        await datlich.destroy();
        return { message: "Booking deleted successfully" };
    } catch (error) {
        throw new Error("Error deleting booking");
    }
};

module.exports = {
    getAllDatLich,
    getDatLichById,
    createDatLich,
    updateDatLich,
    deleteDatLich,
};

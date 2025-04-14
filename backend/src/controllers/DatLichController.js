const {
    getAllDatLich,
    getDatLichById,
    createDatLich,
    updateDatLich,
    deleteDatLich,
} = require("../services/DatLichServices");
const getAllDatLichController = async (req, res) => {
    try {
        const datlichs = await getAllDatLich();
        res.status(200).json(datlichs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getDatLichByIdController = async (req, res) => {
    const { id } = req.params;
    try {
        const datlich = await getDatLichById(id);
        res.status(200).json(datlich);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const createDatLichController = async (req, res) => {
    const { HoTen, SDT, email, GioiTinh, NgayNhan, NgayTra,SoNguoi, TongTien, id_phong } = req.body;
    console.log(req.body)
    try {
        const newDatLich = await createDatLich(HoTen, SDT, email, GioiTinh, NgayNhan,SoNguoi, NgayTra, TongTien, id_phong);
        res.status(201).json(newDatLich);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const updateDatLichController = async (req, res) => {
    const { id } = req.params;
    const { HoTen, SDT, email, GioiTinh, NgayNhan, NgayTra,SoNguoi, TongTien, id_phong } = req.body;
    try {
        const updatedDatLich = await updateDatLich(id, HoTen, SDT, email, GioiTinh,SoNguoi, NgayNhan, NgayTra, TongTien, id_phong);
        res.status(200).json(updatedDatLich);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const deleteDatLichController = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await deleteDatLich(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllDatLichController,
    getDatLichByIdController,
    createDatLichController,
    updateDatLichController,
    deleteDatLichController,
};

const {
    getAllChiNhanh,
    getChiNhanhById,
    createChiNhanh,
    updateChiNhanh,
    deleteChiNhanh,
} = require("../services/ChiNhanhServices");
const getAllChiNhanhController = async (req, res) => {
    try {
        const chiNhanhList = await getAllChiNhanh();
        res.status(200).json(chiNhanhList);
    } catch (error) {
        console.error("Error getting ChiNhanh:", error);
        res.status(500).json({ message: error.message });
    }
};
const getChiNhanhByIdController = async (req, res) => {
    const { id } = req.params;
    try {
        const chiNhanh = await getChiNhanhById(id);
        res.status(200).json(chiNhanh);
    } catch (error) {
        console.error("Error getting ChiNhanh:", error);
        res.status(500).json({ message: error.message });
    }
};
const createChiNhanhController = async (req, res) => {
   
    const tenChiNhanh=req.body.tenChiNhanh;
    const DiaChi=req.body.DiaChi;
    console.log("ok",req.body)
    try {
        const newChiNhanh = await createChiNhanh(tenChiNhanh, DiaChi);
        res.status(201).json(newChiNhanh);
    } catch (error) {
        console.error("Error creating ChiNhanh:", error);
        res.status(500).json({ message: error.message });
    }
};
const updateChiNhanhController = async (req, res) => {
    const { id } = req.params;
    const { tenChiNhanh, DiaChi } = req.body;
    try {
        const updatedChiNhanh = await updateChiNhanh(id, tenChiNhanh, DiaChi);
        res.status(200).json(updatedChiNhanh);
    } catch (error) {
        console.error("Error updating ChiNhanh:", error);
        res.status(500).json({ message: error.message });
    }
};
const deleteChiNhanhController = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await deleteChiNhanh(id);
        res.status(200).json(result);
    } catch (error) {
        console.error("Error deleting ChiNhanh:", error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllChiNhanhController,
    getChiNhanhByIdController,
    createChiNhanhController,
    updateChiNhanhController,
    deleteChiNhanhController,
};

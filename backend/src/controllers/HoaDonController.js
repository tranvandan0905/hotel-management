const {
    getAllHoaDon,
    getHoaDonById,
    createHoaDon,
    updateHoaDon,
    deleteHoaDon,
  } = require("../services/HoaDonServices");
  const getAllHoaDonController = async (req, res) => {
    try {
      const hoaDonList = await getAllHoaDon();
      res.status(200).json(hoaDonList);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  const getHoaDonByIdController = async (req, res) => {
    const { id } = req.params;
    try {
      const hoaDon = await getHoaDonById(id);
      res.status(200).json(hoaDon);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  const createHoaDonController = async (req, res) => {
    const { HinhThucThanhToan, TongTien, TrangThai, id_lichdat } = req.body;
    try {
      const newHoaDon = await createHoaDon(HinhThucThanhToan, TongTien, TrangThai, id_lichdat);
      res.status(201).json(newHoaDon);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  const updateHoaDonController = async (req, res) => {
    const { id } = req.params;
    const { HinhThucThanhToan, TongTien, TrangThai } = req.body;
    try {
      const updatedHoaDon = await updateHoaDon(id, HinhThucThanhToan, TongTien, TrangThai);
      res.status(200).json(updatedHoaDon);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  const deleteHoaDonController = async (req, res) => {
    const { id } = req.params;
    try {
      const result = await deleteHoaDon(id);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  module.exports = {
    getAllHoaDonController,
    getHoaDonByIdController,
    createHoaDonController,
    updateHoaDonController,
    deleteHoaDonController,
  };
  
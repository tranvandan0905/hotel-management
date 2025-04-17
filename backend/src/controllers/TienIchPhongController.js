const {
    getTienIchPhong,
    getTienIchPhongById,
    createTienIchPhong,
    updateTienIchPhong,
    deleteTienIchPhong,
  } = require("../services/TienIchPhongServices");
  const getTienIchPhongController = async (req, res) => {
    try {
      const tienIchPhong = await getTienIchPhong();
      res.status(200).json(tienIchPhong);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  const getTienIchPhongByIdController = async (req, res) => {
    const { id } = req.params;
    try {
      const tienIchPhong = await getTienIchPhongById(id);
      res.status(200).json(tienIchPhong);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  const createTienIchPhongController = async (req, res) => {
    const { TenTienIch, MoTa } = req.body;
    try {
      const newTienIchPhong = await createTienIchPhong(TenTienIch, MoTa);
      res.status(201).json(newTienIchPhong);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  const updateTienIchPhongController = async (req, res) => {
    const { id } = req.params;
    const { TenTienIch, MoTa } = req.body;
    try {
      const updatedTienIchPhong = await updateTienIchPhong(id, TenTienIch, MoTa);
      res.status(200).json(updatedTienIchPhong);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  const deleteTienIchPhongController = async (req, res) => {
    const { id } = req.params;
    try {
      const result = await deleteTienIchPhong(id);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  module.exports = {
    getTienIchPhongController,
    getTienIchPhongByIdController,
    createTienIchPhongController,
    updateTienIchPhongController,
    deleteTienIchPhongController,
  };
  
const { Phong_TienIch, } = require('../models/associations');
const  TienIchPhong= require('../models/TienIchPhong')
const  Phong = require('../models/Phong')
const addTienIchToPhong = async (req, res) => {
  const { id_phong, id_tienichs } = req.body;

  if (!Array.isArray(id_tienichs) || id_tienichs.length === 0) {
    return res.status(400).json({ message: "Cần phải cung cấp ít nhất một tiện ích" });
  }

  try {
    const phong = await Phong.findByPk(id_phong);
    if (!phong) {
      return res.status(404).json({ message: "Phòng không tồn tại" });
    }
    const tienIchs = await TienIchPhong.findAll({
      where: {
        id: id_tienichs
      }
    });

    if (tienIchs.length !== id_tienichs.length) {
      return res.status(404).json({ message: "Một hoặc nhiều tiện ích không tồn tại" });
    }
    const phongTienIchEntries = id_tienichs.map(id_tienich => ({
      id_phong,
      id_tienich
    }));

    await Phong_TienIch.bulkCreate(phongTienIchEntries); 

    return res.status(201).json({ message: "Tiện ích đã được thêm vào phòng thành công" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi khi thêm tiện ích vào phòng", error: error.message });
  }
};
const removeTienIchFromPhong = async (req, res) => {
    const { id_phong, id_tienichs } = req.body;
  
    if (!Array.isArray(id_tienichs) || id_tienichs.length === 0) {
      return res.status(400).json({ message: "Cần phải cung cấp ít nhất một tiện ích để xóa" });
    }
  
    try {
      const phong = await Phong.findByPk(id_phong);
      if (!phong) {
        return res.status(404).json({ message: "Phòng không tồn tại" });
      }
  
      // Xóa các tiện ích trong bảng trung gian
      await Phong_TienIch.destroy({
        where: {
          id_phong,
          id_tienich: id_tienichs
        }
      });
  
      return res.status(200).json({ message: "Tiện ích đã được xóa khỏi phòng thành công" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Lỗi khi xóa tiện ích khỏi phòng", error: error.message });
    }
  };
  
  module.exports = { addTienIchToPhong, removeTienIchFromPhong };
  



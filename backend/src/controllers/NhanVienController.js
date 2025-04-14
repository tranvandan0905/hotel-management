const {
  getAllNhanvien,
  createNhanvien,
  updateNhanvien,
  deleteNhanvien,
} = require("../services/NhanVienServices");
const getAllNhanvienController = async (req, res) => {
  try {
    const nhanViens = await getAllNhanvien();
    res.json(nhanViens);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const createNhanvienController = async (req, res) => {
  const { HoTen, SDT, CCCD, GioiTinh, Email, Password, Luong,Role, id_chinhanh } = req.body;
  const existingNhanVien = await NhanVien.findOne({ where: { Email } });
  if (existingNhanVien) {
    throw new Error("Email đã tồn tại");
  }
  try {
    const newNhanVien = await createNhanvien(HoTen, SDT, CCCD, GioiTinh, Email,Role, Password, Luong, id_chinhanh);
    res.status(201).json({ message: "Thêm nhân viên thành công", nhanVien: newNhanVien });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const updateNhanvienController = async (req, res) => {
  const { id } = req.params;
  const { HoTen, SDT, CCCD, GioiTinh, Email, Password, Luong,Role, id_chiNhanh } = req.body;
  try {
    const updatedNhanVien = await updateNhanvien(id, HoTen, SDT, CCCD, GioiTinh, Email, Password,Role, Luong, id_chiNhanh);
    res.json({ message: "Cập nhật nhân viên thành công", nhanVien: updatedNhanVien });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const deleteNhanvienController = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await deleteNhanvien(id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllNhanvienController,
  createNhanvienController,
  updateNhanvienController,
  deleteNhanvienController,
};

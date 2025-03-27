const LoaiPhong = require("../models/LoaiPhong");
const getLoaiPhong = async (req, res) => {
  try {
    const loaiPhong = await LoaiPhong.findAll();
    res.json(loaiPhong);
  } catch (err) {
    console.error(err);
    res.status(500).send("Lỗi khi lấy danh sách loại phòng");
  }
};
const createLoaiPhong = async (req, res) => {
  const { TenLoai } = req.body;

  if (!TenLoai) {
    return res
      .status(400)
      .json({ error: "Tên loại phòng không được để trống" });
  }

  try {
    const newLoaiPhong = await LoaiPhong.create({ TenLoai });
    res.status(201).json(newLoaiPhong);
  } catch (err) {
    console.error(err);
    res.status(500).send("Lỗi khi tạo loại phòng");
  }
};
const updateLoaiPhong = async (req, res) => {
  const { id } = req.params;
  const { TenLoai } = req.body;

  try {
    const loaiPhong = await LoaiPhong.findByPk(id);
    if (!loaiPhong) {
      return res.status(404).json({ error: "Loại phòng không tồn tại" });
    }

    loaiPhong.TenLoai = TenLoai || loaiPhong.TenLoai;
    await loaiPhong.save();

    res.json(loaiPhong);
  } catch (err) {
    console.error(err);
    res.status(500).send("Lỗi khi cập nhật loại phòng");
  }
};
const deleteLoaiPhong = async (req, res) => {
  const { id } = req.params;

  try {
    const loaiPhong = await LoaiPhong.findByPk(id);
    if (!loaiPhong) {
      return res.status(404).json({ error: "Loại phòng không tồn tại" });
    }

    await loaiPhong.destroy();
    res.json({ message: "Xóa loại phòng thành công" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Lỗi khi xóa loại phòng");
  }
};
module.exports = {
  getLoaiPhong,
  createLoaiPhong,
  updateLoaiPhong,
  deleteLoaiPhong,
};

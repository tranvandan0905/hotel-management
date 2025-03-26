const NhanVien = require("../models/NhanVien");
const getNhanVien = async (req, res) => {
  try {
    const Nhanviens = await NhanVien.findAll();
    res.json(Nhanviens);
  } catch (err) {
    console.error(err);
    res.status(500).send("Lỗi truy vấn cơ sở dữ liệu");
  }
};

const createNhanVien = async (req, res) => {
  const {
    HoTen,
    SDT,
    CCCD,
    GioiTinh,
    Email,
    Password,
    Luong,
    id_chiNhanh,
    id_viTri,
  } = req.body;

  if (
    !HoTen ||
    !SDT ||
    !CCCD ||
    !Email ||
    !Password ||
    !Luong ||
    !id_chiNhanh ||
    !id_viTri
  ) {
    return res.status(400).json({ error: "Vui lòng nhập đầy đủ thông tin" });
  }

  try {
    const newNhanVien = await NhanVien.create({
      HoTen,
      SDT,
      CCCD,
      GioiTinh,
      Email,
      Password,
      Luong,
      id_chiNhanh,
      id_viTri,
    });
    res.status(201).json(newNhanVien);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Lỗi khi tạo nhân viên" });
  }
};

const updateNhanVien = async (req, res) => {
  const { id } = req.params;
  const {
    HoTen,
    SDT,
    CCCD,
    GioiTinh,
    Email,
    Password,
    Luong,
    id_chiNhanh,
    id_viTri,
  } = req.body;

  try {
    const nhanVien = await NhanVien.findByPk(id); // Đổi tên biến khác để tránh lỗi
    if (!nhanVien) {
      return res.status(404).json({ error: "Nhân viên không tồn tại" });
    }

    nhanVien.HoTen = HoTen || nhanVien.HoTen;
    nhanVien.SDT = SDT || nhanVien.SDT;
    nhanVien.CCCD = CCCD || nhanVien.CCCD;
    nhanVien.GioiTinh = GioiTinh !== undefined ? GioiTinh : nhanVien.GioiTinh;
    nhanVien.Email = Email || nhanVien.Email;
    nhanVien.Password = Password || nhanVien.Password;
    nhanVien.Luong = Luong || nhanVien.Luong;
    nhanVien.id_chiNhanh = id_chiNhanh || nhanVien.id_chiNhanh;
    nhanVien.id_viTri = id_viTri || nhanVien.id_viTri;

    await nhanVien.save();
    res.json(nhanVien);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Lỗi khi cập nhật nhân viên" });
  }
};

const deleteNhanVien = async (req, res) => {
  const { id } = req.params;

  try {
    const nhanVien = await NhanVien.findByPk(id);
    if (!nhanVien) {
      return res.status(404).json({ error: "Nhân viên không tồn tại" });
    }

    await nhanVien.destroy();
    res.json({ message: "Xóa nhân viên thành công" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Lỗi khi xóa nhân viên" });
  }
};

module.exports = {
  getNhanVien,
  createNhanVien,
  updateNhanVien,
  deleteNhanVien,
};

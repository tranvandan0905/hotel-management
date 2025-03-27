const Phong = require("../models/Phong");
const getPhong = async (req, res) => {
  try {
    const phong = await Phong.findAll();
    res.json(phong);
  } catch (err) {
    console.error(err);
    res.status(500).send("Lỗi khi lấy danh sách phòng");
  }
};
const createPhong = async (req, res) => {
  const { SoPhong, Tang, SucChua, Gia, TrangThai, id_chinhanh, id_loaiphong } =
    req.body;

  if (
    !SoPhong ||
    !Tang ||
    !SucChua ||
    !Gia ||
    TrangThai === undefined ||
    !id_chinhanh ||
    !id_loaiphong
  ) {
    return res.status(400).json({ error: "Vui lòng nhập đầy đủ thông tin" });
  }

  try {
    const newPhong = await Phong.create({
      SoPhong,
      Tang,
      SucChua,
      Gia,
      TrangThai,
      id_chinhanh,
      id_loaiphong,
    });
    res.status(201).json(newPhong);
  } catch (err) {
    console.error(err);
    res.status(500).send("Lỗi khi tạo phòng");
  }
};
const updatePhong = async (req, res) => {
  const { id } = req.params;
  const { SoPhong, Tang, SucChua, Gia, TrangThai, id_chinhanh, id_loaiphong } =
    req.body;

  try {
    const phong = await Phong.findByPk(id);
    if (!phong) {
      return res.status(404).json({ error: "Phòng không tồn tại" });
    }

    phong.SoPhong = SoPhong || phong.SoPhong;
    phong.Tang = Tang || phong.Tang;
    phong.SucChua = SucChua || phong.SucChua;
    phong.Gia = Gia || phong.Gia;
    phong.TrangThai = TrangThai !== undefined ? TrangThai : phong.TrangThai;
    phong.id_chinhanh = id_chinhanh || phong.id_chinhanh;
    phong.id_loaiphong = id_loaiphong || phong.id_loaiphong;

    await phong.save();
    res.json(phong);
  } catch (err) {
    console.error(err);
    res.status(500).send("Lỗi khi cập nhật phòng");
  }
};
const deletePhong = async (req, res) => {
  const { id } = req.params;

  try {
    const phong = await Phong.findByPk(id);
    if (!phong) {
      return res.status(404).json({ error: "Phòng không tồn tại" });
    }

    await phong.destroy();
    res.json({ message: "Xóa phòng thành công" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Lỗi khi xóa phòng");
  }
};

module.exports = {
  getPhong,
  createPhong,
  updatePhong,
  deletePhong,
};

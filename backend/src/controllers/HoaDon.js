const HoaDon = require("../models/HoaDon");

const gethoadonAPI = async (req, res) => {
  try {
    const Nhanviens = await HoaDon.findAll();
    res.json(Nhanviens);
  } catch (err) {
    console.error(err);
    res.status(500).send("Lỗi truy vấn cơ sở dữ liệu");
  }
};
// const postCreatenhanvienAPI = async (req, res) => {};
// const putUpdatenhanvienAPI = async (req, res) => {};
// const DeletenhanvienAPI = async (req, res) => {};
module.exports = {
  gethoadonAPI,
  //   postCreatenhanvienAPI,
  //   putUpdatenhanvienAPI,
  //   DeletenhanvienAPI,
};

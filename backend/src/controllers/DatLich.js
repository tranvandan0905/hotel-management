const DatLich = require("../models/DatLich");

const getdatlichAPI = async (req, res) => {
  try {
    const khachhangs = await DatLich.findAll();
    res.json(khachhangs);
  } catch (err) {
    console.error(err);
    res.status(500).send("Lỗi truy vấn cơ sở dữ liệu");
  }
};
module.exports = {
  getdatlichAPI,
};

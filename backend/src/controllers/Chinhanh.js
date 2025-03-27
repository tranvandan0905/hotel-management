const ChiNhanh = require("../models/ChiNhanh");
const getBranch = async (req, res) => {
  try {
    const chiNhanh = await ChiNhanh.findAll();
    res.json(chiNhanh);
  } catch (err) {
    console.error(err);
    res.status(500).send("Lỗi truy vấn cơ sở dữ liệu");
  }
};

const createBranch = async (req, res) => {
  const { tenChiNhanh, DiaChi } = req.body;

  if (!tenChiNhanh || !DiaChi) {
    return res.status(400).json({ error: "Vui lòng nhập đầy đủ thông tin" });
  }

  try {
    const newBranch = await ChiNhanh.create({ tenChiNhanh, DiaChi });
    res.status(201).json(newBranch);
  } catch (err) {
    console.error(err);
    res.status(500).send("Lỗi khi tạo chi nhánh");
  }
};

const updateBranch = async (req, res) => {
  const { id } = req.params;
  const { tenChiNhanh, diaChi } = req.body;

  try {
    const branch = await ChiNhanh.findByPk(id);
    if (!branch) {
      return res.status(404).json({ error: "Chi nhánh không tồn tại" });
    }

    branch.tenChiNhanh = tenChiNhanh || branch.tenChiNhanh;
    branch.diaChi = diaChi || branch.diaChi;

    await branch.save();
    res.json(branch);
  } catch (err) {
    console.error(err);
    res.status(500).send("Lỗi cập nhật chi nhánh");
  }
};

const deleteBranch = async (req, res) => {
  const { id } = req.params;

  try {
    const branch = await ChiNhanh.findByPk(id);
    if (!branch) {
      return res.status(404).json({ error: "Chi nhánh không tồn tại" });
    }

    await branch.destroy();
    res.json({ message: "Đã xóa chi nhánh thành công" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Lỗi xóa chi nhánh");
  }
};
module.exports = {
  getBranch,
  createBranch,
  updateBranch,
  deleteBranch,
};

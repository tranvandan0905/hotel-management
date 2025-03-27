const ViTri = require("../models/ViTri");
const getViTri = async (req, res) => {
  try {
    const viTri = await ViTri.findAll();
    res.json(viTri);
  } catch (err) {
    console.error(err);
    res.status(500).send("Lỗi truy vấn cơ sở dữ liệu");
  }
};
const createViTri = async (req, res) => {
  const { tenViTri } = req.body;

  if (!tenViTri) {
    return res.status(400).json({ error: "Tên vị trí không được để trống" });
  }

  try {
    const newViTri = await ViTri.create({ tenViTri });
    res.status(201).json(newViTri);
  } catch (err) {
    console.error(err);
    res.status(500).send("Lỗi khi tạo vị trí");
  }
};

const updateViTri = async (req, res) => {
  const { id } = req.params;
  const { tenViTri } = req.body;

  try {
    const viTri = await ViTri.findByPk(id);
    if (!viTri) {
      return res.status(404).json({ error: "Vị trí không tồn tại" });
    }

    viTri.tenViTri = tenViTri || viTri.tenViTri;
    await viTri.save();

    res.json(viTri);
  } catch (err) {
    console.error(err);
    res.status(500).send("Lỗi khi cập nhật vị trí");
  }
};

const deleteViTri = async (req, res) => {
  const { id } = req.params;

  try {
    const viTri = await ViTri.findByPk(id);
    if (!viTri) {
      return res.status(404).json({ error: "Vị trí không tồn tại" });
    }

    await viTri.destroy();
    res.json({ message: "Xóa vị trí thành công" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Lỗi khi xóa vị trí");
  }
};

module.exports = { getViTri, createViTri, updateViTri, deleteViTri };

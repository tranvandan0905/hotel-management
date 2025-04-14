const {
  getAllPhong,
  getPhongById,
  createPhong,
  updatePhong,
  deletePhong,
} = require("../services/PhongServices");
const {deleteImage,saveImage}=require("../services/ImgesServices")
const getAllPhongController = async (req, res) => {
  try {
    const phongs = await getAllPhong();
    res.status(200).json(phongs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getPhongByIdController = async (req, res) => {
  const { id } = req.params;
  try {
    const phong = await getPhongById(id);
    res.status(200).json(phong);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const createPhongController = async (req, res) => {
  const { SoPhong, Loai, Tang, Gia, TrangThai, id_chinhanh } = req.body;
  const file = req.files ? req.files.HinhAnh : null; 
  try {
    const newPhong = await createPhong(SoPhong, Loai, Tang,  Gia, TrangThai, id_chinhanh, file);
    res.status(201).json(newPhong);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePhongController = async (req, res) => {
  const { id } = req.params;
  const { SoPhong, Loai, Tang, Gia, TrangThai, id_chinhanh } = req.body;
  const file = req.files ? req.files.HinhAnh : null;

  try {
    const existingPhong = await getPhongById(id);
    if (!existingPhong) {
      return res.status(404).json({ message: "Phòng không tồn tại" });
    }

    let imageName = existingPhong.HinhAnh; 
    if (file) {
      await deleteImage(existingPhong.HinhAnh); 
      imageName = await saveImage(file); 
    }
    const updatedPhong = await updatePhong(
      id,
      SoPhong,
      Loai?.toString(),
      Tang,
      Gia,
      TrangThai,
      imageName, 
      id_chinhanh
    );

    res.status(200).json(updatedPhong);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const deletePhongController = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await deletePhong(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllPhongController,
  getPhongByIdController,
  createPhongController,
  updatePhongController,
  deletePhongController,
};

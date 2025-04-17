const TienIchPhong = require("../models/TienIchPhong");

const getTienIchPhong = async () => {
  try {
    return await TienIchPhong.findAll();
  } catch (error) {
    throw new Error("Error fetching room utilities");
  }
};

const getTienIchPhongById = async (id) => {
  try {
    const tienIchPhong = await TienIchPhong.findOne({ where: { id } });
    if (!tienIchPhong) {
      throw new Error("Utility not found");
    }
    return tienIchPhong;
  } catch (error) {
    throw new Error("Error fetching utility");
  }
};

const createTienIchPhong = async (TenTienIch, MoTa) => {
  try {
    const tienIchPhong = await TienIchPhong.create({ TenTienIch, MoTa });
    return tienIchPhong;
  } catch (error) {
    throw new Error("Error creating utility");
  }
};

const updateTienIchPhong = async (id, TenTienIch, MoTa) => {
  try {
    const tienIchPhong = await TienIchPhong.findOne({ where: { id } });
    if (!tienIchPhong) {
      throw new Error("Utility not found");
    }

    tienIchPhong.TenTienIch = TenTienIch || tienIchPhong.TenTienIch;
    tienIchPhong.MoTa = MoTa || tienIchPhong.MoTa;
    await tienIchPhong.save();

    return tienIchPhong;
  } catch (error) {
    throw new Error("Error updating utility");
  }
};

const deleteTienIchPhong = async (id) => {
  try {
    const tienIchPhong = await TienIchPhong.findOne({ where: { id } });
    if (!tienIchPhong) {
      throw new Error("Utility not found");
    }

    await tienIchPhong.destroy();
    return { message: "Utility deleted successfully" };
  } catch (error) {
    throw new Error("Error deleting utility");
  }
};

module.exports = {
  getTienIchPhong,
  getTienIchPhongById,
  createTienIchPhong,
  updateTienIchPhong,
  deleteTienIchPhong,
};

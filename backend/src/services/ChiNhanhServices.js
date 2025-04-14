
const  ChiNhanh = require("../models/ChiNhanh");
const getAllChiNhanh = async () => {
  try {
    return await ChiNhanh.findAll();
  } catch (error) {
    throw new Error("Error fetching chi nhánh");
  }
};

const getChiNhanhById = async (id) => {
  try {
    const chiNhanh = await ChiNhanh.findByPk(id);
    if (!chiNhanh) {
      throw new Error("Chi nhánh không tồn tại");
    }
    return chiNhanh;
  } catch (error) {
    throw new Error("Error fetching chi nhánh");
  }
};

const createChiNhanh = async (tenChiNhanh, DiaChi) => {
  try {
    return await ChiNhanh.create({ tenChiNhanh, DiaChi });
  } catch (error) {
    throw new Error("Error creating chi nhánh");
  }
};

const updateChiNhanh = async (id, tenChiNhanh, DiaChi) => {
  try {
    const chiNhanh = await ChiNhanh.findByPk(id);
    if (!chiNhanh) {
      throw new Error("Chi nhánh không tồn tại");
    }
    chiNhanh.tenChiNhanh = tenChiNhanh;
    chiNhanh.DiaChi = DiaChi;
    await chiNhanh.save();
    return chiNhanh;
  } catch (error) {
    throw new Error("Error updating chi nhánh");
  }
};

const deleteChiNhanh = async (id) => {
  try {
    const chiNhanh = await ChiNhanh.findByPk(id);
    if (!chiNhanh) {
      throw new Error("Chi nhánh không tồn tại");
    }
    await chiNhanh.destroy();
    return { message: "Chi nhánh đã bị xóa" };
  } catch (error) {
    throw new Error("Error deleting chi nhánh");
  }
};

module.exports = {
  getAllChiNhanh,
  getChiNhanhById,
  createChiNhanh,
  updateChiNhanh,
  deleteChiNhanh,
};

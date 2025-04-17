const  HoaDon  = require("../models/HoaDon");

const getAllHoaDon = async () => {
    try {
        return await HoaDon.findAll({
            where: {
                TrangThai_Delete: true,  
            }
          });
    } catch (error) {
        throw new Error("Error fetching hóa đơn");
    }
};

const getHoaDonById = async (id) => {
    try {
        const hoaDon = await HoaDon.findOne({
            where: {
              id: id,
              TrangThai_Delete: true // Chỉ tìm hóa đơn có TrangThai = true
            }
          });
        if (!hoaDon) {
            throw new Error("Hóa đơn không tồn tại");
        }
        return hoaDon;
    } catch (error) {
        throw new Error("Error fetching hóa đơn");
    }
};

const createHoaDon = async (HinhThucThanhToan, TongTien, TrangThai, id_lichdat) => {
    try {
        const newHoaDon = await HoaDon.create({
            HinhThucThanhToan,
            TongTien,
            TrangThai,
            id_lichdat
        });
        return newHoaDon;
    } catch (error) {
        throw new Error("Error creating hóa đơn");
    }
};

const updateHoaDon = async (id, HinhThucThanhToan, TongTien, TrangThai) => {
    try {
        const hoaDon = await HoaDon.findOne({
            where: {
              id: id,
              TrangThai_Delete: true 
            }
          });
        if (!hoaDon) {
            throw new Error("Hóa đơn không tồn tại");
        }

        hoaDon.HinhThucThanhToan = HinhThucThanhToan || hoaDon.HinhThucThanhToan;
        hoaDon.TongTien = TongTien || hoaDon.TongTien;
        hoaDon.TrangThai = TrangThai || hoaDon.TrangThai;

        await hoaDon.save();
        return hoaDon;
    } catch (error) {
        throw new Error("Error updating hóa đơn");
    }
};

const deleteHoaDon = async (id) => {
    try {
      const hoaDon = await HoaDon.findOne({
        where: {
          id: id,
          TrangThai_Delete: true 
        }
      });
      if (!hoaDon) {
        throw new Error("Hóa đơn không tồn tại");
      }
      hoaDon.TrangThai_Delete = false; 
      await hoaDon.save();
  
      return { message: "Hóa đơn đã được ẩn thành công." };
    } catch (error) {
      throw new Error("Lỗi khi ẩn hóa đơn: " + error.message);
    }
  };
  

module.exports = {
    getAllHoaDon,
    getHoaDonById,
    createHoaDon,
    updateHoaDon,
    deleteHoaDon,
};

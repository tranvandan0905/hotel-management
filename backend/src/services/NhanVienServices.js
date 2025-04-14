const NhanVien = require("../models/NhanVien");
const bcrypt = require("bcrypt");

const getAllNhanvien = async () => {
  try {
    return await NhanVien.findAll();
  } catch (error) {
    throw new Error("Lỗi lấy danh sách nhân viên");
  }
};

const createNhanvien = async (HoTen, SDT, CCCD, GioiTinh, Email, Password, Luong, id_chinhanh, id_vitri) => {
  try {
    console.log("Dữ liệu nhận được:", { HoTen, SDT, CCCD, GioiTinh, Email, Password, Luong, id_chinhanh, id_vitri });

    if (!id_chinhanh || !id_vitri) {
      throw new Error("Lỗi: id_chiNhanh và id_viTri không được để trống!");
    }

    const hashedPassword = await bcrypt.hash(Password, 10);
    console.log("Hashed Password:", hashedPassword);

    const newNhanVien = await NhanVien.create({
      HoTen,
      SDT,
      CCCD,
      GioiTinh,
      Email,
      Password: hashedPassword,
      Luong,
      id_chinhanh,
      id_vitri,
    });

    console.log("Nhân viên tạo thành công:", newNhanVien);
    return newNhanVien;
  } catch (error) {
    console.error("Lỗi khi thêm nhân viên:", error);
    throw new Error("Lỗi thêm nhân viên");
  }
};


const updateNhanvien = async (id, HoTen, SDT, CCCD, GioiTinh, Email, Password, Luong, id_chiNhanh, id_viTri) => {
  try {
    const nhanVien = await NhanVien.findByPk(id);
    if (!nhanVien) {
      throw new Error("Nhân viên không tồn tại");
    }

    let hashedPassword = nhanVien.Password;
    if (Password) {
      hashedPassword = await bcrypt.hash(Password, 10);
    }

    await nhanVien.update({
      HoTen,
      SDT,
      CCCD,
      GioiTinh,
      Email,
      Password: hashedPassword,
      Luong,
      id_chiNhanh,
      id_viTri,
    });

    return nhanVien;
  } catch (error) {
    throw new Error("Lỗi cập nhật nhân viên");
  }
};

const deleteNhanvien = async (id) => {
  try {
    const nhanVien = await NhanVien.findByPk(id);
    if (!nhanVien) {
      throw new Error("Nhân viên không tồn tại");
    }

    await nhanVien.destroy();
    return { message: "Xóa nhân viên thành công" };
  } catch (error) {
    throw new Error("Lỗi xóa nhân viên");
  }
};

module.exports = {
  getAllNhanvien,
  createNhanvien,
  updateNhanvien,
  deleteNhanvien,
};

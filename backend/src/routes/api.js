const express = require("express");
const routerAPI = express.Router();
const { authenticate, withRole } = require("../middleware/authMiddleware");

const {
  getAllDatLichController, getDatLichByIdController,
  createDatLichController, updateDatLichController, deleteDatLichController
} = require('../controllers/DatLichController');

const {
  getAllNhanvienController, createNhanvienController,
  updateNhanvienController, deleteNhanvienController
} = require('../controllers/NhanVienController');

const {
  getAllPhongController, getPhongByIdController,
  createPhongController, updatePhongController, deletePhongController
} = require('../controllers/PhongController');

const {
  getTienIchPhongController, getTienIchPhongByIdController,
  createTienIchPhongController, updateTienIchPhongController, deleteTienIchPhongController
} = require('../controllers/TienIchPhongController');

const {
  getAllChiNhanhController, getChiNhanhByIdController,
  createChiNhanhController, updateChiNhanhController, deleteChiNhanhController
} = require('../controllers/ChiNhanhController');

const {
  getAllHoaDonController, getHoaDonByIdController,
  createHoaDonController, updateHoaDonController, deleteHoaDonController
} = require("../controllers/HoaDonController");

const {
  addTienIchToPhong, removeTienIchFromPhong
} = require("../controllers/TienIch_PhongController");

const { register, login } = require("../controllers/AuthController");


// (khách hàng không cần đăng nhập)
routerAPI.get("/phongs", getAllPhongController);
routerAPI.get("/phongs/:id", getPhongByIdController);
routerAPI.get("/tienichphong", getTienIchPhongController);
routerAPI.get("/chinhanh", getAllChiNhanhController);
routerAPI.get("/datlich", getAllDatLichController);
routerAPI.post("/login", login);
routerAPI.post("/datlich", createDatLichController);

// Authenticated Routes (nhân viên hoặc admin)
routerAPI.use(authenticate);

// Nhanvien hoặc Admin
routerAPI.get("/nhanvien", withRole("NhanVien", "Admin"), getAllNhanvienController);

routerAPI.post("/phongs", withRole("NhanVien", "Admin"), createPhongController);
routerAPI.put("/phongs/:id", withRole("NhanVien", "Admin"), updatePhongController);
routerAPI.delete("/phongs/:id", withRole("NhanVien", "Admin"), deletePhongController);

routerAPI.get("/datlich/:id", withRole("NhanVien", "Admin"), getDatLichByIdController);
routerAPI.put("/datlich/:id", withRole("NhanVien", "Admin"), updateDatLichController);
routerAPI.delete("/datlich/:id", withRole("NhanVien", "Admin"), deleteDatLichController);

routerAPI.get("/tienichphong/:id", withRole("NhanVien", "Admin"), getTienIchPhongByIdController);
routerAPI.post("/tienichphong", withRole("NhanVien", "Admin"), createTienIchPhongController);
routerAPI.put("/tienichphong/:id", withRole("NhanVien", "Admin"), updateTienIchPhongController);
routerAPI.delete("/tienichphong/:id", withRole("NhanVien", "Admin"), deleteTienIchPhongController);

routerAPI.get("/chinhanh/:id", withRole("NhanVien", "Admin"), getChiNhanhByIdController);
routerAPI.post("/chinhanh", withRole("NhanVien", "Admin"), createChiNhanhController);
routerAPI.put("/chinhanh/:id", withRole("NhanVien", "Admin"), updateChiNhanhController);
routerAPI.delete("/chinhanh/:id", withRole("NhanVien", "Admin"), deleteChiNhanhController);

routerAPI.get("/hoadon", withRole("NhanVien", "Admin"), getAllHoaDonController);
routerAPI.get("/hoadon/:id", withRole("NhanVien", "Admin"), getHoaDonByIdController);
routerAPI.post("/hoadon", withRole("NhanVien", "Admin"), createHoaDonController);
routerAPI.put("/hoadon/:id", withRole("NhanVien", "Admin"), updateHoaDonController);
routerAPI.delete("/hoadon/:id", withRole("NhanVien", "Admin"), deleteHoaDonController);

routerAPI.post("/TienIchToPhong", withRole("NhanVien", "Admin"), addTienIchToPhong);
routerAPI.delete("/TienIchToPhong", withRole("NhanVien", "Admin"), removeTienIchFromPhong);

// Chỉ Admin được đăng ký nhân viên
routerAPI.post("/register", withRole("Admin"), register);
routerAPI.post("/nhanvien", withRole("Admin"), createNhanvienController);
routerAPI.put("/nhanvien/:id", withRole("Admin"), updateNhanvienController);
routerAPI.delete("/nhanvien/:id", withRole("Admin"), deleteNhanvienController);


module.exports = routerAPI;

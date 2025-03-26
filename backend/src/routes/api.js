const express = require("express");
const routerAPI = express.Router();
//Users
const {
  getUserAPI,
  postCreateuserAPI,
  putUpdateuserAPI,
  DeleteuserAPI,
} = require("../controllers/KhachHang");

routerAPI.get("/user", getUserAPI);
routerAPI.post("/user", postCreateuserAPI);
routerAPI.put("/user/:id", putUpdateuserAPI);
routerAPI.delete("/user/:id", DeleteuserAPI);

//Chi nhanh
const {
  getBranch,
  createBranch,
  updateBranch,
  deleteBranch,
} = require("../controllers/Chinhanh");
routerAPI.get("/branch", getBranch);
routerAPI.post("/branch", createBranch);
routerAPI.put("/branch/:id", updateBranch);
routerAPI.delete("/branch/:id", deleteBranch);
// Nhan vien
const {
  getNhanVien,
  createNhanVien,
  updateNhanVien,
  deleteNhanVien,
} = require("../controllers/NhanVien");
routerAPI.get("/nhanvien", getNhanVien);
routerAPI.post("/nhanvien", createNhanVien);
routerAPI.put("/nhanvien/:id", updateNhanVien);
routerAPI.delete("/nhanvien/:id", deleteNhanVien);
// Dat lich
const { getdatlichAPI } = require("../controllers/DatLich");
// Hoa don
const { gethoadonAPI } = require("../controllers/HoaDon");
module.exports = routerAPI;

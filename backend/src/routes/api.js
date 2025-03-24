const express = require("express");
const routerAPI = express.Router();
const { getUserAPI, postCreateuserAPI, putUpdateuserAPI, DeleteuserAPI } = require('../controllers/KhachHang'); // Đảm bảo đúng đường dẫn tới controller

// Các route API
routerAPI.get('/user', getUserAPI);
routerAPI.post('/user', postCreateuserAPI);
routerAPI.put('/user/:id', putUpdateuserAPI);
routerAPI.delete('/user/:id', DeleteuserAPI);

module.exports = routerAPI;

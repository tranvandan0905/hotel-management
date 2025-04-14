require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./database/database.js");
const APIbrouter = require('./routes/api.js')
const fileUpload = require('express-fileupload');
require("./models/associations");
const path = require('path')

const app = express();
const PORT = process.env.PORT || 5000;
app.use(fileUpload());
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '..', '..','public')));

app.use('/v1/api', APIbrouter);
sequelize
    .sync()
    .then(() => {
        console.log(" Kết nối Database thành công!");
        app.listen(PORT, () => {
            console.log(` Server đang chạy tại http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error(" Lỗi kết nối Database:", err);
    });

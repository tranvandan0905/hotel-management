const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Kết nối MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "hotel",
});

db.connect((err) => {
  if (err) {
    console.error(" Kết nối MySQL thất bại:", err);
  } else {
    console.log(" Kết nối MySQL thành công!");
  }
});

// Khởi động server
app.listen(8080, () => {
  console.log("Server chạy tại http://localhost:8080");
});

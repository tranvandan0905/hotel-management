const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("hotel", "root", "yourpassword", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

sequelize
  .authenticate()
  .then(() => console.log(" Kết nối MySQL thành công!"))
  .catch((err) => console.error(" Lỗi kết nối:", err));

module.exports = sequelize;

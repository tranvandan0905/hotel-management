
const KhachHang = require('../models/KhachHang');
const getUserAPI = async (req, res) => {
    try {
        const khachhangs = await KhachHang.findAll();
        res.json(khachhangs);
    } catch (err) {
        console.error(err);
        res.status(500).send('Lỗi truy vấn cơ sở dữ liệu');
    }
};

const postCreateuserAPI = async (req, res) => {
    try {
    const { HoTen, SDT, email, password, CCCD, GioiTinh } = req.body;
        const existingUser = await KhachHang.findOne({ where: { email } });

        if (existingUser) {
            return res.status(400).send('Email đã tồn tại');
        }
        const newKhachHang = await KhachHang.create({ HoTen, SDT, email, password, CCCD, GioiTinh });

        res.status(200).json(newKhachHang);
    } catch (err) {
        console.error(err);
        res.status(500).send('Lỗi tạo khách hàng');
    }
};

const putUpdateuserAPI = async (req, res) => {
    const { id } = req.params;
    const { HoTen, SDT, email, password, CCCD, GioiTinh } = req.body;

    try {
        const khachhang = await KhachHang.findByPk(id);
        if (!khachhang) {
            return res.status(404).send('Khách hàng không tìm thấy');
        }
        khachhang.HoTen = HoTen || khachhang.HoTen;
        khachhang.SDT = SDT || khachhang.SDT;
        khachhang.email = email || khachhang.email;
        khachhang.password = password || khachhang.password;
        khachhang.CCCD = CCCD || khachhang.CCCD;
        khachhang.GioiTinh = GioiTinh !== undefined ? GioiTinh : khachhang.GioiTinh;

        await khachhang.save();

        res.json(khachhang);
    } catch (err) {
        console.error(err);
        res.status(500).send('Lỗi cập nhật khách hàng');
    }
};

const DeleteuserAPI = async (req, res) => {
    const { id } = req.params;

    try {
        const khachhang = await KhachHang.findByPk(id);
        if (!khachhang) {
            return res.status(404).send('Khách hàng không tìm thấy');
        }

        await khachhang.destroy();
        res.send('Khách hàng đã được xóa');
    } catch (err) {
        console.error(err);
        res.status(500).send('Lỗi xóa khách hàng');
    }
};

module.exports = {
    getUserAPI,
    postCreateuserAPI,
    putUpdateuserAPI,
    DeleteuserAPI,
};

const { registerNhanVien, loginNhanVien } = require("../services/AuthServices");

const register = async (req, res) => {
    try {
        const user = await registerNhanVien(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { token, user } = await loginNhanVien(req.body);
        res.status(200).json({ token, user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    register,
    login
};

const { saveImage, deleteImage, updateImage } = require('../services/ImgesServices');

// Lưu ảnh mới
const saveImageController = async (req, res) => {
    try {
        console.log(req.files);
        const file = req.files.image; // Giả sử ảnh được gửi từ client dưới tên 'image'
        const imageName = await saveImage(file);
        res.status(200).json({ message: 'Ảnh đã được lưu', imageName });
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

// Xóa ảnh
const deleteImageController = async (req, res) => {
    try {
        const { imageName } = req.params; 
        await deleteImage(imageName);
        res.status(200).json({ message: 'Ảnh đã được xóa' });
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

// Cập nhật ảnh
const updateImageController = async (req, res) => {
    try {

        const oldImageName = req.params.imageName; // Tên ảnh cũ từ params
        const newFile = req.files.image; // Ảnh mới từ client
        const updatedImage = await updateImage(oldImageName, newFile);
        res.status(200).json({ message: 'Ảnh đã được cập nhật', updatedImage });
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

module.exports = {
    saveImageController,
    deleteImageController,
    updateImageController,
};

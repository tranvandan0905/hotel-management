const fs = require('fs-extra');
const path = require('path');
const imageDir = path.join(__dirname, '..','..', 'public', 'uploads');

console.log("Image directory:", imageDir); 
fs.ensureDirSync(imageDir);
const saveImage = (file) => {
    return new Promise((resolve, reject) => {
        const fileName = `${Date.now()}_${file.name}`;
        const filePath = path.join(imageDir, fileName);

        // Di chuyển tệp vào thư mục lưu trữ
        file.mv(filePath, (err) => {
            if (err) {
                reject('Lỗi khi lưu ảnh');
            } else {
                resolve(fileName); 
            }
        });
        
    });
};
const deleteImage = (imageName) => {
    return new Promise((resolve, reject) => {
        const filePath = path.join(imageDir, imageName);

        fs.remove(filePath, (err) => {
            if (err) {
                reject('Lỗi khi xóa ảnh');
            } else {
                resolve('Ảnh đã được xóa thành công');
            }
        });
    });
};
const updateImage = (oldImageName, newFile) => {
    return new Promise(async (resolve, reject) => {
        try {
         
            await deleteImage(oldImageName);

   
            const newImageName = await saveImage(newFile);

            resolve(newImageName); 
        } catch (err) {
            reject('Lỗi khi cập nhật ảnh');
        }
    });
};

module.exports = {
    saveImage,
    deleteImage,
    updateImage,
};

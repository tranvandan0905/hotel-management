import {
  Card,
  CardBody,
  Typography,
  Input,
  Select,
  Option,
  Button,
  Switch,
  Checkbox,
  Textarea
} from "@material-tailwind/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlusIcon, XMarkIcon, CheckIcon } from "@heroicons/react/24/solid";

const AddRoom = () => {
  const [formData, setFormData] = useState({
    roomNumber: '',
    price: '',
    bedType: 'Giường đôi',
    floor: '',
    description: '',
    status: false,
    cleaningStatus: 'Đã vệ sinh',
    amenities: [],
    images: []
  });

  const [imagePreviews, setImagePreviews] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Dữ liệu phòng mới:', formData);
    alert('Thêm phòng thành công!');
    navigate('/rooms');
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map(file => URL.createObjectURL(file));
    
    setFormData({
      ...formData,
      images: [...formData.images, ...files]
    });
    setImagePreviews([...imagePreviews, ...previews]);
  };

  const removeImage = (index) => {
    const newImages = [...formData.images];
    const newPreviews = [...imagePreviews];
    
    newImages.splice(index, 1);
    newPreviews.splice(index, 1);
    
    setFormData({...formData, images: newImages});
    setImagePreviews(newPreviews);
  };

  const handleAmenityChange = (amenity) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  return (
    <div className="p-4">
      <Typography variant="h2" className="mb-6">Thêm Phòng Mới</Typography>
      
      <Card className="mb-6">
        <CardBody>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Cột 1 - Thông tin và ảnh */}
              <div>
                {/* Phần upload ảnh */}
                <div className="mb-8">
                  <Typography variant="h5" className="mb-4">Ảnh Phòng</Typography>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <input
                      type="file"
                      multiple
                      onChange={handleImageUpload}
                      accept="image/*"
                      className="hidden"
                      id="room-images"
                    />
                    <label
                      htmlFor="room-images"
                      className="cursor-pointer flex flex-col items-center justify-center p-6"
                    >
                      <PlusIcon className="h-10 w-10 text-blue-500 mb-2" />
                      <Typography variant="paragraph" className="text-blue-500">
                        Thêm ảnh (tối đa 10 ảnh)
                      </Typography>
                      <Typography variant="small" className="text-gray-500">
                        PNG, JPG, JPEG (tối đa 5MB mỗi ảnh)
                      </Typography>
                    </label>
                  </div>

                  {/* Preview ảnh */}
                  {imagePreviews.length > 0 && (
                    <div className="mt-4">
                      <Typography variant="small" className="mb-2">
                        Đã chọn {imagePreviews.length} ảnh
                      </Typography>
                      <div className="grid grid-cols-3 gap-2">
                        {imagePreviews.map((preview, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={preview}
                              alt={`Preview ${index}`}
                              className="h-24 w-full object-cover rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <XMarkIcon className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Thông tin cơ bản */}
                <div>
                  <Typography variant="h5" className="mb-4">Thông Tin Cơ Bản</Typography>
                  
                  <div className="space-y-4">
                    <Input
                      label="Số phòng *"
                      value={formData.roomNumber}
                      onChange={(e) => setFormData({...formData, roomNumber: e.target.value})}
                      required
                    />
                    
                    <Input
                      label="Giá (/đêm) *"
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      required
                      icon={<span>VND</span>}
                    />
                    
                    <Select
                      label="Loại giường *"
                      value={formData.bedType}
                      onChange={(value) => setFormData({...formData, bedType: value})}
                    >
                      <Option value="Giường đôi">Giường đôi</Option>
                      <Option value="Giường đơn">Giường đơn</Option>
                      <Option value="King Size">King Size</Option>
                      <Option value="Queen Size">Queen Size</Option>
                    </Select>
                    
                    <Input
                      label="Tầng *"
                      type="number"
                      value={formData.floor}
                      onChange={(e) => setFormData({...formData, floor: e.target.value})}
                      required
                    />
                    
                    <Textarea
                      label="Mô tả phòng"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      rows={4}
                    />
                  </div>
                </div>
              </div>

              {/* Cột 2 - Tiện ích và trạng thái */}
              <div>
                {/* Tiện ích */}
                <div className="mb-8">
                  <Typography variant="h5" className="mb-4">Tiện Ích Phòng</Typography>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      'Máy lạnh', 'Vòi sen', 'TV LED', 'Wifi', 
                      'Tủ lạnh', 'Bồn tắm', 'Bàn làm việc', 'Hộp an toàn',
                      'Bình nước nóng', 'Máy sấy tóc', 'Bàn ủi', 'Minibar'
                    ].map(item => (
                      <Checkbox
                        key={item}
                        label={item}
                        checked={formData.amenities.includes(item)}
                        onChange={() => handleAmenityChange(item)}
                        containerProps={{ className: "rounded-lg p-2 hover:bg-blue-gray-50" }}
                      />
                    ))}
                  </div>
                </div>

                {/* Trạng thái */}
                <div>
                  <Typography variant="h5" className="mb-4">Trạng Thái</Typography>
                  
                  <div className="space-y-4">
                    <Switch
                      checked={formData.status}
                      onChange={() => setFormData({...formData, status: !formData.status})}
                      label={
                        <div className="flex items-center gap-2">
                          {formData.status ? (
                            <>
                              <CheckIcon className="h-4 w-4 text-green-500" />
                              <span>Đã đặt phòng</span>
                            </>
                          ) : (
                            <>
                              <XMarkIcon className="h-4 w-4 text-red-500" />
                              <span>Còn trống</span>
                            </>
                          )}
                        </div>
                      }
                    />
                    
                    <Switch
                      checked={formData.cleaningStatus === 'Đã vệ sinh'}
                      onChange={() => setFormData({
                        ...formData, 
                        cleaningStatus: formData.cleaningStatus === 'Đã vệ sinh' 
                          ? 'Chưa vệ sinh' 
                          : 'Đã vệ sinh'
                      })}
                      label={
                        <div className="flex items-center gap-2">
                          {formData.cleaningStatus === 'Đã vệ sinh' ? (
                            <>
                              <CheckIcon className="h-4 w-4 text-green-500" />
                              <span>Đã vệ sinh</span>
                            </>
                          ) : (
                            <>
                              <XMarkIcon className="h-4 w-4 text-red-500" />
                              <span>Chưa vệ sinh</span>
                            </>
                          )}
                        </div>
                      }
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Nút submit */}
            <div className="mt-8 flex justify-end gap-4">
              <Button
                variant="outlined"
                onClick={() => navigate('/rooms')}
                className="mr-2"
              >
                Hủy
              </Button>
              <Button 
                type="submit" 
                color="green"
                className="flex items-center gap-2"
              >
                <PlusIcon className="h-5 w-5" />
                Thêm Phòng
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default AddRoom;
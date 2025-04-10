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
    sophong: '',
    loai: 'Phòng Standard',
    tang: '',
    succhua: 2,
    gia: '',
    trangthai: false,
    cleaningStatus: 'Đã vệ sinh',
    id_chinhanh: 1,
    anh: [],
    mota: ''
  });

  const [imagePreviews, setImagePreviews] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Dữ liệu phòng mới:', formData);
    alert('Thêm phòng thành công!');
    navigate('/dashboard/rooms');
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map(file => URL.createObjectURL(file));
    
    setFormData({
      ...formData,
      anh: [...formData.anh, ...files]
    });
    setImagePreviews([...imagePreviews, ...previews]);
  };

  const removeImage = (index) => {
    const newImages = [...formData.anh];
    const newPreviews = [...imagePreviews];
    
    newImages.splice(index, 1);
    newPreviews.splice(index, 1);
    
    setFormData({...formData, anh: newImages});
    setImagePreviews(newPreviews);
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
                  
                  <div className="space-y-12">
                    <Input
                      label="Số phòng *"
                      type="number"
                      value={formData.sophong}
                      onChange={(e) => setFormData({...formData, sophong: e.target.value})}
                      required
                    />
                    
                    <Select
                      label="Loại phòng *"
                      value={formData.loai}
                      onChange={(value) => setFormData({...formData, loai: value})}
                    >
                      <Option value="Phòng Standard">Phòng Standard</Option>
                      <Option value="Phòng Superior">Phòng Superior</Option>
                      <Option value="Phòng Deluxe">Phòng Deluxe</Option>
                      <Option value="Phòng Suite">Phòng Suite</Option>
                      <Option value="Phòng VIP">Phòng VIP</Option>
                    </Select>
                    
                    <Input
                      label="Tầng *"
                      type="number"
                      value={formData.tang}
                      onChange={(e) => setFormData({...formData, tang: e.target.value})}
                      required
                    />
                    
                    <div className="relative">
                      <Input
                        label="Sức chứa *"
                        type="number"
                        value={formData.succhua}
                        onChange={(e) => setFormData({...formData, succhua: e.target.value})}
                        required
                        className="pr-12" // Tăng padding để chữ "người" không bị lem
                        containerProps={{ className: "!min-w-0" }} // Thêm để tránh tràn khung
                      />
                      <span className="absolute right-3 bottom-2 text-gray-600 text-sm">
                        Người
                      </span>
                    </div>
                    
                    <div className="relative">
                      <Input
                        label="Giá phòng (/đêm) *"
                        type="number"
                        value={formData.succhua}
                        onChange={(e) => setFormData({...formData, succhua: e.target.value})}
                        required
                        className="pr-12" // Tăng padding để chữ "người" không bị lem
                        containerProps={{ className: "!min-w-0" }} // Thêm để tránh tràn khung
                      />
                      <span className="absolute right-3 bottom-2 text-gray-600 text-sm">
                        VNĐ
                      </span>
                    </div>
                    
                    <Select
                      label="Chi nhánh *"
                      value={formData.id_chinhanh.toString()}
                      onChange={(value) => setFormData({...formData, id_chinhanh: parseInt(value)})}
                    >
                      <Option value="1">Chi nhánh 1</Option>
                      <Option value="2">Chi nhánh 2</Option>
                      <Option value="3">Chi nhánh 3</Option>
                    </Select>
                    
                    <Textarea
                      label="Mô tả phòng"
                      value={formData.mota}
                      onChange={(e) => setFormData({...formData, mota: e.target.value})}
                      rows={3}
                    />
                  </div>
                </div>
              </div>

              {/* Cột 2 - Trạng thái */}
              <div>
                <div className="mb-8">
                  <Typography variant="h5" className="mb-4">Trạng Thái Phòng</Typography>
                  
                  <div className="space-y-6">
                    <Switch
                      checked={formData.trangthai}
                      onChange={() => setFormData({...formData, trangthai: !formData.trangthai})}
                      label={
                        <div className="flex items-center gap-2">
                          {formData.trangthai ? (
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
                        <div className="flex items-center gap-x-2"> {/* Thay gap-2 bằng gap-x-2 */}
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

                {/* Tiện ích (nếu cần bổ sung)
                <div>
                  <Typography variant="h5" className="mb-4">Tiện Ích (Tùy chọn)</Typography>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      'Máy lạnh', 'TV', 'Wifi', 'Minibar', 
                      'Bồn tắm', 'Vòi sen', 'Bàn làm việc', 'Tủ lạnh'
                    ].map(item => (
                      <Checkbox
                        key={item}
                        label={item}
                        // Xử lý tiện ích nếu cần (có thể thêm vào mota)
                        onChange={() => {}}
                        containerProps={{ className: "rounded-lg p-2 hover:bg-blue-gray-50" }}
                      />
                    ))}
                  </div>
                </div> */}
              </div>
            </div>

            {/* Nút submit */}
            <div className="mt-8 flex justify-end gap-4">
              <Button
                variant="outlined"
                onClick={() => navigate('/dashboard/rooms')}
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
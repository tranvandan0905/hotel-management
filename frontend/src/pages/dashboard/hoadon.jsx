import React from "react";
import { Card, Typography, Input, Button } from "@material-tailwind/react";
import { useParams } from "react-router-dom";

const CreateInvoice = () => {
  const { id } = useParams();

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Typography variant="h4" className="mb-6 text-center">
        Lập hóa đơn cho lịch đặt #{id}
      </Typography>

      <Card className="p-6 space-y-4 shadow-md">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="Họ tên khách hàng" disabled value="Nguyễn Văn A" />
          <Input label="Số điện thoại" disabled value="0912345678" />
          <Input label="Email" disabled value="email@example.com" />
          <Input label="Phòng" disabled value="101" />
          <Input label="Ngày nhận phòng" disabled value="2025-04-20" />
          <Input label="Ngày trả phòng" disabled value="2025-04-22" />
          <Input label="Số người" disabled value="2" />
          <Input label="Tổng tiền" disabled value="3,200,000đ" />
        </div>

        <div className="mt-6">
          <Typography variant="h6" className="mb-2">
            Thông tin thanh toán
          </Typography>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Phương thức thanh toán" value="Chuyển khoản" />
            <Input label="Ghi chú" placeholder="Ghi chú thêm..." />
          </div>
        </div>

        <div className="mt-6 text-right">
          <Button color="green">Xác nhận & In hóa đơn</Button>
        </div>
      </Card>
    </div>
  );
};

export default CreateInvoice;

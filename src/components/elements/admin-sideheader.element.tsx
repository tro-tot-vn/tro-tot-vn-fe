import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import useAuth from "@/hooks/use-auth";
import { LogOut, Settings, User } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import adminService from "@/services/admin.service";
import {
  Modal,
  Form,
  Input,
  Button as AntdButton,
  message,
  Select,
} from "antd"; // Chỉ giữ Form, Input và Button từ antd
import { Profile } from "@/services/types/morderator-response";
import { PasswordChangeForm } from "./password-change-form.element";

export function SiteHeader() {
  const [myProfile, setMyProfile] = useState<Profile | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] =
    useState(false);
  const [isEditing, setIsEditing] = useState(false); // Trạng thái chỉnh sửa
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  const fetchApi = async () => {
    try {
      const result = await adminService.getMyProfile();
      if (result.status === 200 || result.status === 403) {
        if (result.data) {
          setMyProfile(result.data);
          console.log("Dữ liệu hồ sơ cá nhân:", result.data);
          form.setFieldsValue({
            lastName: result.data.lastName || "",
            firstName: result.data.firstName || "",
            gender: result.data.gender,
            birthday: result.data.birthday
              ? new Date(result.data.birthday).toLocaleDateString()
              : "",
            phone: result.data.account?.phone || "",
            email: result.data.account?.email || "",
          });
        }
      } else if (result.status === 404) {
        console.log("Không tìm thấy dữ liệu");
      } else if (result.status === 500) {
        console.log("Lỗi server");
      } else {
        console.log("Lỗi không xác định");
      }
      setIsProfileModalOpen(true); // Mở modal sau khi fetch
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Xử lý khi nhấn nút "Chỉnh sửa"
  const handleEdit = () => {
    setIsEditing(true);
  };

  // Xử lý khi nhấn nút "Lưu"
  const handleSave = async () => {
    try {
      const values = await form.validateFields(); // Lấy dữ liệu từ form

      console.log("Giá trị form:", values);

      const updatedData: Record<string, any> = {}; // Dữ liệu cập nhật

      console.log("Dữ liệu hồ sơ cá nhân:", myProfile);

      // So sánh từng trường, chỉ gửi khi có sự thay đổi
      if (values.phone !== myProfile?.account.phone) {
        updatedData.phone = values.phone;
      }
      if (values.email !== myProfile?.account.email) {
        updatedData.email = values.email;
      }

      if (values.firstName !== myProfile?.firstName) {
        updatedData.firstName = values.firstName;
      }
      if (values.lastName !== myProfile?.lastName) {
        updatedData.lastName = values.lastName;
      }
      if (values.birthday !== myProfile?.birthday) {
        updatedData.birthday = values.birthday;
      }
      if (values.gender !== myProfile?.gender) {
        updatedData.gender = values.gender;
      }
      // Nếu không có thay đổi nào, không gửi request
      if (Object.keys(updatedData).length === 0) {
        messageApi.info("Không có thay đổi nào để lưu.");
        return;
      }
      console.log("Dữ liệu cập nhật:", updatedData);

      adminService
        .updateMyProfile(updatedData)
        .then((result) => {
          if (result) {
            if (result.status === 200) {
              if (result.data) {
                messageApi.success("Cập nhật thành công");
                fetchApi(); // Cập nhật lại dữ liệu sau khi lưu
              }
            } else if (result.status === 400) {
              messageApi.error("Số điện thoại hoặc email đã tồn tại");
            } else if (result.status === 404) {
              console.log("Không tìm thấy dữ liệu");
            } else if (result.status === 500) {
              console.log("Lỗi server");
            } else {
              console.log("Lỗi không xác định");
            }
          }
        })
        .catch((err) => {
          console.error("Error updating profile:", err);
          messageApi.error("Cập nhật thất bại");
        })
        .finally(() => {
          setIsEditing(false); // Thoát chế độ chỉnh sửa sau khi lưu
        });
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  // Xử lý khi nhấn "Hủy"
  const handleCancel = () => {
    if (isEditing) {
      setIsEditing(false); // Thoát chế độ chỉnh sửa
      form.resetFields(); // Reset form về giá trị ban đầu
      form.setFieldsValue({
        lastName: myProfile?.lastName || "",
        firstName: myProfile?.firstName || "",
        gender: myProfile?.gender,
        birthday: myProfile
          ? new Date(myProfile.birthday).toLocaleDateString()
          : "",
        phone: myProfile?.account?.phone || "",
        email: myProfile?.account?.email || "",
      });
    } else {
      setIsProfileModalOpen(false); // Đóng modal nếu không ở chế độ chỉnh sửa
    }
  };

  const auth = useAuth();
  return (
    <>
      {contextHolder}
      <header className="sticky top-0 z-40 w-full border-white border-b-[#E8E8EB] border-2 bg-white">
        <div className=" flex-1 flex h-16 items-center justify-between pr-4">
          <div className="flex items-center gap-2 pl-4">
            <SidebarTrigger className="" />
            <Link to="/admin" className="flex items-center space-x-2">
              <span className="font-bold text-xl">Trang quản trị</span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-10 w-10"
                  aria-label="User menu"
                >
                  <User className="h-10 w-10" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => fetchApi()}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Hồ sơ</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setIsChangePasswordModalOpen(true)}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Đổi mật khẩu</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => auth.signout()}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Modal
              title="Hồ sơ cá nhân"
              open={isProfileModalOpen}
              onCancel={handleCancel}
              footer={[
                !isEditing ? (
                  <AntdButton key="edit" type="primary" onClick={handleEdit}>
                    Chỉnh sửa
                  </AntdButton>
                ) : (
                  <>
                    <AntdButton key="save" type="primary" onClick={handleSave}>
                      Lưu
                    </AntdButton>
                    <AntdButton key="cancel" onClick={handleCancel}>
                      Hủy
                    </AntdButton>
                  </>
                ),
              ]}
              width={600}
              style={{ top: 20 }}
            >
              <Form form={form} layout="vertical">
                <Form.Item name="lastName" label="Họ">
                  <Input disabled={!isEditing} />
                </Form.Item>
                <Form.Item name="firstName" label="Tên">
                  <Input disabled={!isEditing} />
                </Form.Item>
                <Form.Item name="gender" label="Giới tính">
                  <Select disabled={!isEditing}>
                    <Select.Option value="Male">Nam</Select.Option>
                    <Select.Option value="Female">Nữ</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item name="birthday" label="Ngày sinh">
                  <Input disabled={!isEditing} />
                </Form.Item>
                <Form.Item
                  name="phone"
                  label="Số điện thoại"
                  rules={
                    isEditing
                      ? [
                          {
                            required: true,
                            message: "Vui lòng nhập số điện thoại",
                          },
                        ]
                      : []
                  }
                >
                  <Input disabled={!isEditing} />
                </Form.Item>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={
                    isEditing
                      ? [{ required: true, message: "Vui lòng nhập email" }]
                      : []
                  }
                >
                  <Input disabled={!isEditing} />
                </Form.Item>
              </Form>
            </Modal>

            <Modal
              title="Đổi mật khẩu"
              open={isChangePasswordModalOpen}
              onCancel={() => {
                setIsChangePasswordModalOpen(false);
              }}
              footer={null} // Turn off the buttons in the modal footer
              width={600}
              style={{ top: 20 }}
            >
              <PasswordChangeForm></PasswordChangeForm>
            </Modal>
          </div>
        </div>
      </header>
    </>
  );
}

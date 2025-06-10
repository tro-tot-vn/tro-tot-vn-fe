import {
  Card,
  Table,
  Button,
  Tag,
  Modal,
  Input,
  Form,
  Select,
  DatePicker,
  message,
  Descriptions,
} from "antd";
import {
  EyeOutlined,
  LockOutlined,
  SettingFilled,
  UnlockOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import adminService from "@/services/admin.service";
import { getMorderatorListResponse } from "@/services/types/morderator-response";
import { useEffect, useState } from "react";
import { User } from "lucide-react";
import { PostMoratorHistoryResponse } from "@/services/types/postModerateHistory-response";

const { Option } = Select;

export default function ModeratorsPage() {
  const [moderatorList, setModeratorList] = useState<
    getMorderatorListResponse[]
  >([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [moderatorHistory, setModeratorHistory] = useState<
    PostMoratorHistoryResponse[]
  >([]);
  const [isHistoryModalVisible, setIsHistoryModalVisible] = useState(false);
  const [profileModerator, setProfileModerator] = useState<any>(null);
  const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);
  const [selectedModeratorId, setSelectedModeratorId] = useState<number | null>(
    null
  );
  const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);
  const [keySearch, setKeySearch] = useState("");
  const [form] = Form.useForm();

  const fetchApi = async () => {
    const result = await adminService.getMorderator(keySearch);
    if (result?.status === 200 && Array.isArray(result.data)) {
      setModeratorList(result.data);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const isValid = await form
        .validateFields()
        .then(() => true)
        .catch(() => false);
      if (!isValid) {
        messageApi.error("Vui lòng điền đầy đủ thông tin");
        return;
      }
      const values = await form.validateFields();
      const result = await adminService.createModerator(values);
      if (result) {
        if (result.status === 200) {
          form.resetFields();
          setIsModalVisible(false);
          messageApi.success("Thêm người kiểm duyệt thành công");
          fetchApi();
        } else if (result.status === 400) {
          if (result.message === "PHONE_ALREADY_EXISTS") {
            messageApi.error("Số điện thoại đã tồn tại");
          } else if (result.message === "EMAIL_ALREADY_EXISTS") {
            messageApi.error("Email đã tồn tại");
          } else {
            messageApi.error("Thông tin không hợp lệ, vui lòng kiểm tra lại");
          }
        } else if (result.status === 404) {
          messageApi.error("Không tìm thấy người dùng");
        } else if (result.status === 500) {
          messageApi.error("Lỗi hệ thống, vui lòng thử lại sau");
        } else {
          messageApi.error("Không thể thêm mới người dùng");
        }
      }
    } catch (errorInfo) {
      console.log("Lỗi khi nhận giá trị từ form: ", errorInfo);
      messageApi.error("Không thể kết nối đến máy chủ");
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    // form.resetFields();
  };

  const handleChangStatus = async (status: string, adminId: number) => {
    try {
      const result = await adminService.changStatusModerator(status, adminId);
      if (result) {
        if (result.status === 200) {
          messageApi.success("Thay đổi trạng thái thành công");
          fetchApi();
        } else if (result.status === 404) {
          messageApi.error("Không tìm thấy người dùng");
        } else if (result.status === 500) {
          messageApi.error("Lỗi hệ thống, vui lòng thử lại sau");
        } else {
          messageApi.error("Không thể thay đổi trạng thái người dùng");
        }
      }
    } catch (error) {
      console.error("Lỗi khi thay đổi trạng thái:", error);
      messageApi.error("Lỗi khi thay đổi trạng thái");
    }
  };

  const fetchApiHistoryModerator = async (adminId: number) => {
    try {
      const result = await adminService.getPostModeratorHistorybyId(adminId);
      if (result?.status === 200 && result.data) {
        setModeratorHistory(Array.isArray(result.data) ? result.data : []);
        setIsHistoryModalVisible(true);
      } else {
        messageApi.error("Không thể lấy lịch sử người dùng");
      }
    } catch (error) {
      console.error("Lỗi khi lấy lịch sử:", error);
    }
  };

  const fetchApiProileModerator = async (moderatorId: number) => {
    try {
      const result = await adminService.getProfileModerator(moderatorId);

      if (result) {
        if (result.status === 200) {
          if (result.data) {
            setProfileModerator(result.data);
            setIsProfileModalVisible(true);
          }
        } else if (result.status === 404) {
          messageApi.error("Không tìm thấy người dùng");
        } else if (result.status === 500) {
          messageApi.error("Lỗi hệ thống, vui lòng thử lại sau");
        } else {
          messageApi.error("Không thể lấy thông tin người dùng");
        }
      }
    } catch (error) {
      console.error("Lỗi khi lấy lịch sử:", error);
    }
  };
  console.log(profileModerator);

  // Hàm mở modal đổi mật khẩu và lưu moderatorId
  const showPasswordModal = (moderatorId: number) => {
    setSelectedModeratorId(moderatorId);
    setIsPasswordModalVisible(true);
  };

  // Hàm xử lý đổi mật khẩu
  const handlePasswordChange = async () => {
    try {
      if (selectedModeratorId === null) {
        messageApi.error("Không xác định được người dùng để đổi mật khẩu");
        return;
      }
      console.log(selectedModeratorId);
      const result = await adminService.resetPasswordModerator(
        selectedModeratorId
      );
      console.log(result);
      if (result?.status === 200) {
        messageApi.success("Đổi mật khẩu thành công!");
      } else if (result?.status === 404) {
        messageApi.error("Không tìm thấy người dùng");
      } else if (result?.status === 500) {
        messageApi.error("Lỗi hệ thống, vui lòng thử lại sau");
      } else {
        messageApi.error("Không thể đổi mật khẩu");
      }
      setIsPasswordModalVisible(false);
    } catch (error) {
      console.error("Lỗi khi thay đổi mật khẩu:", error);
      messageApi.error("Lỗi khi thay đổi mật khẩu");
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: ["adminId"],
      key: "adminId",
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      render: (_text: any, record: any) =>
        `${record.firstName} ${record.lastName}`,
    },
    {
      title: "Email",
      dataIndex: ["account", "email"],
      key: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: ["account", "phone"],
      key: "phone",
    },
    {
      title: "Trạng thái",
      dataIndex: ["account", "status"],
      key: "status",
      render: (status: string) => (
        <Tag color={status === "Active" ? "green" : "red"}>
          {status === "Active" ? "Hoạt động" : "Tạm khóa"}
        </Tag>
      ),
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_text: any, record: any) => (
        <div className="flex justify-start gap-2">
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => fetchApiHistoryModerator(record.adminId)}
          />
          <Button
            type="link"
            icon={
              record.account.status === "Active" ? (
                <LockOutlined />
              ) : (
                <UnlockOutlined />
              )
            }
            className={
              record.account.status === "Active"
                ? "text-red-500"
                : "text-green-500"
            }
            onClick={() =>
              handleChangStatus(
                record.account.status === "Active" ? "InActive" : "Active",
                record.adminId
              )
            }
          />
          <Button
            type="link"
            icon={<User />}
            onClick={() => fetchApiProileModerator(record.adminId)}
          />
          <Button
            type="link"
            icon={<SettingFilled />}
            onClick={() => showPasswordModal(record.adminId)}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      {contextHolder}
      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Quản lý Người kiểm duyệt</h1>
            <Button
              type="primary"
              icon={<UserAddOutlined />}
              onClick={showModal}
            >
              Thêm Người kiểm duyệt
            </Button>
          </div>

          <Card title="Danh sách người kiểm duyệt">
            <div className="flex flex-row flex-1 justify-between mb-4">
              <Input
                placeholder="Tìm kiếm theo số điện thoại hoặc email"
                defaultValue={keySearch ?? ""}
                onChange={(e) => {
                  setKeySearch(e.target.value);
                }}
                style={{}}
              />
              <Button
                type="primary"
                onClick={fetchApi}
                style={{ marginLeft: 16 }}
              >
                Tìm kiếm
              </Button>
            </div>
            <Table
              columns={columns}
              dataSource={moderatorList}
              rowKey="adminId"
            />
          </Card>

          <Modal
            title="Thêm Người kiểm duyệt"
            open={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            maskClosable={false}
          >
            <Form form={form} layout="vertical">
              <Form.Item
                label="Họ"
                name="firstName"
                rules={[{ required: true, message: "Vui lòng nhập họ!" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Tên"
                name="lastName"
                rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: "Vui lòng nhập email!" }]}
              >
                <Input type="email" />
              </Form.Item>
              <Form.Item
                label="Số điện thoại"
                name="phone"
                rules={[
                  { required: true, message: "Vui lòng nhập số điện thoại!" },
                ]}
              >
                <Input type="tel" />
              </Form.Item>
              <Form.Item
                label="Giới tính"
                name="gender"
                rules={[
                  { required: true, message: "Vui lòng chọn giới tính!" },
                ]}
              >
                <Select>
                  <Option value="Male">Nam</Option>
                  <Option value="Female">Nữ</Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="Ngày sinh"
                name="birthday"
                rules={[
                  { required: true, message: "Vui lòng chọn ngày sinh!" },
                ]}
              >
                <DatePicker style={{ width: "100%" }} format="DD/MM/YYYY" />
              </Form.Item>
            </Form>
          </Modal>

          <Modal
            title="Lịch sử kiểm duyệt"
            open={isHistoryModalVisible}
            onCancel={() => setIsHistoryModalVisible(false)}
            footer={null}
            width={800}
          >
            <Table
              columns={[
                {
                  title: "Tiêu đề tin",
                  key: "title",
                  render: (record: PostMoratorHistoryResponse) =>
                    record.post?.title || "Không có",
                },
                {
                  title: "Hành động",
                  dataIndex: "actionType",
                  key: "actionType",
                },
                {
                  title: "Lý do",
                  dataIndex: "reason",
                  key: "reason",
                },
                {
                  title: "Thời gian",
                  dataIndex: "execAt",
                  key: "execAt",
                  render: (execAt: string) => new Date(execAt).toLocaleString(),
                },
              ]}
              dataSource={moderatorHistory}
              rowKey="postId"
              pagination={false}
            />
          </Modal>

          <Modal
            title="Thông tin người kiểm duyệt"
            open={isProfileModalVisible}
            onCancel={() => setIsProfileModalVisible(false)}
            footer={null}
            width={800}
          >
            {profileModerator && profileModerator.account && (
              <Descriptions bordered column={1} size="middle">
                <Descriptions.Item label="Họ và tên">
                  {profileModerator.lastName} {profileModerator.firstName}
                </Descriptions.Item>
                <Descriptions.Item label="Giới tính">
                  {profileModerator.gender === "Male" ? "Nam" : "Nữ"}
                </Descriptions.Item>
                <Descriptions.Item label="Ngày sinh">
                  {new Date(profileModerator.birthday).toLocaleDateString(
                    "vi-VN"
                  )}
                </Descriptions.Item>
                <Descriptions.Item label="Ngày gia nhập">
                  {new Date(profileModerator.joinedAt).toLocaleDateString(
                    "vi-VN"
                  )}
                </Descriptions.Item>
                <Descriptions.Item label="Số điện thoại">
                  {profileModerator.account.phone}
                </Descriptions.Item>
                <Descriptions.Item label="Email">
                  {profileModerator.account.email}
                </Descriptions.Item>
              </Descriptions>
            )}
          </Modal>
          <Modal
            title="Bạn có muốn khôi phục mật khẩu mặc định quản trị viên"
            open={isPasswordModalVisible}
            onOk={handlePasswordChange}
            onCancel={() => {
              setIsPasswordModalVisible(false);
            }}
          ></Modal>
        </main>
      </div>
    </>
  );
}

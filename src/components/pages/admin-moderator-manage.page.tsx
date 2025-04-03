import { Card, Table, Button, Tag, Modal, Input, Form, Select, DatePicker, message } from "antd";
import { EyeOutlined, LockOutlined, UnlockOutlined, UserAddOutlined } from "@ant-design/icons";
import adminService from "@/services/admin.service";
import { getMorderatorListResponse } from "@/services/types/morderator-response";
import { useEffect, useState } from "react";

const { Option } = Select;

export default function ModeratorsPage() {
  const [moderatorList, setModeratorList] = useState<getMorderatorListResponse[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();


  const fetchApi = async () => {
  const result = await adminService.getMorderator();
  if (result) {
    if (result.status === 200) {
      if (result.data) {
        if (Array.isArray(result.data)) {
          setModeratorList(result.data);
        }
      }
    }
  }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    // Handle form submission logic here
    try {
      const values = await form.validateFields();
      // const { firstName, lastName, email, phone, gender, birthday, password} = values;
      // console.log(firstName,lastName, email, phone, gender, birthday, password);
      const result = await adminService.createModerator(values);
      if (result) { 
        if (result.status === 200) {
          messageApi.success("Thêm mới thành công");
          fetchApi();
        }else if (result.status === 400) {
          messageApi.error("Email đã tồn tại");
        }
        else if (result.status === 404) {
          messageApi.error("Không tìm thấy người dùng");
        }
        else if (result.status === 500) {
          messageApi.error("Lỗi hệ thống, vui lòng thử lại sau");
        }
        else {
          messageApi.error("Không thể thêm mới người dùng");
        }
      }
      // Reset the form fields after successful submission
      setIsModalVisible(false);
      form.resetFields();
    } catch (errorInfo) {
      console.log('Failed to receive values from form: ', errorInfo);
      messageApi.error("Không thể kết nối đến server");
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_text: any, record: any) => `${record.firstName} ${record.lastName}`,
    },
    {
      title: "Email",
      dataIndex: ["account", "email"],
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: ["account", "phone"],
      key: "phone",
    },
    {
      title: "Status",
      dataIndex: ["account", "status"],
      key: "status",
      render: (status: string) => (
        <Tag color={status === "Active" ? "green" : "red"}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_text: any, record: any) => (
        <div className="flex justify-start gap-2">
          <Button type="link" icon={<EyeOutlined />} href={`/users/moderators/${record.adminId}`} />
          <Button
            type="link"
            icon={record.account.status === "Active" ? <LockOutlined /> : <UnlockOutlined />}
            className={record.account.status === "Active" ? "text-red-500" : "text-green-500"}
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
          <h1 className="text-3xl font-bold">Moderators</h1>
          <Button type="primary" icon={<UserAddOutlined />} onClick={showModal}>
            Add Moderator
          </Button>
        </div>

        <Card title="Moderator Accounts">
          <Table columns={columns} dataSource={moderatorList} rowKey="adminId" />
        </Card>

        <Modal
          title="Add New Moderator"
          open={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              label="First Name"
              name="firstName"
              rules={[{ required: true, message: 'Please input the first name!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Last Name"
              name="lastName"
              rules={[{ required: true, message: 'Please input the last name!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Please input the email!' }]}
            >
              <Input type="email" />
            </Form.Item>
            <Form.Item
              label="Phone"
              name="phone"
              rules={[{ required: true, message: 'Please input the phone number!' }]}
            >
              <Input type="tel" />
            </Form.Item>
            <Form.Item
              label="Gender"
              name="gender"
              rules={[{ required: true, message: 'Please select the gender!' }]}
            >
              <Select>
                <Option value="Male">Male</Option>
                <Option value="Female">Female</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Birthday"
              name="birthday"
              rules={[{ required: true, message: 'Please select the birthday!' }]}
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input the password!' }]}
            >
              <Input.Password />
            </Form.Item>
          </Form>
        </Modal>
      </main>
    </div>
    </>
  );
}
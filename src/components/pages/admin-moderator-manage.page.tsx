import { Card, Table, Button, Tag, Modal, Input, Form } from "antd";
import { EyeOutlined, LockOutlined, UnlockOutlined, UserAddOutlined } from "@ant-design/icons";
import adminService from "@/services/admin.service";
import { getMorderatorListResponse } from "@/services/types/morderator-response";
import { useEffect, useState } from "react";

export default function ModeratorsPage() {
  const [moderatorList, setModeratorList] = useState<getMorderatorListResponse[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
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
    fetchApi();
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    // Handle form submission logic here
    try {
      const values = await form.validateFields();
      const { firstName,lastName, email, phone } = values;
      console.log(firstName,lastName, email, phone);
      setIsModalVisible(false);
      form.resetFields();
    } catch (errorInfo) {
      console.log('Failed to receive values from form: ', errorInfo);
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
          </Form>
        </Modal>
      </main>
    </div>
  );
}
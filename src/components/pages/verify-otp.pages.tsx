import {
  Button,
  Card,
  Col,
  Form,
  Input,
  message,
  Row,
  Spin,
  Typography,
} from "antd";
import { useLocation, useNavigate } from "react-router";
import { useState } from "react";
import authService from "@/services/auth.service";

const { Title } = Typography;

function VerifyOtpRegister() {
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  console.log(email);

  if (!email) {
    messageApi.error("Không tìm thấy email, vui lòng đăng ký lại!");
    navigate("/register");
    return null;
  }

  const handleChange = (index: number, value: string) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 5) {
        setTimeout(() => {
          document.getElementById(`otp-${index + 1}`)?.focus();
        }, 50);
      }
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    const otpCode = otp.join("");
    if (otpCode.length !== 6) {
      messageApi.error("Vui lòng nhập đầy đủ 6 chữ số OTP");
      setLoading(false);
      return;
    }

    const result = await authService.verifyOtpRegister(email, otpCode);
    console.log(result);
    if (result) {
      console.log(result.status);
      if (result.status === 200) {
        messageApi.success("Xác thực thành công, vui lòng đăng nhập!");
        navigate("/login");
      } else if (result.status === 400) {
        messageApi.error("OTP không hợp lệ hoặc đã hết hạn!");
      } else if (result?.data?.message) {
        messageApi.error(result.data.message);
      } else {
        messageApi.error("Lỗi không xác định, vui lòng thử lại!");
      }
    } else {
      messageApi.error("Không thể kết nối đến server");
    }
    setLoading(false);
  };

  return (
    <>
      {contextHolder}
      <Row justify="center">
        <Col span={10}>
          <Card
            style={{
              width: 500,
              padding: 50,
              marginTop: 100,
              textAlign: "center",
            }}
          >
            <Title level={2}>Xác thực OTP</Title>
            <p>
              Vui lòng nhập mã OTP được gửi đến email: <b>{email}</b>
            </p>
            <Form onFinish={handleSubmit} layout="vertical">
              <Row justify="center" gutter={10}>
                {otp.map((val, index) => (
                  <Col key={index}>
                    <Input
                      id={`otp-${index}`}
                      value={val}
                      maxLength={1}
                      onChange={(e) => handleChange(index, e.target.value)}
                      style={{ width: 50, textAlign: "center", fontSize: 18 }}
                    />
                  </Col>
                ))}
              </Row>
              <Button
                type="primary"
                htmlType="submit"
                disabled={loading}
                style={{ marginTop: 20 }}
              >
                {loading ? <Spin size="small" /> : "Xác nhận"}
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default VerifyOtpRegister;

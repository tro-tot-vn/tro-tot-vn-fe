import authService from "@/services/auth.service";
import {  Button, Card, Form, Input, message, Spin, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
const { Title } = Typography;

function VerifyOtp(){
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const location = useLocation();
    const email = location.state?.email || "";

    useEffect(() => {
        if (!email) {
            navigate("/forgot-password", { replace: true }); // `replace: true` để không thể quay lại bằng nút "Back"
        }
    }, [email, navigate]);

    const [loading, setLoading] = useState(false);
    const handeClick = async () => {
        if (!email) {
            messageApi.open({ type: 'error', content: 'Email không hợp lệ' });
            return;
        }
        setLoading(true);
        const result = await authService.sendEmail(email); // Gửi lại email OTP
        if(result){
            if (result.status === 200) {
                messageApi.success('Gửi lại OTP thành công');
            }else if (result.status === 429) {
                messageApi.error(String(result.data.error) || "Vui lòng chờ trước khi gửi lại OTP");    
            } else {
                messageApi.error('Không thể gửi lại OTP');
            }
        }
        setLoading(false);
    } 
            
    const handleSubmit = async (values: { otp: string; }) => {
        if (!email) {
            messageApi.open({ type: 'error', content: 'Email không hợp lệ' });
            return;
        }
        setLoading(true);
        const result = await authService.sendOtp(email, values.otp); 
        if (result) {
            if (result.status === 200) {
                messageApi.success("Xác thực thành công");

                if (result.data?.data?.resetToken) {
                    const resetToken = result.data.data?.resetToken;
                    setTimeout(() => {
                        navigate("/reset-password", { state: { resetToken } });
                    }, 1000);
                }
            } else if (result.status === 400) {
                messageApi.error("OTP không đúng hoặc đã hết hạn");
            } else if (result.status === 500) {
                messageApi.error("Lỗi hệ thống, vui lòng thử lại sau");
            } else {
                messageApi.error("Đã có lỗi xảy ra");
            }
            setLoading(false);
    } else {
        messageApi.error("Không thể kết nối đến server");
    }     
    }
      
    return (
        <>
            {contextHolder}
            <Card  style={{ width: 500,padding:50, margin: 'auto', marginTop: 100 , textAlign:"center"} }>
                <Title level={2}>Nhập Mã OTP</Title>
                <Form
                onFinish={handleSubmit}
                name="formverify"
                layout="vertical">
                    <Form.Item
                    name= "otp"
                    rules={[{ required: true, message: 'Thông tin không được bỏ trống' }]}>
                        <Input.OTP inputMode="numeric"/>
                    </Form.Item>

                    <Button style={{marginTop:30}} type="primary" htmlType='submit' disabled={loading}>Verify OTP</Button>
                    <div style={{ marginTop: 10 }}>
                        <span>
                            Nếu bạn chưa nhận được mã!  
                            <strong onClick={handeClick} style={{ cursor: "pointer", color: "blue" }}>
                                {loading ? <Spin size="small" /> : " Gửi lại"}
                            </strong>
                        </span>
                    </div>
                </Form>
            </Card>
        </>
    )
}
export default VerifyOtp;
import { sendEmail, sendOtp } from '@/services/forgotPassword';
import {  Button, Card, Form, Input, message, Spin, Typography } from 'antd';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
const { Title } = Typography;

function VerifyOtp(){
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const location = useLocation();
    const email = location.state.email;
    const [loading, setLoading] = useState(false);
    const handeClick = async () => {
        if (!email) {
            messageApi.open({ type: 'error', content: 'Email không hợp lệ' });
            return;
        }
        setLoading(true);
        try {
            const result = await sendEmail(email); // Gửi lại email OTP
            if (result.status === 200) {
                messageApi.success('Gửi lại OTP thành công');
            } else {
                messageApi.error('Không thể gửi lại OTP');
            }
        } catch (error) {
            messageApi.error('Lỗi khi gửi lại OTP');
        } finally {
            setLoading(false);
        }
    }
    const handleSubmit = async (values: { otp: string; }) => {
        if (!email) {
            messageApi.open({ type: 'error', content: 'Email không hợp lệ' });
            return;
        }
        setLoading(true);
        try {
            const result = await sendOtp(email, values.otp);
            if (result.status === 200) {
                messageApi.open({
                    type: 'success',
                    content: 'Xác thực thành công',
                });
                const resetToken = result.data.resetToken;
                console.log(resetToken);
                setTimeout(() => {
                    navigate('/reset-password', { state: { resetToken} });
                }, 1000);
                
            }
        } catch (error) {
            messageApi.open({
                type: 'error',
                content: 'OTP không đúng hoặc đã hết hạn',
            });
        }finally{
            setLoading(false);
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
import authService from "@/services/auth.service";
import { Button, Card, Form, Input, Typography, message } from "antd";
import FormItem from "antd/es/form/FormItem";
import { useLocation, useNavigate } from "react-router";
const { Title } = Typography;
function ResetPassword () {
    const passwordRules = [
        { required: true, message: 'Mật khẩu không được để trống' },
        { min: 8, message: 'Mật khẩu phải có ít nhất 8 ký tự' },
        { pattern: /[A-Z]/, message: 'Phải có ít nhất một chữ cái in hoa' },
        { pattern: /\d/, message: 'Phải có ít nhất một số' }
    ];
    const [messageApi, contextHolder] = message.useMessage();
    const location = useLocation();
    const navigate = useNavigate();
    const handleSubmit = async (values: any) => {
        try {
            if (values.password !== values.confirmPassword) {
               messageApi.open({
                    type: 'error',
                    content: 'Mật khẩu không khớp',
               });
               
            }else{
                const resetToken = location.state?.resetToken;
        
                if (!resetToken) {
                    console.error("Thiếu resetToken, chuyển hướng về trang forgot-password");
                    navigate('/forgot-password');
                    return;
                }
                const result = await authService.resetPassword(resetToken, values.password);

                if (result && result.status === 200) {
                    messageApi.open({
                        type: 'success',
                        content: 'Đổi mật khẩu thành công',
                    });
                    setTimeout(() => {
                        navigate('/login', { replace: true });
                    }, 1000);
                }
            }
        } catch (error) {
            if (error instanceof Error) {
                console.error("Lỗi từ API:", (error as any).response?.data || error.message);
            } else {
                console.error("Lỗi từ API:", error);
            }
            messageApi.open({
                type: 'error',
                content: 'Có lỗi xảy ra, vui lòng thử lại!',
            });
        }
    }

    return (
        <>
        {contextHolder}
        <Card style={{ width: 500,padding:50, margin: 'auto', marginTop: 100 , textAlign:"center"} }>
            <Title level={2}>Reset Password</Title>
            <Form
            onFinish={handleSubmit}
            name="formlogin"
            layout="vertical">
                <FormItem
                label="New Password"
                name="password"
                rules={passwordRules}
                >
                    <Input.Password/>
                </FormItem>
                <FormItem
                label="Confirm Password"
                name="confirmPassword"
                rules={passwordRules}
                >
                    <Input.Password/>
                </FormItem>
                <Button type="primary" htmlType='submit'>Reset Password</Button>

            </Form>
        </Card>
        </>
    );
}
export default ResetPassword;
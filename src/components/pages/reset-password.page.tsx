import { resetPassword } from "@/services/forgotPassword";
import { Button, Card, Form, Input, Typography, message } from "antd";
import FormItem from "antd/es/form/FormItem";
import { useLocation, useNavigate } from "react-router";
const { Title } = Typography;
function ResetPassword () {
    const rules = [{ required: true, message: 'Thông tin không được bỏ trống' }];
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
            }
            else{
                const email = location.state?.email;
                const result = await resetPassword(email, values.password);
                if (result.status === 200) {
                    messageApi.open({
                        type: 'success',
                        content: 'Đổi mật khẩu thành công',
                    });
                    setTimeout(() => {
                        navigate('/login');
                    }, 1000);
                }
            }
        } catch (error) {
            messageApi.open({
                type: 'error',
                content: 'Vui lòng sử dụng mật khẩu mới khác mật khẩu cũ',
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
                rules={rules}
                >
                    <Input.Password/>
                </FormItem>
                <FormItem
                label="Confirm Password"
                name="confirmPassword"
                rules={rules}
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
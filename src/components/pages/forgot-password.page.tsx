import {Button, Card, Col, Form, Input, message, Row ,Spin,Typography} from "antd"
import FormItem from "antd/es/form/FormItem";
import authService from "@/services/auth.service";
import { useNavigate } from "react-router";
import { useState } from "react";

const { Title } = Typography;



function ForgotPassword() {
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState(false);
    const navigation = useNavigate();
    const rules = [{ required: true, message: 'Thông tin không được bỏ trống' }];
    const handleClick = async (values: { email: string; }) => {
        setLoading(true);
        try {
            const result = await authService.sendEmail(values.email);   
            if (result?.status == 200) {
                messageApi.open({
                    type: 'success',
                    content: 'Gửi email thành công',
                });
                setTimeout(() => {
                    navigation("/verify-otp", { state: { email: values.email } });
                }, 1000);
            }else{
                messageApi.open({
                    type: 'error',
                    content: 'Email không tồn tại',
                });
            }
        } catch (error) {
            const message = (error as any).response.data.message;
            console.error("Lỗi gửi email:", message.toString());
            messageApi.open({
                type: 'error',
                content: 'Email không tồn tại',
            });
        }finally{
            setLoading(false);
        }
    }
    return (
        <>
        {contextHolder}
        <Row justify="center">
            <Col span={10}>
                <Card style={{ width: 500,padding:50, margin: 'auto', marginTop: 100 , textAlign:"center"} }>
                    <Title level={2}>Quên mật khẩu</Title>
                    <Form
                    onFinish={handleClick}
                    name="formlogin"
                    layout="vertical"
                    >
                        <FormItem
                        label="Email"
                        name="email"
                        rules={rules}
                        >
                            <Input type="email"/>
                        </FormItem>
                    
                        <Button type="primary" htmlType="submit" disabled={loading}>
                            {loading ? <Spin size="small" /> : "Gửi yêu cầu"}
                        </Button>  
                    </Form>
                </Card>
            </Col>
        </Row>
        </>
    );
  }
  export default ForgotPassword;
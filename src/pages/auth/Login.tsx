import React from "react"

import { Button, Form, Input } from "antd"
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { LoginBody } from "../../interfaces/auth";
import { useAppDispatch } from "../../app/hooks";
import { loginUser } from "../../features/auth/authSlice";

const Login: React.FC = () => {
    const dispatch = useAppDispatch()

    const onFinish = (values: LoginBody) => {
        console.log(values);
        dispatch(loginUser(values))
    };
    
    return (
        <Form name="normal_login" className="login-form" initialValues={{ remember: true }} onFinish={onFinish} >
          <Form.Item name="mail" rules={[
            {type: 'email', message: 'Не корректный email!' },
            {required: true, message: 'Please input your Mail!'}]}>
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Mail" />
            </Form.Item>
          <Form.Item name="password" rules={[{required: true,message: 'Please input your Password!'}]}>
            <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
            </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Войти
            </Button>
            <br /> или <Link to="/auth/registration">Зарегестрироваться</Link>
            </Form.Item>
        </Form>
    )
}

export default Login
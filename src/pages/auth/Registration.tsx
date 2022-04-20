import React from "react"

import { Button, Form, Input } from "antd"
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { RegistrationBody } from "../../interfaces/auth";
import { registrationUser } from "../../features/auth/authSlice";
import { useAppDispatch } from "../../app/hooks";

const Registration: React.FC = () => {

    const dispatch = useAppDispatch()

    const onFinish = (values: RegistrationBody) => {
        console.log(values);
        dispatch(registrationUser(values))
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

          <Form.Item name="fullname" rules={[{required: true,message: 'Please input your Fullname!'}]}>
            <Input prefix={<UserOutlined className="site-form-item-icon" />} type="text" placeholder="Fullname" />
          </Form.Item>

          <Form.Item name="shortname" rules={[{required: true,message: 'Please input your shortname!'}]}>
            <Input prefix={<UserOutlined className="site-form-item-icon" />} type="text" placeholder="shortname" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Зарегистрироваться
            </Button>
            <br /> или <Link to="/auth/login">Уже есть аккаунт</Link>
            </Form.Item>
        </Form>
    )
}

export default Registration
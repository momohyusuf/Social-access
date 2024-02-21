import { Button, Checkbox, Form, Input, message } from 'antd';
import axios from 'axios';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { baseUrl } from '../../utils/helpers';
import { AuthContext } from '../../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const { setUser } = React.useContext(AuthContext);
  const [messageApi, contextHolder] = message.useMessage();
  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(`${baseUrl}/auth/sign-in`, values);
      localStorage.setItem('user', JSON.stringify(response.data));
      localStorage.setItem(
        'accessToken',
        JSON.stringify(response.data.accessToken)
      );
      setUser(response.data);
      navigate('/settings');
    } catch (error) {
      console.log(error);
      messageApi.open({
        style: {
          color: 'red',
        },
        type: 'error',
        content: error.response.data.message || 'Network error try again',
      });
    } finally {
      setLoading(false);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <section className="grid place-items-center h-[calc(100vh-100px)]">
      {contextHolder}
      <div className="max-w-[500px] bg-white w-full shadow-lg rounded-md p-4">
        {' '}
        <h3 className="text-center">Welcome back!</h3>
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <p className="font-semibold">Email</p>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your email!',
              },
            ]}
          >
            <Input size="large" />
          </Form.Item>

          <p className="font-semibold">Password</p>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password size="large" />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button loading={loading} type="primary" htmlType="submit" block>
              Login
            </Button>
          </Form.Item>
        </Form>
        <p className="text-center">
          Dont have an account yet?{' '}
          <Link
            to="/sign-up"
            className="font-medium text-blue-500 hover:underline cursor-pointer"
          >
            Sign up
          </Link>
        </p>
      </div>
    </section>
  );
};
export default Login;

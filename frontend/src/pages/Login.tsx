import { useState } from 'react';
import { Form, Input, Button, NavBar } from 'antd-mobile';
import { useNavigate } from 'react-router-dom';
import apiClient from '@/utils/request';
import { storage } from '@/utils/storage';

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: LoginFormData) => {
    setLoading(true);
    try {
      const res = await apiClient.post('/auth/login', values);
      if (res.code === 0) {
        storage.set('accessToken', res.data.accessToken);
        onLogin();
        navigate('/');
      }
    } catch (error: any) {
      alert(error.response?.data?.message || '登录失败');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (role: string) => {
    setLoading(true);
    try {
      const email = `${role}@demo.com`;
      const res = await apiClient.post('/auth/login', {
        email,
        password: 'demo123',
      });
      if (res.code === 0) {
        storage.set('accessToken', res.data.accessToken);
        onLogin();
        navigate('/');
      }
    } catch (error: any) {
      alert(error.response?.data?.message || '登录失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <NavBar back={null}>智能 CRM 演示系统</NavBar>
      
      <div style={{ padding: '24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{ fontSize: '28px', marginBottom: '8px' }}>🦞</h1>
          <h2 style={{ fontSize: '20px', color: '#333' }}>智能 CRM</h2>
          <p style={{ color: '#999', fontSize: '14px' }}>让销售更简单、更智能</p>
        </div>

        <Form
          onFinish={onFinish}
          footer={
            <Button block type="submit" color="primary" loading={loading} size="large">
              登录
            </Button>
          }
        >
          <Form.Item
            name="email"
            label="邮箱"
            rules={[
              { required: true, message: '请输入邮箱' },
              { type: 'email', message: '邮箱格式不正确' },
            ]}
          >
            <Input placeholder="请输入邮箱" />
          </Form.Item>

          <Form.Item
            name="password"
            label="密码"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input type="password" placeholder="请输入密码" />
          </Form.Item>
        </Form>

        <div style={{ marginTop: '24px' }}>
          <p style={{ textAlign: 'center', color: '#999', marginBottom: '12px' }}>
            或使用演示账号快速体验
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Button
              block
              size="large"
              fill="outline"
              onClick={() => handleDemoLogin('sales')}
              disabled={loading}
            >
              👤 销售账号 (sales@demo.com)
            </Button>
            <Button
              block
              size="large"
              fill="outline"
              onClick={() => handleDemoLogin('manager')}
              disabled={loading}
            >
              📊 主管账号 (manager@demo.com)
            </Button>
            <Button
              block
              size="large"
              fill="outline"
              onClick={() => handleDemoLogin('operation')}
              disabled={loading}
            >
              ⚙️ 运营账号 (operation@demo.com)
            </Button>
          </div>
        </div>

        <div style={{ marginTop: '32px', textAlign: 'center', color: '#999', fontSize: '12px' }}>
          <p>演示系统使用模拟数据</p>
          <p>所有操作不会影响真实数据</p>
        </div>
      </div>
    </div>
  );
}

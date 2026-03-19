import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavBar, List, Button } from 'antd-mobile';
import { storage } from '@/utils/storage';

export default function Mine() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // 从 token 解析用户信息（简化版本）
    setUser({
      name: '李销售',
      email: 'sales@demo.com',
      role: 'SALES',
    });
  }, []);

  const handleLogout = () => {
    storage.remove('accessToken');
    navigate('/login');
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <NavBar>我的</NavBar>

      <div style={{ padding: '16px' }}>
        <div
          style={{
            backgroundColor: '#fff',
            borderRadius: '12px',
            padding: '24px',
            marginBottom: '16px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '40px',
              backgroundColor: '#1890ff',
              color: '#fff',
              fontSize: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
            }}
          >
            {user.name[0]}
          </div>
          <h2 style={{ marginBottom: '8px' }}>{user.name}</h2>
          <p style={{ color: '#999', fontSize: '14px' }}>{user.email}</p>
          <p style={{ color: '#999', fontSize: '14px' }}>角色：{user.role}</p>
        </div>

        <List>
          <List.Item arrow onClick={() => alert('功能开发中')}>
            📊 我的数据
          </List.Item>
          <List.Item arrow onClick={() => alert('功能开发中')}>
            ⚙️ 设置
          </List.Item>
          <List.Item arrow onClick={() => alert('功能开发中')}>
            📖 使用帮助
          </List.Item>
        </List>

        <div style={{ marginTop: '24px' }}>
          <Button block color="danger" size="large" onClick={handleLogout}>
            退出登录
          </Button>
        </div>

        <div style={{ marginTop: '32px', textAlign: 'center', color: '#999', fontSize: '12px' }}>
          <p>智能 CRM 演示系统 v1.0.0</p>
          <p>© 2026 Demo</p>
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { TabBar } from 'antd-mobile';
import apiClient from '@/utils/request';
import { storage } from '@/utils/storage';

export default function Home() {
  const navigate = useNavigate();
  const [activeKey, setActiveKey] = useState('customers');

  useEffect(() => {
    // 检查登录状态
    const token = storage.get('accessToken');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div style={{ minHeight: '100vh', paddingBottom: '60px' }}>
      <Outlet />
      
      <TabBar
        activeKey={activeKey}
        onChange={setActiveKey}
        style={{ position: 'fixed', bottom: 0, width: '100%' }}
      >
        <TabBar.Tab key="customers" title="客户" icon="👥" onClick={() => navigate('/customers')} />
        <TabBar.Tab key="leads" title="线索" icon="📋" onClick={() => navigate('/leads')} />
        <TabBar.Tab key="funnel" title="漏斗" icon="📊" onClick={() => navigate('/funnel')} />
        <TabBar.Tab key="report" title="报表" icon="📈" onClick={() => navigate('/report')} />
        <TabBar.Tab key="mine" title="我的" icon="👤" onClick={() => navigate('/mine')} />
      </TabBar>
    </div>
  );
}

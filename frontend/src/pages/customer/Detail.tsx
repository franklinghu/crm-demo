import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { NavBar, List, Button, Empty, Tag } from 'antd-mobile';
import apiClient from '@/utils/request';

export default function CustomerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDetail();
  }, [id]);

  const loadDetail = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get(`/customers/${id}`);
      if (res.code === 0) {
        setCustomer(res.data);
      }
    } catch (error) {
      console.error('加载失败:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !customer) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <NavBar
        right={
          <Button size="small" color="primary" fill="outline" onClick={() => navigate(`/customers/${id}/edit`)}>
            编辑
          </Button>
        }
        onBack={() => navigate('/customers')}
      >
        客户详情
      </NavBar>

      <div style={{ padding: '16px' }}>
        <List>
          <List.Item>姓名</List.Item>
          <List.Item description={customer.name}>{customer.name}</List.Item>
          <List.Item>公司</List.Item>
          <List.Item description={customer.company}>{customer.company}</List.Item>
          <List.Item>职位</List.Item>
          <List.Item description={customer.position || '未填写'}>{customer.position || '未填写'}</List.Item>
          <List.Item>手机</List.Item>
          <List.Item description={customer.phone}>{customer.phone}</List.Item>
          <List.Item>客户等级</List.Item>
          <List.Item>
            <Tag color={customer.level === 'A' ? '#ff4d4f' : '#1890ff'}>{customer.level}级</Tag>
          </List.Item>
          <List.Item>状态</List.Item>
          <List.Item>
            <Tag>{customer.status}</Tag>
          </List.Item>
          {customer.budget && (
            <>
              <List.Item>预算</List.Item>
              <List.Item description={`¥${(customer.budget / 10000).toFixed(2)}万`}>
                ¥{(customer.budget / 10000).toFixed(2)}万
              </List.Item>
            </>
          )}
        </List>

        <div style={{ marginTop: '16px' }}>
          <h3 style={{ marginBottom: '12px' }}>跟进记录</h3>
          {customer.followups && customer.followups.length > 0 ? (
            <List>
              {customer.followups.map((f: any) => (
                <List.Item key={f.id} description={new Date(f.createdAt).toLocaleDateString()}>
                  <div>{f.content}</div>
                </List.Item>
              ))}
            </List>
          ) : (
            <Empty description="暂无跟进记录" />
          )}
        </div>

        <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Button block color="primary" onClick={() => navigate(`/followups/add?customerId=${id}`)}>
            添加跟进
          </Button>
          <Button block color="success" onClick={() => navigate(`/leads/add?customerId=${id}`)}>
            创建线索
          </Button>
          <Button block color="primary" fill="outline">
            📞 拨打电话
          </Button>
        </div>
      </div>
    </div>
  );
}

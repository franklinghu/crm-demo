import { useState, useEffect } from 'react';
import { NavBar, List, PullToRefresh, Tag, Empty } from 'antd-mobile';
import apiClient from '@/utils/request';

export default function LeadList() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const loadLeads = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get('/leads', { params: { page: 1, pageSize: 50 } });
      if (res.code === 0) {
        setLeads(res.data.list);
      }
    } catch (error) {
      console.error('加载失败:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLeads();
  }, []);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      NEW: '#999',
      CONTACTED: '#1890ff',
      INTERESTED: '#faad14',
      NEGOTIATING: '#722ed1',
      DEAL: '#52c41a',
      LOST: '#ff4d4f',
    };
    return colors[status] || '#999';
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <NavBar>销售线索</NavBar>

      <PullToRefresh onRefresh={loadLeads}>
        <div style={{ padding: '12px' }}>
          {leads.length === 0 ? (
            <Empty description="暂无线索" />
          ) : (
            <List>
              {leads.map((lead) => (
                <List.Item
                  key={lead.id}
                  description={
                    <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                      <Tag color={getStatusColor(lead.status)}>{lead.status}</Tag>
                      {lead.amount && <Tag>💰 ¥{(lead.amount / 10000).toFixed(0)}万</Tag>}
                      {lead.probability && <Tag>{lead.probability}%</Tag>}
                    </div>
                  }
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ fontWeight: 500 }}>{lead.title}</div>
                    <div style={{ fontSize: '14px', color: '#666' }}>{lead.customer?.name}</div>
                  </div>
                </List.Item>
              ))}
            </List>
          )}
        </div>
      </PullToRefresh>
    </div>
  );
}

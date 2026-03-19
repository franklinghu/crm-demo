import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavBar, List, SearchBar, PullToRefresh, InfiniteScroll, Button, Empty, Tag } from 'antd-mobile';
import apiClient from '@/utils/request';

interface Customer {
  id: number;
  name: string;
  phone: string;
  company: string;
  level: string;
  status: string;
  budget?: number;
  nextFollowUpAt?: string;
}

export default function CustomerList() {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState('');

  const loadCustomers = async (reset = false) => {
    if (loading || (!hasMore && !reset)) return;

    setLoading(true);
    try {
      const res = await apiClient.get('/customers', {
        params: {
          page: reset ? 1 : page,
          pageSize: 20,
          keyword: keyword || undefined,
        },
      });

      if (res.code === 0) {
        setCustomers(reset ? res.data.list : [...customers, ...res.data.list]);
        setPage(reset ? 2 : page + 1);
        setHasMore(res.data.list.length === 20);
      }
    } catch (error) {
      console.error('加载失败:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCustomers(true);
  }, [keyword]);

  const handleRefresh = async () => {
    await loadCustomers(true);
  };

  const handleLoadMore = async () => {
    await loadCustomers();
  };

  const getLevelColor = (level: string) => {
    const colors: Record<string, string> = {
      A: '#ff4d4f',
      B: '#1890ff',
      C: '#52c41a',
      D: '#999999',
    };
    return colors[level] || '#999999';
  };

  const getStatusText = (status: string) => {
    const texts: Record<string, string> = {
      POTENTIAL: '潜在',
      FOLLOWING: '跟进中',
      DEAL: '已成交',
      LOST: '已流失',
    };
    return texts[status] || status;
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <NavBar
        right={
          <Button
            size="small"
            color="primary"
            fill="outline"
            onClick={() => navigate('/customers/add')}
          >
            + 添加
          </Button>
        }
      >
        客户管理
      </NavBar>

      <div style={{ padding: '12px' }}>
        <SearchBar
          placeholder="搜索客户/公司/手机"
          value={keyword}
          onChange={setKeyword}
          onSearch={setKeyword}
        />
      </div>

      <PullToRefresh onRefresh={handleRefresh}>
        <div style={{ padding: '0 12px' }}>
          {customers.length === 0 ? (
            <Empty description="暂无客户" />
          ) : (
            <List>
              {customers.map((customer) => (
                <List.Item
                  key={customer.id}
                  onClick={() => navigate(`/customers/${customer.id}`)}
                  prefix={
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '20px',
                        backgroundColor: '#1890ff',
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '18px',
                      }}
                    >
                      {customer.name[0]}
                    </div>
                  }
                  description={
                    <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                      <Tag color={getLevelColor(customer.level)}>{customer.level}级</Tag>
                      <Tag color={getLevelColor(customer.status)}>{getStatusText(customer.status)}</Tag>
                    </div>
                  }
                  clickable
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ fontWeight: 500 }}>{customer.name}</div>
                    <div style={{ fontSize: '14px', color: '#666' }}>{customer.company}</div>
                    <div style={{ fontSize: '13px', color: '#999' }}>
                      📱 {customer.phone}
                      {customer.budget && ` · 💰 ¥${(customer.budget / 10000).toFixed(0)}万`}
                    </div>
                  </div>
                </List.Item>
              ))}
            </List>
          )}

          {hasMore && (
            <InfiniteScroll loadMore={handleLoadMore} threshold={100}>
              {loading && <div style={{ textAlign: 'center', padding: '16px', color: '#999' }}>加载中...</div>}
            </InfiniteScroll>
          )}

          {!hasMore && customers.length > 0 && (
            <div style={{ textAlign: 'center', padding: '16px', color: '#999' }}>没有更多了</div>
          )}
        </div>
      </PullToRefresh>
    </div>
  );
}

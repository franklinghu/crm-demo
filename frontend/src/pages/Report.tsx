import { NavBar, Card } from 'antd-mobile';

export default function Report() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <NavBar>业绩报表</NavBar>

      <div style={{ padding: '16px' }}>
        <Card title="本月业绩概览" style={{ marginBottom: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1890ff' }}>150</div>
              <div style={{ fontSize: '14px', color: '#999' }}>客户数</div>
            </div>
            <div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#52c41a' }}>50</div>
              <div style={{ fontSize: '14px', color: '#999' }}>线索数</div>
            </div>
            <div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#faad14' }}>10</div>
              <div style={{ fontSize: '14px', color: '#999' }}>成交数</div>
            </div>
            <div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#722ed1' }}>15 万</div>
              <div style={{ fontSize: '14px', color: '#999' }}>业绩</div>
            </div>
          </div>
        </Card>

        <Card title="转化率">
          <div style={{ textAlign: 'center', padding: '24px' }}>
            <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#1890ff' }}>20%</div>
            <div style={{ fontSize: '14px', color: '#999', marginTop: '8px' }}>线索 → 成交</div>
          </div>
        </Card>
      </div>
    </div>
  );
}

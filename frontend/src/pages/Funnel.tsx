import { NavBar } from 'antd-mobile';

export default function Funnel() {
  const funnelData = [
    { status: '新建', count: 20, amount: 100 },
    { status: '已联系', count: 15, amount: 80 },
    { status: '意向中', count: 10, amount: 60 },
    { status: '谈判中', count: 5, amount: 40 },
    { status: '已成交', count: 3, amount: 30 },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <NavBar>销售漏斗</NavBar>

      <div style={{ padding: '16px' }}>
        <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '16px' }}>
          {funnelData.map((item, index) => (
            <div key={item.status} style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span>{item.status}</span>
                <span>
                  {item.count}条 · ¥{item.amount}万
                </span>
              </div>
              <div
                style={{
                  height: '24px',
                  backgroundColor: `rgba(24, 144, 255, ${1 - index * 0.15})`,
                  borderRadius: '12px',
                  width: `${(item.count / 20) * 100}%`,
                  transition: 'width 0.3s',
                }}
              />
            </div>
          ))}
        </div>

        <div style={{ marginTop: '24px', textAlign: 'center', color: '#999' }}>
          <p>总计：53 条线索</p>
          <p>总金额：310 万元</p>
          <p>转化率：15%</p>
        </div>
      </div>
    </div>
  );
}

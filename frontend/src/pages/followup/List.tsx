import { NavBar, List } from 'antd-mobile';

export default function FollowupList() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <NavBar>跟进记录</NavBar>
      <List>
        <List.Item>暂无跟进记录</List.Item>
      </List>
    </div>
  );
}

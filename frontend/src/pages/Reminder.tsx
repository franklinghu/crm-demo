import { NavBar, List } from 'antd-mobile';

export default function Reminder() {
  const reminders = [
    { id: 1, title: '该联系张总了', content: '上次沟通是 7 天前', scheduledAt: '2026-03-22 10:00' },
    { id: 2, title: '发送报价给李经理', content: 'YY 集团', scheduledAt: '2026-03-21 14:00' },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <NavBar>提醒中心</NavBar>

      <div style={{ padding: '12px' }}>
        <List>
          {reminders.map((reminder) => (
            <List.Item
              key={reminder.id}
              description={
                <div>
                  <div style={{ fontSize: '14px', color: '#666' }}>{reminder.content}</div>
                  <div style={{ fontSize: '13px', color: '#999', marginTop: '4px' }}>
                    📅 {reminder.scheduledAt}
                  </div>
                </div>
              }
              clickable
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ fontWeight: 500 }}>⏰ {reminder.title}</div>
              </div>
            </List.Item>
          ))}
        </List>
      </div>
    </div>
  );
}

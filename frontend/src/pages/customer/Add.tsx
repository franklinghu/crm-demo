import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavBar, Form, Input, Button, Selector, TextArea, Picker } from 'antd-mobile';
import apiClient from '@/utils/request';

export default function CustomerAdd() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const res = await apiClient.post('/customers', {
        ...values,
        budget: values.budget ? parseFloat(values.budget) * 10000 : undefined,
      });
      if (res.code === 0) {
        alert('创建成功');
        navigate(`/customers/${res.data.id}`);
      }
    } catch (error: any) {
      alert(error.response?.data?.message || '创建失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <NavBar onBack={() => navigate('/customers')}>添加客户</NavBar>

      <div style={{ padding: '16px' }}>
        <Form
          onFinish={onFinish}
          footer={
            <Button block type="submit" color="primary" loading={loading} size="large">
              保存
            </Button>
          }
        >
          <Form.Item
            name="name"
            label="客户姓名"
            rules={[{ required: true, message: '请输入客户姓名' }]}
          >
            <Input placeholder="请输入客户姓名" />
          </Form.Item>

          <Form.Item
            name="phone"
            label="手机号"
            rules={[
              { required: true, message: '请输入手机号' },
              { pattern: /^1\d{10}$/, message: '手机号格式不正确' },
            ]}
          >
            <Input placeholder="请输入手机号" />
          </Form.Item>

          <Form.Item
            name="company"
            label="公司名称"
            rules={[{ required: true, message: '请输入公司名称' }]}
          >
            <Input placeholder="请输入公司名称" />
          </Form.Item>

          <Form.Item name="position" label="职位">
            <Input placeholder="请输入职位" />
          </Form.Item>

          <Form.Item name="level" label="客户等级" initialValue="B">
            <Selector
              options={[
                { label: 'A 级（高意向）', value: 'A' },
                { label: 'B 级（中意向）', value: 'B' },
                { label: 'C 级（低意向）', value: 'C' },
                { label: 'D 级（无效）', value: 'D' },
              ]}
            />
          </Form.Item>

          <Form.Item name="budget" label="预算（万元）">
            <Input type="number" placeholder="请输入预算" />
          </Form.Item>

          <Form.Item name="remark" label="备注">
            <TextArea placeholder="请输入备注" rows={3} />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

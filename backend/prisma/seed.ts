import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 开始种子数据...');

  // 创建演示用户
  const hashedPassword = await bcrypt.hash('demo123', 10);

  const users = await Promise.all([
    prisma.user.upsert({
      where: { email: 'sales@demo.com' },
      update: {},
      create: {
        email: 'sales@demo.com',
        password: hashedPassword,
        name: '李销售',
        phone: '13800138000',
        role: 'SALES',
      },
    }),
    prisma.user.upsert({
      where: { email: 'manager@demo.com' },
      update: {},
      create: {
        email: 'manager@demo.com',
        password: hashedPassword,
        name: '王主管',
        phone: '13800138001',
        role: 'MANAGER',
      },
    }),
    prisma.user.upsert({
      where: { email: 'operation@demo.com' },
      update: {},
      create: {
        email: 'operation@demo.com',
        password: hashedPassword,
        name: '张运营',
        phone: '13800138002',
        role: 'OPERATION',
      },
    }),
  ]);

  console.log('✅ 创建用户:', users.length);

  // 创建演示客户
  const salesUser = users[0];
  const customers = await Promise.all([
    prisma.customer.create({
      data: {
        ownerId: salesUser.id,
        name: '张总',
        phone: '13900139000',
        company: 'XX 科技有限公司',
        position: '总经理',
        level: 'A',
        status: 'FOLLOWING',
        budget: 500000,
        interestedProducts: ['产品 A', '产品 B'],
        nextFollowUpAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 天后
      },
    }),
    prisma.customer.create({
      data: {
        ownerId: salesUser.id,
        name: '李经理',
        phone: '13900139001',
        company: 'YY 集团',
        position: '采购经理',
        level: 'A',
        status: 'FOLLOWING',
        budget: 1000000,
        interestedProducts: ['产品 A'],
        nextFollowUpAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 天后
      },
    }),
    prisma.customer.create({
      data: {
        ownerId: salesUser.id,
        name: '王总',
        phone: '13900139002',
        company: 'ZZ 公司',
        position: 'CEO',
        level: 'B',
        status: 'POTENTIAL',
        budget: 300000,
        nextFollowUpAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 天后
      },
    }),
  ]);

  console.log('✅ 创建客户:', customers.length);

  // 创建演示线索
  const leads = await Promise.all([
    prisma.lead.create({
      data: {
        customerId: customers[0].id,
        ownerId: salesUser.id,
        title: 'XX 公司 - 产品 A 采购',
        status: 'INTERESTED',
        amount: 500000,
        probability: 60,
        expectedCloseDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
    }),
    prisma.lead.create({
      data: {
        customerId: customers[1].id,
        ownerId: salesUser.id,
        title: 'YY 集团 - 系统升级',
        status: 'NEGOTIATING',
        amount: 1000000,
        probability: 80,
        expectedCloseDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      },
    }),
  ]);

  console.log('✅ 创建线索:', leads.length);

  // 创建演示跟进记录
  const followups = await Promise.all([
    prisma.followup.create({
      data: {
        customerId: customers[0].id,
        userId: salesUser.id,
        type: 'CALL',
        content: '与客户沟通产品 A 的详细需求，客户对价格比较敏感',
        nextFollowUpAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      },
    }),
    prisma.followup.create({
      data: {
        customerId: customers[1].id,
        userId: salesUser.id,
        type: 'MEETING',
        content: '面谈，参观客户公司，了解具体业务场景',
        nextFollowUpAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      },
    }),
  ]);

  console.log('✅ 创建跟进记录:', followups.length);

  // 创建演示提醒
  const reminders = await Promise.all([
    prisma.reminder.create({
      data: {
        customerId: customers[0].id,
        userId: salesUser.id,
        type: 'FOLLOW_UP',
        title: '跟进提醒',
        content: '该联系张总了，上次沟通是 7 天前',
        scheduledAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        status: 'PENDING',
      },
    }),
    prisma.reminder.create({
      data: {
        customerId: customers[1].id,
        userId: salesUser.id,
        type: 'FOLLOW_UP',
        title: '跟进提醒',
        content: '该联系李经理了，发送报价单',
        scheduledAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        status: 'PENDING',
      },
    }),
  ]);

  console.log('✅ 创建提醒:', reminders.length);

  console.log('🎉 种子数据完成！');
}

main()
  .catch((e) => {
    console.error('❌ 种子数据失败:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

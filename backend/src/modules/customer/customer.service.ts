import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';

@Injectable()
export class CustomerService {
  constructor(private readonly prisma: PrismaService) {}

  async getList(user: any, filters: any) {
    const { page = 1, pageSize = 20, keyword, level, status } = filters;

    const where: any = { deletedAt: null };

    // 角色数据权限
    if (user.role === 'SALES') {
      where.ownerId = user.sub;
    }

    // 筛选条件
    if (keyword) {
      where.OR = [
        { name: { contains: keyword } },
        { phone: { contains: keyword } },
        { company: { contains: keyword } },
      ];
    }
    if (level) {
      where.level = level;
    }
    if (status) {
      where.status = status;
    }

    const [list, total] = await Promise.all([
      this.prisma.customer.findMany({
        where,
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
        include: { owner: { select: { id: true, name: true } } },
      }),
      this.prisma.customer.count({ where }),
    ]);

    return {
      list,
      pagination: {
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      },
    };
  }

  async getDetail(user: any, id: number) {
    const customer = await this.prisma.customer.findUnique({
      where: { id, deletedAt: null },
      include: {
        owner: { select: { id: true, name: true } },
        followups: {
          take: 10,
          orderBy: { createdAt: 'desc' },
          include: { user: { select: { id: true, name: true } } },
        },
        leads: { take: 10 },
      },
    });

    if (!customer) {
      throw new NotFoundException('客户不存在');
    }

    this.checkPermission(user, customer);
    return customer;
  }

  async create(user: any, dto: any) {
    return this.prisma.customer.create({
      data: {
        ...dto,
        ownerId: user.sub,
      },
    });
  }

  async parseVoice(audioUrl: string) {
    // 演示版本：模拟 AI 解析
    // 实际项目中调用语音识别 + NLP API
    return {
      parsed: {
        name: '张总',
        company: 'XX 科技有限公司',
        interestedProducts: ['产品 A'],
        budget: 500000,
      },
      transcript: '刚和张总通了电话，他对产品 A 感兴趣，预算 50 万',
      confidence: 0.95,
    };
  }

  async update(user: any, id: number, dto: any) {
    const customer = await this.prisma.customer.findUnique({ where: { id } });
    if (!customer) {
      throw new NotFoundException('客户不存在');
    }

    this.checkPermission(user, customer);

    return this.prisma.customer.update({
      where: { id },
      data: dto,
    });
  }

  async delete(user: any, id: number) {
    const customer = await this.prisma.customer.findUnique({ where: { id } });
    if (!customer) {
      throw new NotFoundException('客户不存在');
    }

    this.checkPermission(user, customer);

    await this.prisma.customer.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  private checkPermission(user: any, customer: any) {
    if (user.role === 'SALES' && customer.ownerId !== user.sub) {
      throw new ForbiddenException('无权访问此客户');
    }
  }
}

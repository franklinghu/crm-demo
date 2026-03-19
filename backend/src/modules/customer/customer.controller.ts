import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller('customers')
@UseGuards(JwtAuthGuard)
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  async getList(
    @CurrentUser() user: any,
    @Query('page', new ParseIntPipe({ optional: true })) page = 1,
    @Query('pageSize', new ParseIntPipe({ optional: true })) pageSize = 20,
    @Query('keyword') keyword?: string,
    @Query('level') level?: string,
    @Query('status') status?: string,
  ) {
    const result = await this.customerService.getList(user, {
      page,
      pageSize,
      keyword,
      level,
      status,
    });

    return {
      code: 0,
      data: result,
      timestamp: Date.now(),
    };
  }

  @Get(':id')
  async getDetail(
    @CurrentUser() user: any,
    @Param('id', new ParseIntPipe()) id: number,
  ) {
    const customer = await this.customerService.getDetail(user, id);
    return {
      code: 0,
      data: customer,
      timestamp: Date.now(),
    };
  }

  @Post()
  async create(
    @CurrentUser() user: any,
    @Body() dto: any,
  ) {
    const customer = await this.customerService.create(user, dto);
    return {
      code: 0,
      data: customer,
      timestamp: Date.now(),
    };
  }

  @Post('voice')
  async parseVoice(@Body('audioUrl') audioUrl: string) {
    const result = await this.customerService.parseVoice(audioUrl);
    return {
      code: 0,
      data: result,
      timestamp: Date.now(),
    };
  }

  @Put(':id')
  async update(
    @CurrentUser() user: any,
    @Param('id', new ParseIntPipe()) id: number,
    @Body() dto: any,
  ) {
    const customer = await this.customerService.update(user, id, dto);
    return {
      code: 0,
      data: customer,
      timestamp: Date.now(),
    };
  }

  @Delete(':id')
  async delete(
    @CurrentUser() user: any,
    @Param('id', new ParseIntPipe()) id: number,
  ) {
    await this.customerService.delete(user, id);
    return {
      code: 0,
      message: '删除成功',
      timestamp: Date.now(),
    };
  }
}

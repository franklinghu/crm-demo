import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { CustomerModule } from './modules/customer/customer.module';
import { LeadModule } from './modules/lead/lead.module';
import { FollowupModule } from './modules/followup/followup.module';
import { ReportModule } from './modules/report/report.module';
import { ReminderModule } from './modules/reminder/reminder.module';
import { PrismaService } from './common/prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AuthModule,
    UserModule,
    CustomerModule,
    LeadModule,
    FollowupModule,
    ReportModule,
    ReminderModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}

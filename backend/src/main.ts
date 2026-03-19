import { NestFactory } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from './common/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // 启用 CORS
  app.enableCors({
    origin: [
      'http://localhost:5173',
      'https://crm-demo.vercel.app',
      /\.vercel\.app$/,
    ],
    credentials: true,
  });

  // 全局验证管道
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // 全局前缀
  app.setGlobalPrefix('api/v1');

  const port = configService.get('PORT', 3000);
  await app.listen(port);
  console.log(`🚀 Application is running on: http://localhost:${port}`);
}

bootstrap();

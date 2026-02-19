import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const config = new DocumentBuilder()
    .setTitle('Tasks API')
    .setDescription('Tasks API for NestJS Foundation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      // whitelist: true, // Remove propriedades que não estão no DTO
      // forbidNonWhitelisted: true, // Lança erro se enviarem campos extras
      transform: true, // Converte tipos automaticamente (ex: string id para number)
    }),
  );

  const swaggerDocument = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('swagger', app, swaggerDocument);
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();

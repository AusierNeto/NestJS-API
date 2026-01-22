import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const config = new DocumentBuilder().setTitle('Tasks API').build();
  const app = await NestFactory.create(AppModule);
  const swaggerDocument = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('swagger', app, swaggerDocument);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

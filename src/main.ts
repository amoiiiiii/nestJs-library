import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { existsSync, mkdirSync } from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Cek dan buat folder `uploads` jika belum ada
  if (!existsSync('./uploads')) {
    mkdirSync('./uploads');
  }

  // Konfigurasi Swagger
  const config = new DocumentBuilder()
    .setTitle('Book API')
    .setDescription('API documentation for book management with file upload support')
    .setVersion('1.0')
    .addBearerAuth() // Menambahkan dukungan otentikasi JWT
    .addTag('Books')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  await app.listen(5000);
}

bootstrap();

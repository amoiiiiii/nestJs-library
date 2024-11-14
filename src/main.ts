import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import fastifyMultipart from '@fastify/multipart';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  // Register multipart form-data support in Fastify
  await app.register(fastifyMultipart as any);

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Book API')
    .setDescription(
      'API documentation for book management with file upload support',
    )
    .setVersion('1.0')
    .addBearerAuth() // Add JWT authentication support
    .addTag('Books')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  await app.listen(5000);
}

bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Middleware cookie parser
  app.use(cookieParser());

  // Enable CORS untuk frontend (Next.js)
  app.enableCors({
    origin: 'http://localhost:3000', // Ganti dengan URL frontend sesuai env
    credentials: true,
  });

  // Validasi input
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // Swagger config
  const config = new DocumentBuilder()
    .setTitle('First Project API')
    .setDescription('API documentation for the first project')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Listen port
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();

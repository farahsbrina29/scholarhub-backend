// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// src/main.ts
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3000', // ganti sesuai asal frontend kamu
  });

  await app.listen(3001);
}
bootstrap();


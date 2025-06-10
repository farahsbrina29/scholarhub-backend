import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS untuk frontend Next.js
  app.enableCors({
    origin: 'http://localhost:3000', // URL frontend Next.js
    credentials: true,
  });
  
  await app.listen(3001); // Port berbeda dari Next.js
}
bootstrap();
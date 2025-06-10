// src/app.module.ts
import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ScholarModule } from './scholar/scholar.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    PrismaModule,
    ScholarModule,
    UserModule,    // Pastikan UserModule diimpor
    AuthModule,    // Pastikan AuthModule diimpor
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {
    console.log('📦 AppModule initialized with modules:', {
      PrismaModule: 'loaded',
      ScholarModule: 'loaded', 
      UserModule: 'loaded',
      AuthModule: 'loaded'
    });
  }
}
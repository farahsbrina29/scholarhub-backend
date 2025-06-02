import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ScholarModule } from './scholar/scholar.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    PrismaModule, // Simple import, no configuration needed here
    ScholarModule, UserModule, AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
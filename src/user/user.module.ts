import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from '../prisma/prisma.module'; // Tambahkan import ini

@Module({
  imports: [PrismaModule], // Tambahkan PrismaModule di imports
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
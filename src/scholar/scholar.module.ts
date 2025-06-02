// backend/src/scholars/scholars.module.ts
import { Module } from '@nestjs/common';
import { ScholarService } from './scholar.service';
import { ScholarController } from './scholar.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ScholarController],
  providers: [ScholarService],
})
export class ScholarModule {}

import { Module } from '@nestjs/common';
import { ScholarRegistService } from './scholar-regist.service';
import { ScholarRegistController } from './scholar-regist.controller';

@Module({
  providers: [ScholarRegistService],
  controllers: [ScholarRegistController]
})
export class ScholarRegistModule {}

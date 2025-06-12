import { Test, TestingModule } from '@nestjs/testing';
import { ScholarRegistService } from './scholar-regist.service';

describe('PendaftaranBeasiswaService', () => {
  let service: ScholarRegistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScholarRegistService],
    }).compile();

    service = module.get<ScholarRegistService>(ScholarRegistService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

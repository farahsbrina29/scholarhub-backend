import { Test, TestingModule } from '@nestjs/testing';
import { ScholarService } from './scholar.service';

describe('ScholarService', () => {
  let service: ScholarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScholarService],
    }).compile();

    service = module.get<ScholarService>(ScholarService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

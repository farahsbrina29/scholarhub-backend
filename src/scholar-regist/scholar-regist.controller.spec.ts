import { Test, TestingModule } from '@nestjs/testing';
import { ScholarRegistController } from './scholar-regist.controller';

describe('ScholarRegistController', () => {
  let controller: ScholarRegistController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScholarRegistController],
    }).compile();

    controller = module.get<ScholarRegistController>(ScholarRegistController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

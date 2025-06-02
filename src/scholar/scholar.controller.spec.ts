import { Test, TestingModule } from '@nestjs/testing';
import { ScholarController } from './scholar.controller';

describe('ScholarController', () => {
  let controller: ScholarController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScholarController],
    }).compile();

    controller = module.get<ScholarController>(ScholarController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

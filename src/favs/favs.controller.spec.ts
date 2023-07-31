import { Test, TestingModule } from '@nestjs/testing';
import { FavsController } from './favs.controller';

describe('FavsController', () => {
  let controller: FavsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FavsController],
    }).compile();

    controller = module.get<FavsController>(FavsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

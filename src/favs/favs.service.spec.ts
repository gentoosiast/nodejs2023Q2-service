import { Test, TestingModule } from '@nestjs/testing';
import { FavsService } from './favs.service';

describe('FavsService', () => {
  let service: FavsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FavsService],
    }).compile();

    service = module.get<FavsService>(FavsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

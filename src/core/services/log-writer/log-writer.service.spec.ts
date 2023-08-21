import { Test, TestingModule } from '@nestjs/testing';
import { LogWriterService } from './log-writer.service';

describe('LogWriterService', () => {
  let service: LogWriterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LogWriterService],
    }).compile();

    service = module.get<LogWriterService>(LogWriterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

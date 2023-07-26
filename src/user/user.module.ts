import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UUIDService } from '@shared/services/uuid.service';
import { InMemoryDbService } from '@shared/services/storage.service';

@Module({
  controllers: [UserController],
  providers: [InMemoryDbService, UserService, UUIDService],
})
export class UserModule {}

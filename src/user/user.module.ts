import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UUIDService } from '@shared/services/uuid.service';

@Module({
  controllers: [UserController],
  providers: [UserService, UUIDService],
})
export class UserModule {}

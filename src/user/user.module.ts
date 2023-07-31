import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { SharedModule } from '@shared/shared.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [SharedModule],
})
export class UserModule {}

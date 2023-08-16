import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { SharedModule } from '@shared/shared.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [ConfigModule, SharedModule],
  exports: [UserService],
})
export class UserModule {}

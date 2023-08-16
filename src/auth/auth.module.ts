import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '@user/user.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [ConfigModule, UserModule],
})
export class AuthModule {}

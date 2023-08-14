import { Exclude, Transform } from 'class-transformer';
import { User } from '../interfaces/user.interface';

export class UserEntity implements User {
  id: string;

  login: string;

  @Exclude()
  password: string;

  version: number;

  @Transform(({ value }) => new Date(value).getTime())
  createdAt: number;

  @Transform(({ value }) => new Date(value).getTime())
  updatedAt: number;
}

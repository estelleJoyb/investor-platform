import { UserRole } from '../entities/user.entity';
import { IsOptional, IsEmail, IsEnum, MinLength } from 'class-validator';

export class CreateUserDto {

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;

  firstName: string;
  lastName: string;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}
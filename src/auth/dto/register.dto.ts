import { IsEmail, IsString, MinLength, IsOptional, IsEnum } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsEnum(['USER', 'ADMIN'], { message: 'Role must be either USER or ADMIN' })
  role?: 'USER' | 'ADMIN' = 'USER';

}
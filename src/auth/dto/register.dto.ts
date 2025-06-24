import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, IsOptional, IsEnum } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    description: 'Email pengguna untuk registrasi',
    type: 'string',
    example: 'user@example.com',
  })
  @IsEmail({}, { message: 'Email tidak valid.' })
  email: string;

  @ApiProperty({
    description: 'Kata sandi minimal 6 karakter',
    type: 'string',
    example: 'securePass123',
  })
  @IsString({ message: 'Password harus berupa string.' })
  @MinLength(6, { message: 'Password minimal 6 karakter.' })
  password: string;

  @ApiProperty({
    description: 'Nama lengkap pengguna',
    type: 'string',
    example: 'Farah Sabrina',
  })
  @IsString({ message: 'Nama harus berupa string.' })
  name: string;

  @ApiPropertyOptional({
    description: 'Peran pengguna (default: USER)',
    enum: ['USER', 'ADMIN'],
    example: 'USER',
  })
  @IsOptional()
  @IsEnum(['USER', 'ADMIN'], {
    message: 'Role harus USER atau ADMIN.',
  })
  role?: 'USER' | 'ADMIN' = 'USER';
}

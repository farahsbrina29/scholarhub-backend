import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsEmail, MinLength, IsEnum } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiPropertyOptional({
    description: 'Nama baru pengguna',
    type: 'string',
    example: 'Farah Sabrina',
  })
  @IsOptional()
  @IsString({ message: 'Nama harus berupa string.' })
  name?: string;

  @ApiPropertyOptional({
    description: 'Email baru pengguna',
    type: 'string',
    example: 'farah.new@example.com',
  })
  @IsOptional()
  @IsEmail({}, { message: 'Email tidak valid.' })
  email?: string;

  @ApiPropertyOptional({
    description: 'Password baru pengguna (minimal 6 karakter)',
    type: 'string',
    example: 'newPass123',
  })
  @IsOptional()
  @IsString({ message: 'Password harus berupa string.' })
  @MinLength(6, { message: 'Password minimal 6 karakter.' })
  password?: string;

  @ApiPropertyOptional({
    description: 'Peran baru pengguna (USER atau ADMIN)',
    enum: ['USER', 'ADMIN'],
    example: 'ADMIN',
  })
  @IsOptional()
  @IsEnum(['USER', 'ADMIN'], {
    message: 'Role harus bernilai USER atau ADMIN.',
  })
  role?: 'USER' | 'ADMIN';
}

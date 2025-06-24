import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'Email pengguna untuk login',
    type: 'string',
    example: 'user@example.com',
  })
  @IsEmail({}, { message: 'Email tidak valid.' })
  email: string;

  @ApiProperty({
    description: 'Kata sandi pengguna',
    type: 'string',
    example: 'securePassword123',
  })
  @IsString({ message: 'Password harus berupa string.' })
  password: string;
}

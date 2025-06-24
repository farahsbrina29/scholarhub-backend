import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDateString } from 'class-validator';

export class CreateWorkshopDto {
  @ApiProperty({
    description: 'Nama workshop',
    type: 'string',
    example: 'Workshop NestJS Dasar',
  })
  @IsString({ message: 'Nama workshop harus berupa string.' })
  nameWorkshop: string;

  @ApiProperty({
    description: 'Deskripsi workshop',
    type: 'string',
    example: 'Pelatihan dasar NestJS untuk pemula.',
  })
  @IsString({ message: 'Deskripsi harus berupa string.' })
  description: string;

  @ApiProperty({
    description: 'Tanggal workshop dalam format ISO (YYYY-MM-DD)',
    type: 'string',
    format: 'date-time',
    example: '2025-07-01T10:00:00Z',
  })
  @IsDateString({}, { message: 'Tanggal harus berupa format tanggal yang valid (ISO 8601).' })
  date: string;

  @ApiProperty({
    description: 'Link untuk mengikuti workshop',
    type: 'string',
    example: 'https://zoom.us/j/1234567890',
  })
  @IsString({ message: 'Link workshop harus berupa string.' })
  linkWorkshop: string;
}

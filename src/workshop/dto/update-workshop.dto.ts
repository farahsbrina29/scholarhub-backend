import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsDateString, IsOptional } from 'class-validator';

export class UpdateWorkshopDto {
  @ApiPropertyOptional({
    description: 'Nama workshop (opsional)',
    type: 'string',
    example: 'Workshop NestJS Lanjutan',
  })
  @IsOptional()
  @IsString({ message: 'Nama workshop harus berupa string.' })
  nameWorkshop?: string;

  @ApiPropertyOptional({
    description: 'Deskripsi workshop (opsional)',
    type: 'string',
    example: 'Workshop lanjutan untuk developer yang sudah memahami dasar-dasar NestJS.',
  })
  @IsOptional()
  @IsString({ message: 'Deskripsi harus berupa string.' })
  description?: string;

  @ApiPropertyOptional({
    description: 'Tanggal workshop (opsional), format ISO (YYYY-MM-DD)',
    type: 'string',
    format: 'date-time',
    example: '2025-08-15T14:00:00Z',
  })
  @IsOptional()
  @IsDateString({}, { message: 'Tanggal harus dalam format tanggal ISO 8601 yang valid.' })
  date?: string;

  @ApiPropertyOptional({
    description: 'Link untuk mengikuti workshop (opsional)',
    type: 'string',
    example: 'https://zoom.us/j/9876543210',
  })
  @IsOptional()
  @IsString({ message: 'Link workshop harus berupa string.' })
  linkWorkshop?: string;
}

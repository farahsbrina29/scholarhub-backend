import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsDateString, IsOptional } from 'class-validator';

export class UpdateScholarDto {
  @ApiPropertyOptional({
    description: 'Nama program beasiswa',
    type: 'string',
    example: 'Beasiswa Unggulan Kemendikbud',
  })
  @IsOptional()
  @IsString({ message: 'Nama beasiswa harus berupa string.' })
  scholarName?: string;

  @ApiPropertyOptional({
    description: 'Kategori beasiswa (misal: akademik, non-akademik)',
    type: 'string',
    example: 'Akademik',
  })
  @IsOptional()
  @IsString({ message: 'Kategori harus berupa string.' })
  category?: string;

  @ApiPropertyOptional({
    description: 'Deskripsi lengkap beasiswa',
    type: 'string',
    example: 'Beasiswa untuk mahasiswa berprestasi nasional.',
  })
  @IsOptional()
  @IsString({ message: 'Deskripsi harus berupa string.' })
  description?: string;

  @ApiPropertyOptional({
    description: 'Syarat beasiswa',
    type: 'string',
    example: 'IPK minimal 3.5, sertifikat lomba, surat rekomendasi.',
  })
  @IsOptional()
  @IsString({ message: 'Syarat beasiswa harus berupa string.' })
  scholarRequirement?: string;

  @ApiPropertyOptional({
    description: 'Kontak penyelenggara',
    type: 'string',
    example: 'beasiswa@example.com / 08123456789',
  })
  @IsOptional()
  @IsString({ message: 'Kontak harus berupa string.' })
  contact?: string;

  @ApiPropertyOptional({
    description: 'Tanggal mulai pendaftaran (format ISO)',
    type: 'string',
    format: 'date-time',
    example: '2025-07-01T00:00:00Z',
  })
  @IsOptional()
  @IsDateString({}, { message: 'Tanggal mulai harus format ISO 8601.' })
  startDate?: string;

  @ApiPropertyOptional({
    description: 'Tanggal akhir pendaftaran (format ISO)',
    type: 'string',
    format: 'date-time',
    example: '2025-07-31T23:59:59Z',
  })
  @IsOptional()
  @IsDateString({}, { message: 'Tanggal akhir harus format ISO 8601.' })
  endDate?: string;
}

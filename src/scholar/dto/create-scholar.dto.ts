import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDateString } from 'class-validator';

export class CreateScholarDto {
  @ApiProperty({
    description: 'Nama program beasiswa',
    type: 'string',
    example: 'Beasiswa Unggulan Kemendikbud',
  })
  @IsString({ message: 'Nama beasiswa harus berupa string.' })
  scholarName: string;

  @ApiProperty({
    description: 'Kategori beasiswa (misal: prestasi, penelitian, dll)',
    type: 'string',
    example: 'Akademik',
  })
  @IsString({ message: 'Kategori harus berupa string.' })
  category: string;

  @ApiProperty({
    description: 'Deskripsi lengkap beasiswa',
    type: 'string',
    example: 'Beasiswa untuk mahasiswa berprestasi di seluruh Indonesia.',
  })
  @IsString({ message: 'Deskripsi harus berupa string.' })
  description: string;

  @ApiProperty({
    description: 'Syarat-syarat beasiswa',
    type: 'string',
    example: 'IPK minimal 3.5, sertifikat lomba, surat rekomendasi.',
  })
  @IsString({ message: 'Syarat beasiswa harus berupa string.' })
  scholarRequirement: string;

  @ApiProperty({
    description: 'Kontak yang bisa dihubungi',
    type: 'string',
    example: 'beasiswa@example.com / 08123456789',
  })
  @IsString({ message: 'Kontak harus berupa string.' })
  contact: string;

  @ApiProperty({
    description: 'Tanggal mulai pendaftaran (format ISO)',
    type: 'string',
    format: 'date-time',
    example: '2025-07-01T00:00:00Z',
  })
  @IsDateString({}, { message: 'Tanggal mulai harus format ISO 8601.' })
  startDate: string;

  @ApiProperty({
    description: 'Tanggal akhir pendaftaran (format ISO)',
    type: 'string',
    format: 'date-time',
    example: '2025-07-31T23:59:59Z',
  })
  @IsDateString({}, { message: 'Tanggal akhir harus format ISO 8601.' })
  endDate: string;
}

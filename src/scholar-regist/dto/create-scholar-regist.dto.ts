import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsInt,
  IsOptional,
} from 'class-validator';

export class CreateScholarRegistDto {
  @ApiProperty({
    description: 'Nama lengkap mahasiswa',
    type: 'string',
    example: 'Farah Sabrina',
  })
  @IsString({ message: 'Nama harus berupa string.' })
  name: string;

  @ApiProperty({
    description: 'Nomor Induk Mahasiswa',
    type: 'string',
    example: '2201010101',
  })
  @IsString({ message: 'NIM harus berupa string.' })
  studentId: string;

  @ApiProperty({
    description: 'Email mahasiswa',
    type: 'string',
    example: 'farah@student.univ.ac.id',
  })
  @IsEmail({}, { message: 'Email tidak valid.' })
  email: string;

  @ApiProperty({
    description: 'Program studi mahasiswa',
    type: 'string',
    example: 'Teknik Informatika',
  })
  @IsString({ message: 'Program studi harus berupa string.' })
  studyProgram: string;

  @ApiProperty({
    description: 'Semester mahasiswa saat ini',
    type: 'integer',
    example: 5,
  })
  @IsInt({ message: 'Semester harus berupa angka bulat.' })
  semester: number;

  @ApiPropertyOptional({
    description: 'Catatan tambahan (opsional)',
    type: 'string',
    example: 'Sudah mengikuti seminar beasiswa sebelumnya.',
  })
  @IsOptional()
  @IsString({ message: 'Catatan harus berupa string.' })
  note?: string;

  @ApiProperty({
    description: 'ID beasiswa yang dipilih',
    type: 'integer',
    example: 3,
  })
  @IsInt({ message: 'scholarId harus berupa angka.' })
  scholarId: number;

  @ApiProperty({
    description: 'ID user yang mendaftar',
    type: 'integer',
    example: 7,
  })
  @IsInt({ message: 'userId harus berupa angka.' })
  userId: number;
}

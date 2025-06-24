import {
  IsString,
  IsEmail,
  IsInt,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export enum ScholarStatus {
  WAITING_FOR_RESULT = 'waiting_for_result',
  REJECTED = 'rejected',
  ACCEPTED = 'accepted',
}

export class UpdateScholarRegistDto {
  @ApiPropertyOptional({
    description: 'Nama lengkap mahasiswa',
    type: 'string',
    example: 'Farah Sabrina',
  })
  @IsOptional()
  @IsString({ message: 'Nama harus berupa string.' })
  name?: string;

  @ApiPropertyOptional({
    description: 'Nomor Induk Mahasiswa',
    type: 'string',
    example: '2201010101',
  })
  @IsOptional()
  @IsString({ message: 'NIM harus berupa string.' })
  studentId?: string;

  @ApiPropertyOptional({
    description: 'Email mahasiswa',
    type: 'string',
    example: 'farah@student.univ.ac.id',
  })
  @IsOptional()
  @IsEmail({}, { message: 'Email tidak valid.' })
  email?: string;

  @ApiPropertyOptional({
    description: 'Program studi',
    type: 'string',
    example: 'Teknik Informatika',
  })
  @IsOptional()
  @IsString({ message: 'Program studi harus berupa string.' })
  studyProgram?: string;

  @ApiPropertyOptional({
    description: 'Semester saat ini',
    type: 'integer',
    example: 5,
  })
  @IsOptional()
  @IsInt({ message: 'Semester harus berupa angka.' })
  semester?: number;

  @ApiPropertyOptional({
    description: 'Status pendaftaran beasiswa',
    enum: ScholarStatus,
    example: ScholarStatus.WAITING_FOR_RESULT,
  })
  @IsOptional()
  @IsEnum(ScholarStatus, {
    message: 'Status harus salah satu dari: waiting_for_result, rejected, accepted.',
  })
  status?: ScholarStatus;

  @ApiPropertyOptional({
    description: 'Catatan tambahan',
    type: 'string',
    example: 'Sudah upload semua dokumen.',
  })
  @IsOptional()
  @IsString({ message: 'Catatan harus berupa string.' })
  note?: string;

  @ApiPropertyOptional({
    description: 'ID beasiswa yang dipilih',
    type: 'integer',
    example: 3,
  })
  @IsOptional()
  @IsInt({ message: 'scholarId harus berupa angka.' })
  scholarId?: number;

  @ApiPropertyOptional({
    description: 'ID user yang mendaftar',
    type: 'integer',
    example: 7,
  })
  @IsOptional()
  @IsInt({ message: 'userId harus berupa angka.' })
  userId?: number;
}

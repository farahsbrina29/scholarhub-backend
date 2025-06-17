import {
  IsString,
  IsEmail,
  IsInt,
  IsOptional,
  IsEnum,
  IsDateString,
} from 'class-validator';

export enum ScholarStatus {
  WAITING_FOR_RESULT = 'waiting_for_result',
  REJECTED = 'rejected',
  ACCEPTED = 'accepted',
}

export class UpdateScholarRegistDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  studentId?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  studyProgram?: string;

  @IsOptional()
  @IsInt()
  semester?: number;

  @IsOptional()
  @IsString()
  document?: string;

  @IsOptional()
  @IsString()
  note?: string;

  @IsOptional()
  @IsEnum(ScholarStatus)
  status?: ScholarStatus;

  @IsOptional()
  @IsDateString()
  registDate?: Date;

  @IsOptional()
  @IsInt()
  scholarId?: number;
}
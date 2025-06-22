
import {
  IsString,
  IsEmail,
  IsInt,
  IsOptional,
} from 'class-validator';

export class CreateScholarRegistDto {
  @IsString()
  name: string;

  @IsString()
  studentId: string;

  @IsEmail()
  email: string;

  @IsString()
  studyProgram: string;

  @IsInt()
  semester: number;

  @IsOptional()
  @IsString()
  note?: string;

  @IsInt()
  scholarId: number;
}

import { IsString, IsEmail, IsInt, IsDateString, IsEnum } from 'class-validator';

// Enum yang sesuai dengan Prisma dan DB
export enum ScholarStatus {
  WAITING_FOR_RESULT = 'waiting_for_result',
  REJECTED = 'rejected',
  ACCEPTED = 'accepted',
}

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

  @IsDateString()
  registDate: Date;

  @IsEnum(ScholarStatus)
  status: ScholarStatus;

  @IsString()
  note: string;

  @IsString()
  document: string;

  @IsInt()
  scholarId: number;
}

import { IsString, IsDateString } from 'class-validator';

export class CreateScholarDto {
  @IsString()
  scholarName: string;

  @IsString()
  category: string;

  @IsString()
  description: string;

  @IsString()
  scholarRequirement: string;

  @IsString()
  contact: string;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;
}

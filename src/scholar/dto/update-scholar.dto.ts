import { IsString, IsDateString, IsOptional } from 'class-validator';

export class UpdateScholarDto {
@IsOptional()
  @IsString()
  scholarName: string;

@IsOptional()
  @IsString()
  category: string;

@IsOptional()
  @IsString()
  description: string;

@IsOptional()
  @IsString()
  scholarRequirement: string;

@IsOptional()
  @IsString()
  contact: string;

@IsOptional()
  @IsDateString()
  startDate: string;
  
@IsOptional()
  @IsDateString()
  endDate: string;
}

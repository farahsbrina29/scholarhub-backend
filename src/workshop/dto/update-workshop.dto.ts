import { IsString, IsDateString, IsOptional } from 'class-validator';

export class UpdateWorkshopDto {
  @IsString()
  @IsOptional()
  nameWorkshop: string;

@IsOptional()
  @IsString()
  description: string;

@IsOptional()
  @IsDateString()
  date: string;
  
@IsOptional()
  @IsString()
  linkWorkshop: string;
}

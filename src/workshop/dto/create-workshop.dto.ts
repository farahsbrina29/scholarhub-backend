import { IsString, IsDateString } from 'class-validator';

export class CreateWorkshopDto {
  @IsString()
  nameWorkshop: string;

  @IsString()
  description: string;

  @IsDateString()
  date: string;

  @IsString()
  linkWorkshop: string;
}

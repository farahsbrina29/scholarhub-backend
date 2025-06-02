import { IsString, IsDateString } from 'class-validator';

export class CreateScholarDto {
  @IsString()
  nama_beasiswa: string;

  @IsString()
  kategori: string;

  @IsString()
  deskripsi: string;

  @IsString()
  persyaratan_beasiswa: string;

  @IsString()
  kontak: string;

  @IsDateString()
  tanggal_mulai: string;

  @IsDateString()
  tanggal_akhir: string;
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Scholar } from '@prisma/client';

@Injectable()
export class ScholarService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Scholar[]> {
    return this.prisma.scholar.findMany();
  }

  async create(scholarData: Omit<Scholar, 'id'>): Promise<Scholar> {
    return this.prisma.scholar.create({
      data: {
        nama_beasiswa: scholarData.nama_beasiswa,
        kategori: scholarData.kategori,
        deskripsi: scholarData.deskripsi,
        persyaratan_beasiswa: scholarData.persyaratan_beasiswa,
        kontak: scholarData.kontak,
        tanggal_mulai: scholarData.tanggal_mulai,
        tanggal_akhir: scholarData.tanggal_akhir,
      },
    });
  }
}

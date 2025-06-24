// src/scholar-regist/scholar-regist.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateScholarRegistDto } from './dto/create-scholar-regist.dto';
import { UpdateScholarRegistDto } from './dto/update-scholar-regist.dto';

@Injectable()
export class ScholarRegistService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateScholarRegistDto) {
    return await this.prisma.scholarRegist.create({
      data: {
        name: dto.name,
        studentId: dto.studentId,
        email: dto.email,
        studyProgram: dto.studyProgram,
        semester: dto.semester,
        registDate: new Date(),
        status: 'waiting_for_result',
        note: dto.note ?? '',
        scholar: {
          connect: { id: dto.scholarId },
        },
        user: {
          connect: { id: dto.userId },
        },
      },
    });
  }

  async findAll() {
    return await this.prisma.scholarRegist.findMany({
      include: { scholar: true, user: true },
    });
  }

  async findOne(id: number) {
    const data = await this.prisma.scholarRegist.findUnique({
      where: { id },
      include: { scholar: true, user: true },
    });

    if (!data) {
      throw new NotFoundException(`ScholarRegist with ID ${id} not found`);
    }

    return data;
  }

  async update(id: number, dto: UpdateScholarRegistDto) {
    await this.findOne(id); // Pastikan data ada

    return await this.prisma.scholarRegist.update({
      where: { id },
      data: {
        name: dto.name,
        studentId: dto.studentId,
        email: dto.email,
        studyProgram: dto.studyProgram,
        semester: dto.semester,
        status: dto.status,
        note: dto.note,
        scholar: dto.scholarId
          ? { connect: { id: dto.scholarId } }
          : undefined,
        // userId tidak diubah di sini untuk keamanan
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return await this.prisma.scholarRegist.delete({ where: { id } });
  }

  // ✅ Tambahan: Ambil semua registrasi berdasarkan userId
  async findByUser(userId: number) {
    return await this.prisma.scholarRegist.findMany({
      where: { userId },
      include: { scholar: true },
    });
  }
}

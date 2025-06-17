import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateScholarRegistDto } from './dto/create-scholar-regist.dto';
import { UpdateScholarRegistDto, ScholarStatus } from './dto/update-scholar-regist.dto';

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
      document: dto.document,
      scholar: {
        connect: {
          id: dto.scholarId,
        },
      },
    },
  });
}

  async findAll() {
    return await this.prisma.scholarRegist.findMany({
      include: { scholar: true },
    });
  }

  async findOne(id: number) {
    const data = await this.prisma.scholarRegist.findUnique({
      where: { id },
      include: { scholar: true },
    });

    if (!data) {
      throw new NotFoundException(`ScholarRegist with ID ${id} not found`);
    }

    return data;
  }

  async update(id: number, dto: UpdateScholarRegistDto) {
    await this.findOne(id);
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
        document: dto.document,
        scholar: dto.scholarId
          ? { connect: { id: dto.scholarId } }
          : undefined,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return await this.prisma.scholarRegist.delete({ where: { id } });
  }
}

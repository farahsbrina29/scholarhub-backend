import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateScholarRegistDto } from './dto/create-scholar-regist.dto';
import { UpdateScholarRegistDto } from './dto/update-scholar-regist.dto';

@Injectable()
export class ScholarRegistService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateScholarRegistDto) {
    return this.prisma.scholarRegist.create({
      data: {
        name: dto.name,
        studentId: dto.studentId,
        email: dto.email,
        studyProgram: dto.studyProgram,
        semester: dto.semester,
        registDate: dto.registDate,
        document: dto.document,
        scholar: {
          connect: {
            id: dto.scholarId,
          },
        },
      },
    });
  }

  findAll() {
    return this.prisma.scholarRegist.findMany({
      include: { scholar: true },
    });
  }

  findOne(id: number) {
    return this.prisma.scholarRegist.findUnique({
      where: { id },
      include: { scholar: true },
    });
  }

  update(id: number, dto: UpdateScholarRegistDto) {
    return this.prisma.scholarRegist.update({
      where: { id },
      data: {
        name: dto.name,
        studentId: dto.studentId,
        email: dto.email,
        studyProgram: dto.studyProgram,
        semester: dto.semester,
        registDate: dto.registDate,
        document: dto.document,
        note: dto.note,
        status: dto.status,
        scholar: dto.scholarId
          ? { connect: { id: dto.scholarId } }
          : undefined,
      },
    });
  }

  remove(id: number) {
    return this.prisma.scholarRegist.delete({ where: { id } });
  }
}

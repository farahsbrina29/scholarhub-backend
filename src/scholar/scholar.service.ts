import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Scholar } from '@prisma/client';
import { CreateScholarDto } from './dto/create-scholar.dto';

@Injectable()
export class ScholarService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Scholar[]> {
    return this.prisma.scholar.findMany();
  }

  async findById(id: number): Promise<Scholar | null> {
    return this.prisma.scholar.findUnique({
      where: { id },
    });
  }

  async create(data: Omit<CreateScholarDto, 'startDate' | 'endDate'> & { startDate: Date; endDate: Date }): Promise<Scholar> {
    return this.prisma.scholar.create({
      data,
    });
  }
}

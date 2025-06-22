import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Scholar } from '@prisma/client';
import { CreateScholarDto } from './dto/create-scholar.dto';
import { UpdateScholarDto } from './dto/update-scholar.dto';

@Injectable()
export class ScholarService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Scholar[]> {
    return await this.prisma.scholar.findMany();
  }

  async findById(id: number): Promise<Scholar> {
    const scholar = await this.prisma.scholar.findUnique({
      where: { id },
    });

    if (!scholar) {
      throw new NotFoundException(`Scholar with ID ${id} not found`);
    }

    return scholar;
  }

  async create(
    data: Omit<CreateScholarDto, 'startDate' | 'endDate'> & { startDate: Date; endDate: Date }
  ): Promise<Scholar> {
    return await this.prisma.scholar.create({
      data,
    });
  }

  async update(id: number, dto: UpdateScholarDto): Promise<Scholar> {
    await this.findById(id); // Ensure it exists first
    return await this.prisma.scholar.update({
      where: { id },
      data: {
        ...dto,
        startDate: dto.startDate ? new Date(dto.startDate) : undefined,
        endDate: dto.endDate ? new Date(dto.endDate) : undefined,
      },
    });
  }

  async remove(id: number): Promise<Scholar> {
    await this.findById(id); // Ensure it exists first
    return await this.prisma.scholar.delete({
      where: { id },
    });
  }
}

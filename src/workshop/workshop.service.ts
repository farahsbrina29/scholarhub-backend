import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWorkshopDto } from './dto/create-workshop.dto';
import { UpdateWorkshopDto } from './dto/update-workshop.dto';

@Injectable()
export class WorkshopService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateWorkshopDto) {
    return await this.prisma.workshop.create({
      data: {
        nameWorkshop: dto.nameWorkshop,
        description: dto.description,
        date: new Date(dto.date),
        linkWorkshop : dto.linkWorkshop
      },
    });
  }

  async findAll() {
    return await this.prisma.workshop.findMany();
  }

  async findOne(id: number) {
    const data = await this.prisma.workshop.findUnique({
      where: { id },
    });

    if (!data) {
      throw new NotFoundException(`Workshop with ID ${id} not found`);
    }

    return data;
  }

  async update(id: number, dto: UpdateWorkshopDto) {
    await this.findOne(id); // Pastikan data ada dulu
    return await this.prisma.workshop.update({
      where: { id },
      data: {
        nameWorkshop: dto.nameWorkshop,
        description: dto.description,
        date: dto.date ? new Date(dto.date) : undefined,
        linkWorkshop :dto.linkWorkshop
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id); // Pastikan data ada dulu
    return await this.prisma.workshop.delete({
      where: { id },
    });
  }
}

import { Controller, Get, Post, Body, Param, NotFoundException } from '@nestjs/common';
import { ScholarService } from './scholar.service';
import { Scholar } from '@prisma/client';
import { CreateScholarDto } from './dto/create-scholar.dto';

@Controller('scholar')
export class ScholarController {
  constructor(private readonly scholarService: ScholarService) {}

  @Get()
  async findAll(): Promise<Scholar[]> {
    return this.scholarService.findAll();
  }

  @Post()
  async create(@Body() dto: CreateScholarDto): Promise<Scholar> {
    return this.scholarService.create({
      ...dto,
      startDate: new Date(dto.startDate),
      endDate: new Date(dto.endDate),
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Scholar> {
    const numericId = parseInt(id, 10);
    const scholar = await this.scholarService.findById(numericId);
    if (!scholar) {
      throw new NotFoundException(`Scholar with ID ${id} not found`);
    }
    return scholar;
  }

}

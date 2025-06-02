// src/scholar/scholar.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common';
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
    // konversi tanggal string -> Date
    return this.scholarService.create({
      ...dto,
      tanggal_mulai: new Date(dto.tanggal_mulai),
      tanggal_akhir: new Date(dto.tanggal_akhir),
    });
  }
}

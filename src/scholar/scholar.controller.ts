import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ScholarService } from './scholar.service';
import { Scholar } from '@prisma/client';
import { CreateScholarDto } from './dto/create-scholar.dto';
import { UpdateScholarDto } from './dto/update-scholar.dto';

@Controller('scholar')
export class ScholarController {
  constructor(private readonly scholarService: ScholarService) {}

  @Get()
  async findAll(): Promise<Scholar[]> {
    try {
      return await this.scholarService.findAll();
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch scholars');
    }
  }

  @Post()
  async create(@Body() dto: CreateScholarDto): Promise<Scholar> {
    try {
      const data = {
        ...dto,
        startDate: new Date(dto.startDate),
        endDate: new Date(dto.endDate),
      };
      return await this.scholarService.create(data);
    } catch (error) {
      throw new BadRequestException('Failed to create scholar. Please check your input.');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Scholar> {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      throw new BadRequestException('ID must be a valid number');
    }

    try {
      const scholar = await this.scholarService.findById(numericId);
      if (!scholar) {
        throw new NotFoundException(`Scholar with ID ${id} not found`);
      }
      return scholar;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to retrieve scholar');
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateScholarDto): Promise<Scholar> {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      throw new BadRequestException('ID must be a valid number');
    }

    try {
      return await this.scholarService.update(numericId, dto);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to update scholar');
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Scholar> {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      throw new BadRequestException('ID must be a valid number');
    }

    try {
      return await this.scholarService.remove(numericId);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to delete scholar');
    }
  }
}

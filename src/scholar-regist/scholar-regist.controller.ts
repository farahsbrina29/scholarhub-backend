import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ScholarRegistService } from './scholar-regist.service';
import { CreateScholarRegistDto } from './dto/create-scholar-regist.dto';
import { UpdateScholarRegistDto } from './dto/update-scholar-regist.dto';

@Controller('scholar-regist')
export class ScholarRegistController {
  constructor(private readonly service: ScholarRegistService) {}

  @Post()
  async create(@Body() createDto: CreateScholarRegistDto) {
    try {
      return await this.service.create(createDto);
    } catch (error) {
      throw new BadRequestException(`Failed to create data: ${error.message}`);
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.service.findAll();
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch scholar registrations');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      throw new BadRequestException('Invalid ID format, must be a number');
    }

    try {
      return await this.service.findOne(numericId);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(`Error fetching data: ${error.message}`);
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateScholarRegistDto,
  ) {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      throw new BadRequestException('Invalid ID format, must be a number');
    }

    try {
      return await this.service.update(numericId, updateDto);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(`Update failed: ${error.message}`);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      throw new BadRequestException('Invalid ID format, must be a number');
    }

    try {
      return await this.service.remove(numericId);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(`Delete failed: ${error.message}`);
    }
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
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
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.service.findAll();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.service.findOne(+id);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(error.message);
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateScholarRegistDto,
  ) {
    try {
      return await this.service.update(+id, updateDto);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(error.message);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.service.remove(+id);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(error.message);
    }
  }
}

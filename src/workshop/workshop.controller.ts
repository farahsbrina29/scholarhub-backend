import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { WorkshopService } from './workshop.service';
import { CreateWorkshopDto } from './dto/create-workshop.dto';
import { UpdateWorkshopDto } from './dto/update-workshop.dto';

@Controller('workshop')
export class WorkshopController {
  constructor(private readonly workshopService: WorkshopService) {}

  @Post()
  async create(@Body() createWorkshopDto: CreateWorkshopDto) {
    try {
      return await this.workshopService.create(createWorkshopDto);
    } catch (error) {
      throw new BadRequestException(error.message || 'Failed to create workshop');
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.workshopService.findAll();
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve workshops');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const result = await this.workshopService.findOne(+id);
      if (!result) throw new NotFoundException(`Workshop with ID ${id} not found`);
      return result;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(error.message || 'Error fetching workshop');
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateWorkshopDto: UpdateWorkshopDto) {
    try {
      const result = await this.workshopService.update(+id, updateWorkshopDto);
      if (!result) throw new NotFoundException(`Workshop with ID ${id} not found`);
      return result;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException(error.message || 'Error updating workshop');
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const result = await this.workshopService.remove(+id);
      if (!result) throw new NotFoundException(`Workshop with ID ${id} not found`);
      return result;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(error.message || 'Error deleting workshop');
    }
  }
}

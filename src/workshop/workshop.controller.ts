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
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; 
import {RolesGuard } from '../auth/roles.guard'; 
import { Roles } from 'src/auth/roles.decorator';
import { Role } from '../auth/roles.decorator';   
import { UseGuards } from '@nestjs/common';



@Controller('workshop')
export class WorkshopController {
  constructor(private readonly workshopService: WorkshopService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post()
  async create(@Body() createWorkshopDto: CreateWorkshopDto) {
    try {
      return await this.workshopService.create(createWorkshopDto);
    } catch (error) {
      throw new BadRequestException(error.message || 'Failed to create workshop');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    try {
      return await this.workshopService.findAll();
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve workshops');
    }
  }
  
  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
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

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
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

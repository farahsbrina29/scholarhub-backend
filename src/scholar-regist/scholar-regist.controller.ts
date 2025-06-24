// src/scholar-regist/scholar-regist.controller.ts
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
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; 
import {RolesGuard } from '../auth/roles.guard'; 
import { Roles } from 'src/auth/roles.decorator';
import { Role } from '../auth/roles.decorator';   
import { UseGuards } from '@nestjs/common';

@Controller('scholar-regist')
export class ScholarRegistController {
  constructor(private readonly service: ScholarRegistService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.USER)
  @Post()
  async create(@Body() createDto: CreateScholarRegistDto) {
    try {
      return await this.service.create(createDto);
    } catch (error) {
      throw new BadRequestException(`Failed to create data: ${error.message}`);
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get()
  async findAll() {
    try {
      return await this.service.findAll();
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch scholar registrations');
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
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

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
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

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
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

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.USER)
  @Get('user/:userId')
  async findByUser(@Param('userId') userId: string) {
    const id = parseInt(userId, 10);
    if (isNaN(id)) {
      throw new BadRequestException('Invalid user ID');
    }

    try {
      return await this.service.findByUser(id);
    } catch (error) {
      throw new InternalServerErrorException(`Failed to fetch data: ${error.message}`);
    }
  }
}

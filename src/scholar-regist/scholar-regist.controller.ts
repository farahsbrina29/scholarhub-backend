import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ScholarRegistService } from './scholar-regist.service';
import { UpdateScholarRegistDto } from './dto/update-scholar-regist.dto';
import { CreateScholarRegistDto } from './dto/create-scholar-regist.dto';


@Controller('scholar-regist')
export class ScholarRegistController {
  constructor(private readonly service: ScholarRegistService) {}

  @Post()
  create(@Body() createDto: CreateScholarRegistDto) {
    return this.service.create(createDto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateScholarRegistDto) {
    return this.service.update(+id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}

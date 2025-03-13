
import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { Interest } from './entities/interest.entity';
import { CreateInterestDto } from './dto/create-interest.dto';
import { UpdateInterestDto } from './dto/update-interest.dto';
import { InterestsService } from './interest.service';
import { NotFoundException } from '@nestjs/common';
@Controller('interests')
export class InterestsController {
  constructor(private readonly interestsService: InterestsService) {}

  @Post()
  create(@Body() createInterestDto: CreateInterestDto): Promise<Interest> {
    return this.interestsService.create(createInterestDto);
  }

  @Get()
  findAll(): Promise<Interest[]> {
    return this.interestsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Interest | null> {
    return this.interestsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateInterestDto: UpdateInterestDto): Promise<Interest> {
    return this.interestsService.update(id, updateInterestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.interestsService.remove(id);
  }
}
import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  UseGuards,
  Req,
  NotFoundException,
} from '@nestjs/common';
import { InvestmentsService } from './investments.service';
import { CreateInvestmentDto } from './dto/create-investment.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { UserRole } from 'src/users/entities/user.entity';
import { SetMetadata } from '@nestjs/common';
import { Request } from 'express';
import { Investment } from './entities/investment.entity';
import { User } from 'src/users/entities/user.entity';

@Controller('investments')
export class InvestmentsController {
  constructor(private readonly investmentsService: InvestmentsService) {
  }

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @SetMetadata('roles', [UserRole.INVESTOR])
  create(
    @Body() createInvestmentDto: CreateInvestmentDto,
  ): Promise<Investment> {
    return this.investmentsService.create(createInvestmentDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @SetMetadata('roles', [UserRole.INVESTOR])
  getInvestmentsByUser(@Req() req: any): Promise<Investment[]> {
    const user = req.user as User;
    return this.investmentsService.findInvestmentsByUser(user.id);
  }

  @Get('project/:id')
  @UseGuards(AuthGuard('jwt'))
  async getInvestmentsByProject(@Param('id') id: string): Promise<Investment[]> {
    const investments = await this.investmentsService.findInvestmentsByProject(id);
    return investments;
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @SetMetadata('roles', [UserRole.INVESTOR])
  remove(@Param('id') id: string): Promise<void> {
    return this.investmentsService.remove(id);
  }
}
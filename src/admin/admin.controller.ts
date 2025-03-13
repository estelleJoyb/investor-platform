import {
  Controller,
  Delete,
  Get,
  Param,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { User, UserRole } from 'src/users/entities/user.entity';
import { AdminService } from './admin.service';
import { Investment } from 'src/investments/entities/investment.entity';

@Controller('admin')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {
  }

  @Get('users')
  @SetMetadata('roles', [UserRole.ADMIN])
  findAllUsers(): Promise<User[]> {
    return this.adminService.findAllUsers();
  }

  @Delete('users/:id')
  @SetMetadata('roles', [UserRole.ADMIN])
  removeUser(@Param('id') id: string): Promise<void> {
    return this.adminService.removeUser(id);
  }

  @Get('investments')
  @SetMetadata('roles', [UserRole.ADMIN])
  findAllInvestments(): Promise<Investment[]> {
    return this.adminService.findAllInvestments();
  }
}
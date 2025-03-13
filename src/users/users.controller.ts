import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, SetMetadata, Req, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { User, UserRole } from './entities/user.entity';
import { RolesGuard } from '../auth/roles/roles.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Need to be logged in (any role) to access these routes :
  @UseGuards(AuthGuard('jwt'))
  @Put('profile')
  updateProfile(@Req() req: any, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    const user: User = req.user as User;
    return this.usersService.update(user.id, updateUserDto);
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  getProfile(@Req() req: any): User {
    const user: User = req.user as User;
    return user;
  }

  // Need to be admin to access these routes :
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @SetMetadata('roles', [UserRole.ADMIN])
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @SetMetadata('roles', [UserRole.ADMIN])
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @SetMetadata('roles', [UserRole.ADMIN])
  @Post(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @SetMetadata('roles', [UserRole.ADMIN])
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}

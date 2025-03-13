import { Controller, Get, Post, UseGuards, Req, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/users/entities/user.entity';
import { InterestsService } from './interest.service';
import { Interest } from './entities/interest.entity';

@Controller('users/interests')
@UseGuards(AuthGuard('jwt'))
export class UserInterestsController {
  constructor(private readonly interestsService: InterestsService) {}
  @Post()
  async addUserInterests(@Req() req: any, @Body('interests') interests: string[]): Promise<User> {
    const user = req.user as User;
    return this.interestsService.addInterestsToUser(user.id, interests);
  }

  @Get()
  getUserInterests(@Req() req: any): Promise<Interest[]> {
    const user = req.user as User;
    return this.interestsService.getInterestsByUser(user.id);
  }
}
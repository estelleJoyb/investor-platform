import { Injectable } from '@nestjs/common';
import { Investment } from 'src/investments/entities/investment.entity';
import { InvestmentsService } from 'src/investments/investments.service';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AdminService {
  constructor(
    private readonly usersService: UsersService,
    private readonly investmentsService: InvestmentsService,
  ) {
  }

  findAllUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }

  removeUser(id: string): Promise<void> {
    return this.usersService.remove(id);
  }

  findAllInvestments(): Promise<Investment[]> {
    return this.investmentsService.findAll();
  }
}
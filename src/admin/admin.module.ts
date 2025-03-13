import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { UsersModule } from 'src/users/users.module';
import { InvestmentsModule } from 'src/investments/investments.module';

@Module({
  imports: [UsersModule, InvestmentsModule],
  providers: [AdminService],
  controllers: [AdminController],
})
export class AdminModule {}
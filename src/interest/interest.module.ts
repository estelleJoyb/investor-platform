import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Interest } from './entities/interest.entity';
import { UserInterestsController } from './user-interest.controller';
import { InterestsController } from './interest.controller';
import { InterestsService } from './interest.service';
import { User } from '../users/entities/user.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Interest]), TypeOrmModule.forFeature([User])],
  controllers: [InterestsController, UserInterestsController],
  providers: [InterestsService],
  exports: [InterestsService],
})
export class InterestsModule {
}
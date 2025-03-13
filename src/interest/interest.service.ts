import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Interest } from './entities/interest.entity';
import { Repository } from 'typeorm';
import { CreateInterestDto } from './dto/create-interest.dto';
import { UpdateInterestDto } from './dto/update-interest.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class InterestsService {
  constructor(
    @InjectRepository(Interest)
    private interestsRepository: Repository<Interest>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  create(createInterestDto: CreateInterestDto): Promise<Interest> {
    const newInterest = this.interestsRepository.create(createInterestDto);
    return this.interestsRepository.save(newInterest);
  }

  findAll(): Promise<Interest[]> {
    return this.interestsRepository.find();
  }

  async findOne(id: string): Promise<Interest | null> {
    const interest = await this.interestsRepository.findOneBy({ id });
    if (!interest) {
      throw new NotFoundException(`Interest with ID ${id} not found`);
    }
    return interest;
  }

  async update(id: string, updateInterestDto: UpdateInterestDto): Promise<Interest> {
    const interest = await this.interestsRepository.findOneBy({ id });
    if (!interest) {
      throw new NotFoundException(`Interest with ID ${id} not found`);
    }
    Object.assign(interest, updateInterestDto);
    return this.interestsRepository.save(interest);
  }

  async remove(id: string): Promise<void> {
    const interest = await this.interestsRepository.findOneBy({ id });
    if (!interest) {
      throw new NotFoundException(`Interest with ID ${id} not found`);
    }
    await this.interestsRepository.delete(id);
  }
  async addInterestsToUser(userId: string, interests: string[]): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    const interestsEntities = await this.interestsRepository.findByIds(interests);
    user.interests = interestsEntities;
    return this.usersRepository.save(user);
  }

  async getInterestsByUser(userId: string): Promise<Interest[]> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['interests'], // Load the related interests
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return user.interests;
  }
}
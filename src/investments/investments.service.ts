import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Investment } from './entities/investment.entity';
import { Repository } from 'typeorm';
import { CreateInvestmentDto } from './dto/create-investment.dto';
import { Project } from 'src/projects/entities/project.entity';

@Injectable()
export class InvestmentsService {
  constructor(
    @InjectRepository(Investment)
    private investmentsRepository: Repository<Investment>,
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
  ) {
  }

  async create(createInvestmentDto: CreateInvestmentDto): Promise<Investment> {
    const project = await this.projectsRepository.findOneBy({ id: createInvestmentDto.projectId });
    if (!project) {
      throw new NotFoundException(`Project with ID ${createInvestmentDto.projectId} not found`);
    }
    const newInvestment = this.investmentsRepository.create(createInvestmentDto);
    return this.investmentsRepository.save(newInvestment);
  }

  async findAll(): Promise<Investment[]> {
    return this.investmentsRepository.find();
  }

  async findOne(id: string): Promise<Investment | null> {
    const investment = await this.investmentsRepository.findOneBy({ id });
    if (!investment) {
      throw new NotFoundException(`Investment with ID ${id} not found`);
    }
    return investment;
  }

  async findInvestmentsByProject(projectId: string): Promise<Investment[]> {
    const project = await this.projectsRepository.findOneBy({ id: projectId });
    if (!project) {
      throw new NotFoundException(`Project with ID ${projectId} not found`);
    }
    return this.investmentsRepository.find({ where: { projectId } });
  }

  async findInvestmentsByUser(userId: string): Promise<Investment[]> {
    return this.investmentsRepository.find({ where: { userId } });
  }

  async remove(id: string): Promise<void> {
    const investment = await this.investmentsRepository.findOneBy({ id });
    if (!investment) {
      throw new NotFoundException(`Investment with ID ${id} not found`);
    }
    await this.investmentsRepository.delete(id);
  }
}
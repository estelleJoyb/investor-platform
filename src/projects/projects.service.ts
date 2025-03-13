import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Interest } from '../interest/entities/interest.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
    @InjectRepository(Interest)
    private interestsRepository: Repository<Interest>,
  ) {}

  create(createProjectDto: CreateProjectDto): Promise<Project> {
    const newProject = this.projectsRepository.create(createProjectDto);
    return this.projectsRepository.save(newProject);
  }

  findAll(): Promise<Project[]> {
    return this.projectsRepository.find();
  }

  async findOne(id: string): Promise<Project | null> {
    const project = await this.projectsRepository.findOneBy({ id });
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    return project;
  }

  async update(id: string, updateProjectDto: UpdateProjectDto): Promise<Project> {
    const project = await this.projectsRepository.findOneBy({ id });
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    Object.assign(project, updateProjectDto);
    return this.projectsRepository.save(project);
  }

  async remove(id: string): Promise<void> {
    const project = await this.projectsRepository.findOneBy({ id });
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    await this.projectsRepository.delete(id);
  }
  async getRecommendedProjects(userId: string): Promise<Project[]> {
    const user = await this.interestsRepository
      .createQueryBuilder('interest')
      .leftJoinAndSelect('interest.users', 'user')
      .where('user.id = :userId', { userId })
      .getMany();
    const interestNames = user.map(interest => interest.name);
    return this.projectsRepository
      .createQueryBuilder('project')
      .where('project.category IN (:...categories)', { categories: interestNames })
      .getMany();
  }
}
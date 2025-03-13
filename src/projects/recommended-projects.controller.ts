import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { User } from 'src/users/entities/user.entity';
import { ProjectsService } from './projects.service';
import { Project } from './entities/project.entity';

@Controller('projects/recommended')
@UseGuards(AuthGuard('jwt'))
export class RecommendedProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  getRecommendedProjects(@Req() req: any): Promise<Project[]> {
    const user = req.user as User;
    return this.projectsService.getRecommendedProjects(user.id);
  }
}
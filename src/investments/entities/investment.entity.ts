import { Project } from 'src/projects/entities/project.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('investments')
export class Investment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  amount: number;

  @Column()
  userId: string;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @Column()
  projectId: string;

  @ManyToOne(() => Project, (project) => project.id)
  project: Project;
}
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  budget: number;

  @Column()
  category: string;

  @Column()
  ownerId: string;

  @ManyToOne(() => User, (user: User) => user.projects)
  owner: User;
}
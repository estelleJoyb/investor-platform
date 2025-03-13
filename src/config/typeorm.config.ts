import { User } from '../users/entities/user.entity';
import { Project } from '../projects/entities/project.entity';
import { Investment } from '../investments/entities/investment.entity';
import { Interest } from '../interest/entities/interest.entity';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig : TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306', 10),
  username: process.env.DB_USER || 'investor_user',
  password: process.env.DB_PASSWORD || 'mysecurepassword',
  database: process.env.DB_NAME || 'investor_platform',
  entities: [User, Project, Investment, Interest],
  synchronize: process.env.NODE_ENV !== 'production', // Only synchronize in development
  ssl:{
    rejectUnauthorized : false
  },
  autoLoadEntities: true,
  migrations: ['dist/migrations/*.js'],
  migrationsTableName: 'migrations_history',
};
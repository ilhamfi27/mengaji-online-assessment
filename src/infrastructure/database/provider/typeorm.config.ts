import { DataSourceOptions } from 'typeorm';
import { config } from 'src/config';
import { resolve, join } from 'path';
import { TeacherEntity } from '../teacher/teacher.entity';
import { SubjectEntity } from '../subject/subject.entity';
import { ActiveClassEntity } from '../active-class/active-class.entity';
import { ClassAssignmentEntity } from '../class-assignment/class-assignment.entity';

export const dataSourceOptions: DataSourceOptions = {
  type: config.db.type as any,
  host: config.db.host,
  port: config.db.port as number,
  username: config.db.username,
  password: config.db.password,
  database: config.db.database,
  schema: config.db.schema,
  entities: [
    TeacherEntity,
    SubjectEntity,
    ActiveClassEntity,
    ClassAssignmentEntity,
  ],
  migrations: [resolve(join(__dirname, 'migrations/*.{ts,js}'))],
  synchronize: false,
  logger: 'simple-console',
  subscribers: [],
  poolSize: config.db.maxPoolConnection as number,
  charset: 'utf8mb4',
  logging: true,
};

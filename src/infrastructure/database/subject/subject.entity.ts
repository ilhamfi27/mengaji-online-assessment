import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TeacherEntity } from '../teacher/teacher.entity';

@Entity({ name: 'subjects' })
export class SubjectEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 255 })
  name!: string;

  @Column({ type: 'varchar', length: 255, default: '' })
  code!: string;

  @OneToMany(() => TeacherEntity, (teacher) => teacher.subject)
  teachers!: TeacherEntity[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt?: Date;

  @DeleteDateColumn({ type: 'timestamp', select: true })
  deletedAt?: Date;
}

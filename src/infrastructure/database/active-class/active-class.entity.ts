import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  type Relation,
  UpdateDateColumn,
} from 'typeorm';
import { TeacherEntity } from '../teacher/teacher.entity';

@Entity({ name: 'classes' })
export class ActiveClassEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 255 })
  name!: string;

  @Column({ type: 'integer' })
  duration!: number;

  @Column({ type: 'timestamp with time zone' })
  dateAndTime!: Date;

  @ManyToOne(() => TeacherEntity, (teacher) => teacher.id, { nullable: true })
  teacher?: Relation<TeacherEntity>;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt?: Date;

  @DeleteDateColumn({ type: 'timestamp', select: false })
  deletedAt?: Date;
}

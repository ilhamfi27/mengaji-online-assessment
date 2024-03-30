import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  type Relation,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { SubjectEntity } from '../subject/subject.entity';
import { ActiveClassEntity } from '../active-class/active-class.entity';

@Entity({ name: 'teachers' })
export class TeacherEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 255 })
  name!: string;

  @Column({ type: 'varchar', length: 255 })
  email!: string;

  @Column({ type: 'varchar', length: 255 })
  employeeId!: string;

  @Column({ type: 'varchar', length: 255 })
  gender!: string;

  @ManyToOne(() => SubjectEntity, (subject) => subject.teachers)
  subject!: Relation<SubjectEntity>;

  @OneToMany(() => ActiveClassEntity, (activeClass) => activeClass.teacher)
  activeClasses!: ActiveClassEntity[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt?: Date;

  @DeleteDateColumn({ type: 'timestamp', select: true })
  deletedAt?: Date;
}

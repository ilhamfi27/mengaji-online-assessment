import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ActiveClassEntity } from '../active-class/active-class.entity';
import { SubjectEntity } from '../subject/subject.entity';
import { TeacherEntity } from '../teacher/teacher.entity';

@Entity()
export class ClassAssignmentEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'timestamp with time zone' })
  dateAndTime!: string;

  @Column({ type: 'integer' })
  duration!: number;

  @ManyToOne(() => ActiveClassEntity, (cls) => cls.id)
  activeClass!: ActiveClassEntity;

  @ManyToOne(() => TeacherEntity, (teacher) => teacher.id, { nullable: true })
  teacher?: TeacherEntity;

  @ManyToOne(() => SubjectEntity, (subject) => subject.id)
  subject!: SubjectEntity;
}

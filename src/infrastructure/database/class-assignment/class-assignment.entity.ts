import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ClassEntity } from '../active-class/active-class.entity';
import { SubjectEntity } from '../subject/subject.entity';
import { TeacherEntity } from '../teacher/teacher.entity';

@Entity()
export class ClassAssignmentEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'datetime' })
  dateAndTime!: string;

  @Column({ type: 'integer' })
  duration!: number;

  @ManyToOne(() => ClassEntity, (cls) => cls.id)
  activeClass!: ClassEntity;

  @ManyToOne(() => TeacherEntity, (teacher) => teacher.id, { nullable: true })
  teacher?: TeacherEntity;

  @ManyToOne(() => SubjectEntity, (subject) => subject.id)
  subject!: SubjectEntity;
}

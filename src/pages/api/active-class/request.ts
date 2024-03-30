import { IsDateString, IsNumber, IsString } from 'class-validator';
import { CreateTeacherRequest } from '../teachers/request';
import { CreateSubjectRequest } from '../subjects/request';
import { Type } from 'class-transformer';
import { TeacherEntity } from '@/src/infrastructure/database/teacher/teacher.entity';

export class CreateActiveClassRequest {
  @IsString()
  name!: string;

  @IsDateString()
  dateAndTime!: Date;

  @IsNumber()
  duration!: number;

  @Type(() => TeacherEntity)
  teacher?: TeacherEntity;
}

export class UpdateActiveClassRequest extends CreateActiveClassRequest {}

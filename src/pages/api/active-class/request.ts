import { IsDateString, IsNumber, IsString } from 'class-validator';
import { CreateTeacherRequest } from '../teachers/request';
import { CreateSubjectRequest } from '../subject/request';
import { Type } from 'class-transformer';

export class CreateActiveClassRequest {
  @IsString()
  name!: string;

  @IsDateString()
  dateAndTime!: Date;

  @IsNumber()
  duration!: number;

  @Type(() => CreateTeacherRequest)
  teacher?: CreateTeacherRequest;

  @Type(() => CreateSubjectRequest)
  subject!: CreateSubjectRequest;
}

export class UpdateActiveClassRequest extends CreateActiveClassRequest {}

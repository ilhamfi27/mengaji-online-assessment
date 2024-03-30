import { SubjectEntity } from '@/src/infrastructure/database/subject/subject.entity';
import { Type } from 'class-transformer';
import { IsEmail, IsEnum, IsString } from 'class-validator';

enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

export class CreateTeacherRequest {
  @IsString()
  name!: string;

  @IsString()
  @IsEmail()
  email!: string;

  @IsString()
  employeeId!: string;

  @IsEnum(Gender)
  gender!: string;

  @Type(() => SubjectEntity)
  subject!: SubjectEntity;
}

export class UpdateTeacherRequest extends CreateTeacherRequest {}

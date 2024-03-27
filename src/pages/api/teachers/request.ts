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
}

export class UpdateTeacherRequest extends CreateTeacherRequest {}

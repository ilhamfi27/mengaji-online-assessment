import { IsString } from 'class-validator';

export class CreateSubjectRequest {
  @IsString()
  name!: string;

  @IsString()
  code!: string;
}

export class UpdateSubjectRequest extends CreateSubjectRequest {}

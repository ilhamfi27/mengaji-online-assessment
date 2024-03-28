import { IsString } from 'class-validator';

export class CreateSubjectRequest {
  @IsString()
  name!: string;
}

export class UpdateSubjectRequest extends CreateSubjectRequest {}

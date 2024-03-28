import { IsNumberString, IsObject } from 'class-validator';

export class PaginationParam<T = any> {
  @IsNumberString()
  page!: number;

  @IsNumberString()
  size!: number;

  search?: T | Partial<T>;
}

export interface Paginated<T> {
  items: T[];
  totalSize: number;
  totalPages: number;
  page: number;
  size: number;
}

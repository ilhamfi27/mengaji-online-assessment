import { Generic } from '../@types/generic';
import { Paginated, PaginationParam } from '../@types/pagination';
import { request } from './request';

export interface Teacher extends Generic {
  name: string;
  email: string;
  employeeId: string;
  gender: string;
}

export const getTeachers = async ({
  page,
  size,
  search,
}: PaginationParam<string>) => {
  const params = new URLSearchParams();
  params.append('page', page.toString());
  params.append('size', size.toString());
  if (search) {
    params.append('search', search);
  }
  const teachers = await request.get<Paginated<Teacher>>(`/teachers?${params}`);
  return teachers.data;
};

export const createTeacher = async (data: Teacher) => {
  return request.post('/teachers', data);
};

export const updateTeacher = async (id: string, data: Teacher) => {
  return request.put(`/teachers/${id}`, data);
};

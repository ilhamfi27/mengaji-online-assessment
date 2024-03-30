import { Generic } from '../@types/generic';
import { Paginated, PaginationParam } from '../@types/pagination';
import { request } from './request';
import { Subject } from './subject';

export interface Teacher extends Generic {
  name: string;
  email: string;
  employeeId: string;
  gender: string;
  subject: Subject;
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

export const getArchivedTeachers = async ({
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
  const teachers = await request.get<Paginated<Teacher>>(
    `/teachers/archived/all?${params}`
  );
  return teachers.data;
};

export const createTeacher = async (data: Teacher) => {
  return request.post('/teachers', data);
};

export const updateTeacher = async (id: string, data: Teacher) => {
  return request.put(`/teachers/${id}`, data);
};

export const deleteTeacher = async (id: string) => {
  return request.delete(`/teachers/${id}`);
};

export const undeleteTeacher = async (id: string) => {
  return request.patch(`/teachers/${id}/restore`);
};

export const checkTeacherProperty = async (
  property: 'email' | 'employeeId',
  data: Partial<Teacher>
) => {
  return request.post(`/teachers/${property}/exists`, data);
};

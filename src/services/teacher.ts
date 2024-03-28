import { Generic } from '../@types/generic';
import { Paginated } from '../@types/pagination';
import { request } from './request';

export interface Teacher extends Generic {
  name: string;
  email: string;
  employeeId: string;
  gender: string;
} ;

export const getTeachers = async () => {
  const teachers = await request.get<Paginated<Teacher>>('/teachers');
  return teachers.data;
};

export const createTeacher = async (data: Teacher) => {
  return request.post('/teachers', data);
};

export const updateTeacher = async (id: string, data: Teacher) => {
  return request.put(`/teachers/${id}`, data);
};

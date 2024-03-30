import { Generic } from '../@types/generic';
import { Paginated, PaginationParam } from '../@types/pagination';
import { request } from './request';

export interface Subject extends Generic {
  name: string;
  code: string;
}

export const getSubjects = async ({
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
  const subjects = await request.get<Paginated<Subject>>(`/subjects?${params}`);
  return subjects.data;
};

export const getArchivedSubjects = async ({
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
  const teachers = await request.get<Paginated<Subject>>(`/subjects/archived/all?${params}`);
  return teachers.data;
};

export const createSubject = async (data: Subject) => {
  return request.post('/subjects', data);
};

export const updateSubject = async (id: string, data: Subject) => {
  return request.put(`/subjects/${id}`, data);
};

export const deleteSubject = async (id: string) => {
  return request.delete(`/subjects/${id}`);
};

export const undeleteSubject = async (id: string) => {
  return request.patch(`/subjects/${id}/restore`);
};

export const checkSubjectProperty = async (
  property: 'name' | 'code',
  data: Partial<Subject>
) => {
  return request.post(`/subjects/${property}/exists`, data);
};

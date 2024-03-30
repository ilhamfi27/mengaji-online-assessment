import { Generic } from '../@types/generic';
import { Paginated, PaginationParam } from '../@types/pagination';
import { request } from './request';
import { Subject } from './subject';
import { Teacher } from './teacher';

export interface ActiveClass extends Generic {
  name: string;
  dateAndTime: Date;
  duration: number;
  teacher: Teacher;
  subject: Subject;
}

export const getActiveClasss = async ({
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
  const subjects = await request.get<Paginated<ActiveClass>>(
    `/subjects?${params}`
  );
  return subjects.data;
};

export const createActiveClass = async (data: ActiveClass) => {
  return request.post('/subjects', data);
};

export const updateActiveClass = async (id: string, data: ActiveClass) => {
  return request.put(`/subjects/${id}`, data);
};

export const deleteActiveClass = async (id: string) => {
  return request.delete(`/subjects/${id}`);
};

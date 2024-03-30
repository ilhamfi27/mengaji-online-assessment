import { Generic } from '../@types/generic';
import { Paginated, PaginationParam } from '../@types/pagination';
import { request } from './request';
import { Teacher } from './teacher';

export interface ActiveClass extends Generic {
  name: string;
  dateAndTime: Date;
  duration: number;
  teacher: Teacher;
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
  const activeClasses = await request.get<Paginated<ActiveClass>>(
    `/active-class?${params}`
  );
  return activeClasses.data;
};

export const createActiveClass = async (data: ActiveClass) => {
  return request.post('/active-class', data);
};

export const updateActiveClass = async (id: string, data: ActiveClass) => {
  return request.put(`/active-class/${id}`, data);
};

export const deleteActiveClass = async (id: string) => {
  return request.delete(`/active-class/${id}`);
};

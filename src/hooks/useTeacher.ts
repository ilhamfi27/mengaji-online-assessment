import useSWR from 'swr';
import {
  getTeachers,
  createTeacher,
  updateTeacher,
  Teacher,
} from '../services/teacher';
import { useEffect, useState } from 'react';
import { PaginationParam } from '../@types/pagination';

export const useTeacher = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [error, setError] = useState();
  const [data, setData] = useState<Teacher | null>(null);
  const [filter, setFilter] = useState<PaginationParam<string>>({
    page: 1,
    size: 10,
    search: '',
  });

  const {
    data: teachers,
    error: fetchError,
    isLoading: fetchLoading,
    mutate: refreshTeachers,
    isValidating,
  } = useSWR(['/teachers', filter], () => getTeachers(filter));

  useEffect(() => {
    setIsLoading(fetchLoading);
    setError(fetchError);
    setIsFetching(isValidating);
  }, [fetchError, fetchLoading, isValidating]);

  return {
    teachers,
    error,
    isLoading,
    isFetching,
    refreshTeachers,
    createTeacher,
    updateTeacher,
    teacher: data,
    setTeacher: setData,
    filter,
    setFilter,
  };
};

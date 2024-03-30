import useSWR from 'swr';
import {
  getTeachers,
  createTeacher,
  updateTeacher,
  deleteTeacher,
  undeleteTeacher,
  Teacher,
  getArchivedTeachers,
  checkTeacherProperty,
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

  const {
    data: archivedTeachers,
    error: fetchArchivedError,
    isLoading: fetchArchivedLoading,
    mutate: refreshArchivedTeachers,
    isValidating: isArchivedValidating,
  } = useSWR(['/teachers/archived', filter], () => getArchivedTeachers(filter));

  useEffect(() => {
    setIsLoading(fetchArchivedLoading);
    setError(fetchArchivedError);
    setIsFetching(isArchivedValidating);
  }, [fetchArchivedError, fetchArchivedLoading, isArchivedValidating]);

  return {
    teachers,
    error,
    isLoading,
    isFetching,
    refreshTeachers,
    createTeacher,
    updateTeacher,
    deleteTeacher,
    undeleteTeacher,
    checkTeacherProperty,
    teacher: data,
    setTeacher: setData,
    filter,
    setFilter,
    archivedTeachers,
    refreshArchivedTeachers,
  };
};

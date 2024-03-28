import useSWR from 'swr';
import {
  getTeachers,
  createTeacher,
  updateTeacher,
  Teacher,
} from '../services/teacher';
import { useEffect, useState } from 'react';

export const useTeacher = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [error, setError] = useState();
  const [data, setData] = useState<Teacher | null>(null);

  const {
    data: teachers,
    error: fetchError,
    isLoading: fetchLoading,
    mutate: refreshTeachers,
    isValidating,
  } = useSWR('/teachers', getTeachers);

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
  };
};

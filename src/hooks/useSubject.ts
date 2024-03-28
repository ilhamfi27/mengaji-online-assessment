import useSWR from 'swr';
import {
  getSubjects,
  createSubject,
  updateSubject,
  deleteSubject,
  Subject,
} from '../services/subject';
import { useEffect, useState } from 'react';
import { PaginationParam } from '../@types/pagination';

export const useSubject = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [error, setError] = useState();
  const [data, setData] = useState<Subject | null>(null);
  const [filter, setFilter] = useState<PaginationParam<string>>({
    page: 1,
    size: 10,
    search: '',
  });

  const {
    data: subjects,
    error: fetchError,
    isLoading: fetchLoading,
    mutate: refreshSubjects,
    isValidating,
  } = useSWR(['/subjects', filter], () => getSubjects(filter));

  useEffect(() => {
    setIsLoading(fetchLoading);
    setError(fetchError);
    setIsFetching(isValidating);
  }, [fetchError, fetchLoading, isValidating]);

  return {
    subjects,
    error,
    isLoading,
    isFetching,
    refreshSubjects,
    createSubject,
    updateSubject,
    deleteSubject,
    subject: data,
    setSubject: setData,
    filter,
    setFilter,
  };
};

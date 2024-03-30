import useSWR from 'swr';
import {
  getActiveClasss,
  createActiveClass,
  updateActiveClass,
  deleteActiveClass,
  ActiveClass,
} from '../services/active-class';
import { useEffect, useState } from 'react';
import { PaginationParam } from '../@types/pagination';

export const useActiveClass = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [error, setError] = useState();
  const [data, setData] = useState<ActiveClass | null>(null);
  const [filter, setFilter] = useState<PaginationParam<string>>({
    page: 1,
    size: 10,
    search: '',
  });

  const {
    data: activeClasses,
    error: fetchError,
    isLoading: fetchLoading,
    mutate: refreshActiveClasss,
    isValidating,
  } = useSWR(['/activeClasses', filter], () => getActiveClasss(filter));

  useEffect(() => {
    setIsLoading(fetchLoading);
    setError(fetchError);
    setIsFetching(isValidating);
  }, [fetchError, fetchLoading, isValidating]);

  return {
    activeClasses,
    error,
    isLoading,
    isFetching,
    refreshActiveClasss,
    createActiveClass,
    updateActiveClass,
    deleteActiveClass,
    activeClass: data,
    setActiveClass: setData,
    filter,
    setFilter,
  };
};

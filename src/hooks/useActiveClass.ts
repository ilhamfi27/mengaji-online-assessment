import useSWR from 'swr';
import {
  getActiveClasss,
  createActiveClass,
  updateActiveClass,
  deleteActiveClass,
  undeleteActiveClass,
  ActiveClass,
  getArchivedActiveClasss,
  checkActiveClassProperty,
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

  const {
    data: archivedActiveClass,
    error: fetchArchivedError,
    isLoading: fetchArchivedLoading,
    mutate: refreshArchivedActiveClass,
    isValidating: isArchivedValidating,
  } = useSWR(['/teachers/archived', filter], () =>
    getArchivedActiveClasss(filter)
  );

  useEffect(() => {
    setIsLoading(fetchArchivedLoading);
    setError(fetchArchivedError);
    setIsFetching(isArchivedValidating);
  }, [fetchArchivedError, fetchArchivedLoading, isArchivedValidating]);

  return {
    activeClasses,
    error,
    isLoading,
    isFetching,
    refreshActiveClasss,
    createActiveClass,
    updateActiveClass,
    deleteActiveClass,
    undeleteActiveClass,
    checkActiveClassProperty,
    activeClass: data,
    setActiveClass: setData,
    filter,
    setFilter,
    archivedActiveClass,
    refreshArchivedActiveClass,
  };
};

import { useMemo } from 'react';
import { useQueryParams } from './useQueryParams';

/**
 * Hook for managing pagination with URL persistence
 */
export const usePagination = (
  totalItems: number,
  itemsPerPage: number = 10
) => {
  const { getParamAsNumber, setParam } = useQueryParams();

  // Get current page from URL, default to 1
  const currentPage = getParamAsNumber('page', 1) || 1;

  // Calculate pagination values
  const pagination = useMemo(() => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

    return {
      currentPage: Math.max(1, Math.min(currentPage, totalPages)),
      totalPages,
      totalItems,
      itemsPerPage,
      startIndex,
      endIndex,
      hasNextPage: currentPage < totalPages,
      hasPreviousPage: currentPage > 1,
    };
  }, [currentPage, totalItems, itemsPerPage]);

  /**
   * Go to a specific page
   */
  const goToPage = (page: number) => {
    const validPage = Math.max(1, Math.min(page, pagination.totalPages));
    setParam('page', validPage);
  };

  /**
   * Go to next page
   */
  const goToNextPage = () => {
    if (pagination.hasNextPage) {
      goToPage(pagination.currentPage + 1);
    }
  };

  /**
   * Go to previous page
   */
  const goToPreviousPage = () => {
    if (pagination.hasPreviousPage) {
      goToPage(pagination.currentPage - 1);
    }
  };

  /**
   * Reset to first page
   */
  const resetToFirstPage = () => {
    goToPage(1);
  };

  /**
   * Get paginated slice of data
   */
  const getPaginatedData = (data: any[]) => {
    return data.slice(pagination.startIndex, pagination.endIndex);
  };

  return {
    ...pagination,
    goToPage,
    goToNextPage,
    goToPreviousPage,
    resetToFirstPage,
    getPaginatedData,
  };
};

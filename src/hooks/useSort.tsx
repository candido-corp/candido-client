import { useCallback, useMemo } from 'react';
import { useQueryParams } from './useQueryParams';

export interface SortConfig {
  key: string;
  direction: 'asc' | 'desc';
}

/**
 * Hook for managing sorting with URL persistence
 */
export const useSort = (
  defaultSortKey: string = 'date',
  defaultDirection: 'asc' | 'desc' = 'desc'
) => {
  const { getParam, setParams } = useQueryParams();

  // Get sort configuration from URL
  const sortConfig = useMemo((): SortConfig => {
    const sortBy = getParam('sortBy', defaultSortKey);
    const sortOrder = getParam('sortOrder', defaultDirection) as 'asc' | 'desc';

    return {
      key: sortBy,
      direction:
        sortOrder === 'asc' || sortOrder === 'desc'
          ? sortOrder
          : defaultDirection,
    };
  }, [getParam, defaultSortKey, defaultDirection]);

  /**
   * Update sort configuration
   */
  const updateSort = useCallback(
    (key: string, direction?: 'asc' | 'desc') => {
      const newDirection =
        direction ||
        (sortConfig.key === key && sortConfig.direction === 'asc'
          ? 'desc'
          : 'asc');

      setParams({
        sortBy: key,
        sortOrder: newDirection,
        page: 1, // Reset to page 1 when sort changes
      });
    },
    [sortConfig, setParams]
  );

  /**
   * Toggle sort direction for current sort key
   */
  const toggleSortDirection = useCallback(() => {
    updateSort(sortConfig.key, sortConfig.direction === 'asc' ? 'desc' : 'asc');
  }, [sortConfig, updateSort]);

  /**
   * Create a sort function for arrays
   */
  const createSortFunction = useCallback(
    (getSortValue: (item: any, sortKey: string) => any) => {
      return (a: any, b: any): number => {
        const aValue = getSortValue(a, sortConfig.key);
        const bValue = getSortValue(b, sortConfig.key);

        let comparison = 0;

        if (aValue < bValue) {
          comparison = -1;
        } else if (aValue > bValue) {
          comparison = 1;
        }

        return sortConfig.direction === 'asc' ? comparison : -comparison;
      };
    },
    [sortConfig]
  );

  /**
   * Sort an array using the current sort configuration
   */
  const sortData = useCallback(
    (data: any[], getSortValue: (item: any, sortKey: string) => any) => {
      return [...data].sort(createSortFunction(getSortValue));
    },
    [createSortFunction]
  );

  return {
    sortConfig,
    updateSort,
    toggleSortDirection,
    createSortFunction,
    sortData,
  };
};

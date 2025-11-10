import { useCallback, useMemo } from 'react';
import { useQueryParams } from './useQueryParams';

export interface FilterConfig {
  key: string;
  defaultValue?: string;
  type?: 'string' | 'number' | 'boolean';
}

export interface SortConfig {
  key: string;
  direction: 'asc' | 'desc';
}

/**
 * Hook for managing filters with URL persistence
 * Supports multiple filter types and automatic URL synchronization
 */
export const useFilters = (filterConfigs: FilterConfig[]) => {
  const { getParam, setParams } = useQueryParams();

  /**
   * Get current filter values from URL
   */
  const filters = useMemo(() => {
    const filterValues: Record<string, any> = {};

    filterConfigs.forEach(({ key, defaultValue, type = 'string' }) => {
      const value = getParam(key, defaultValue);

      switch (type) {
        case 'number':
          filterValues[key] = value
            ? parseInt(value, 10)
            : defaultValue
              ? parseInt(defaultValue, 10)
              : 0;
          break;
        case 'boolean':
          filterValues[key] = value === 'true';
          break;
        default:
          filterValues[key] = value;
      }
    });

    return filterValues;
  }, [filterConfigs, getParam]);

  /**
   * Update a single filter
   */
  const updateFilter = useCallback(
    (key: string, value: any) => {
      // Reset to page 1 when filters change
      setParams({
        [key]: value,
        page: 1,
      });
    },
    [setParams]
  );

  /**
   * Update multiple filters at once
   */
  const updateFilters = useCallback(
    (newFilters: Record<string, any>) => {
      setParams({
        ...newFilters,
        page: 1, // Reset to page 1 when filters change
      });
    },
    [setParams]
  );

  /**
   * Clear all filters
   */
  const clearFilters = useCallback(() => {
    const clearedFilters: Record<string, null> = {};
    filterConfigs.forEach(({ key }) => {
      clearedFilters[key] = null;
    });
    setParams({
      ...clearedFilters,
      page: 1,
    });
  }, [filterConfigs, setParams]);

  /**
   * Check if any filters are active
   */
  const hasActiveFilters = useMemo(() => {
    return filterConfigs.some(({ key, defaultValue }) => {
      const currentValue = filters[key];
      const defaultVal =
        defaultValue || (typeof currentValue === 'string' ? '' : 0);
      return currentValue !== defaultVal && currentValue !== 'all';
    });
  }, [filters, filterConfigs]);

  return {
    filters,
    updateFilter,
    updateFilters,
    clearFilters,
    hasActiveFilters,
  };
};

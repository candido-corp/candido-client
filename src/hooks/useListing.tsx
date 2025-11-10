import { useMemo } from 'react';
import { FilterConfig, useFilters } from './useFilters';
import { usePagination } from './usePagination';
import { useSearch } from './useSearch';
import { useSort } from './useSort';

export interface ListingConfig {
  itemsPerPage?: number;
  defaultSortKey?: string;
  defaultSortDirection?: 'asc' | 'desc';
  searchDebounceMs?: number;
  filterConfigs: FilterConfig[];
}

/**
 * Comprehensive hook for managing listing pages with search, filters, sorting, and pagination
 * All state is persisted in URL query parameters
 */
export const useListing = (
  data: any[],
  config: ListingConfig,
  searchFields: (item: any) => string[],
  getSortValue: (item: any, sortKey: string) => any,
  customFilter?: (item: any, filters: Record<string, any>) => boolean
) => {
  const {
    itemsPerPage = 10,
    defaultSortKey = 'date',
    defaultSortDirection = 'desc',
    searchDebounceMs = 300,
    filterConfigs,
  } = config;

  // Initialize all hooks
  const search = useSearch(searchDebounceMs);
  const filters = useFilters(filterConfigs);
  const sort = useSort(defaultSortKey, defaultSortDirection);

  // Apply search filter
  const searchFilter = search.createSearchFilter(searchFields);
  const searchFilteredData = useMemo(() => {
    return data.filter(searchFilter);
  }, [data, searchFilter]);

  // Apply filters
  const filteredData = useMemo(() => {
    return searchFilteredData.filter((item) => {
      // Use custom filter if provided
      if (customFilter) {
        return customFilter(item, filters.filters);
      }

      // Default filter logic
      return filterConfigs.every(({ key }) => {
        const filterValue = filters.filters[key];

        // Skip if filter is 'all' or empty
        if (!filterValue || filterValue === 'all' || filterValue === '') {
          return true;
        }

        // Custom filter logic can be added here
        // For now, we assume the filter value matches a property on the item
        const itemValue = (item as any)[key];

        // Handle different comparison types
        if (typeof filterValue === 'boolean') {
          return (item as any)[key] === filterValue;
        }

        if (typeof filterValue === 'string') {
          // For string filters, we might want to do case-insensitive matching
          if (typeof itemValue === 'string') {
            return itemValue.toLowerCase().includes(filterValue.toLowerCase());
          }
          return itemValue === filterValue;
        }

        return itemValue === filterValue;
      });
    });
  }, [searchFilteredData, filters.filters, filterConfigs, customFilter]);

  // Apply sorting
  const sortedData = useMemo(() => {
    return sort.sortData(filteredData, getSortValue);
  }, [filteredData, sort]);

  // Apply pagination
  const pagination = usePagination(sortedData.length, itemsPerPage);
  const paginatedData = useMemo(() => {
    return pagination.getPaginatedData(sortedData);
  }, [sortedData, pagination]);

  // Summary stats
  const stats = useMemo(
    () => ({
      totalItems: data.length,
      filteredItems: filteredData.length,
      currentPageItems: paginatedData.length,
      isFiltered: search.urlSearchQuery !== '' || filters.hasActiveFilters,
    }),
    [
      data.length,
      filteredData.length,
      paginatedData.length,
      search.urlSearchQuery,
      filters.hasActiveFilters,
    ]
  );

  /**
   * Clear all filters and search
   */
  const clearAll = () => {
    search.clearSearch();
    filters.clearFilters();
    pagination.resetToFirstPage();
  };

  return {
    // Data
    data: paginatedData,
    allFilteredData: filteredData,
    stats,

    // Search
    search: {
      query: search.searchQuery,
      urlQuery: search.urlSearchQuery,
      updateQuery: search.updateSearchQuery,
      clear: search.clearSearch,
      isSearching: search.isSearching,
    },

    // Filters
    filters: {
      values: filters.filters,
      update: filters.updateFilter,
      updateMultiple: filters.updateFilters,
      clear: filters.clearFilters,
      hasActive: filters.hasActiveFilters,
    },

    // Sorting
    sort: {
      config: sort.sortConfig,
      update: sort.updateSort,
      toggleDirection: sort.toggleSortDirection,
    },

    // Pagination
    pagination: {
      currentPage: pagination.currentPage,
      totalPages: pagination.totalPages,
      totalItems: pagination.totalItems,
      hasNext: pagination.hasNextPage,
      hasPrevious: pagination.hasPreviousPage,
      goToPage: pagination.goToPage,
      goToNext: pagination.goToNextPage,
      goToPrevious: pagination.goToPreviousPage,
    },

    // Utilities
    clearAll,
  };
};

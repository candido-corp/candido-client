import { useCallback, useEffect, useState } from 'react';
import { useQueryParams } from './useQueryParams';

/**
 * Hook for managing search functionality with URL persistence and debounce
 */
export const useSearch = (debounceMs: number = 300) => {
  const { getParam, setParams } = useQueryParams();

  // Get initial search query from URL
  const urlSearchQuery = getParam('search', '');

  // Local state for immediate UI updates
  const [localSearchQuery, setLocalSearchQuery] = useState(urlSearchQuery);

  // Sync local state with URL when URL changes
  useEffect(() => {
    setLocalSearchQuery(urlSearchQuery);
  }, [urlSearchQuery]);

  // Debounced update to URL
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (localSearchQuery !== urlSearchQuery) {
        setParams({
          search: localSearchQuery || null,
          page: 1, // Reset to page 1 when search changes
        });
      }
    }, debounceMs);

    return () => clearTimeout(timeoutId);
  }, [localSearchQuery, urlSearchQuery, debounceMs, setParams]);

  /**
   * Update search query (updates local state immediately, URL after debounce)
   */
  const updateSearchQuery = useCallback((query: string) => {
    setLocalSearchQuery(query);
  }, []);

  /**
   * Clear search query
   */
  const clearSearch = useCallback(() => {
    setLocalSearchQuery('');
  }, []);

  /**
   * Filter function that can be used to filter arrays based on search
   */
  const createSearchFilter = useCallback(
    (searchFields: (item: any) => string[]) => {
      return (item: any): boolean => {
        if (!urlSearchQuery) return true;

        const searchTerms = urlSearchQuery
          .toLowerCase()
          .split(' ')
          .filter(Boolean);
        const itemSearchText = searchFields(item).join(' ').toLowerCase();

        return searchTerms.every((term) => itemSearchText.includes(term));
      };
    },
    [urlSearchQuery]
  );

  return {
    searchQuery: localSearchQuery,
    urlSearchQuery, // The actual query being used for filtering
    updateSearchQuery,
    clearSearch,
    createSearchFilter,
    isSearching: localSearchQuery !== urlSearchQuery, // True when debouncing
  };
};

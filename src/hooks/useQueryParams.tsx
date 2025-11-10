import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

/**
 * Hook for managing URL query parameters
 * Provides utilities to get, set, and update query parameters
 */
export const useQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  /**
   * Get a specific query parameter value
   */
  const getParam = useCallback(
    (key: string, defaultValue?: string) => {
      return searchParams.get(key) || defaultValue || '';
    },
    [searchParams]
  );

  /**
   * Get a query parameter as a number
   */
  const getParamAsNumber = useCallback(
    (key: string, defaultValue?: number) => {
      const value = searchParams.get(key);
      const parsed = value ? parseInt(value, 10) : undefined;
      return !isNaN(parsed || 0) ? parsed : defaultValue || 0;
    },
    [searchParams]
  );

  /**
   * Set a single query parameter
   */
  const setParam = useCallback(
    (key: string, value: string | number | null) => {
      const newParams = new URLSearchParams(searchParams);

      if (value === null || value === '' || value === 0) {
        newParams.delete(key);
      } else {
        newParams.set(key, value.toString());
      }

      setSearchParams(newParams, { replace: true });
    },
    [searchParams, setSearchParams]
  );

  /**
   * Set multiple query parameters at once
   */
  const setParams = useCallback(
    (params: Record<string, string | number | null>) => {
      const newParams = new URLSearchParams(searchParams);

      Object.entries(params).forEach(([key, value]) => {
        if (value === null || value === '' || value === 0) {
          newParams.delete(key);
        } else {
          newParams.set(key, value.toString());
        }
      });

      setSearchParams(newParams, { replace: true });
    },
    [searchParams, setSearchParams]
  );

  /**
   * Clear all query parameters
   */
  const clearParams = useCallback(() => {
    setSearchParams({}, { replace: true });
  }, [setSearchParams]);

  /**
   * Get all current params as an object
   */
  const getAllParams = useCallback(() => {
    const params: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    return params;
  }, [searchParams]);

  return {
    getParam,
    getParamAsNumber,
    setParam,
    setParams,
    clearParams,
    getAllParams,
  };
};

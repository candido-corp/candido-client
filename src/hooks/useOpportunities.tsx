import { fetchOpportunities } from '@/api/opportunities';
import {
  Opportunity,
  OpportunityApiParams,
  OpportunityApiResponse,
  OpportunityFilters,
} from '@/components/opportunities/types';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

type UseOpportunitiesParams = {
  itemsPerPage: number;
  defaultSortBy?: string;
  defaultSortDirection?: 'asc' | 'desc';
};

type UseOpportunitiesReturn = {
  data: Opportunity[];
  pagination: OpportunityApiResponse['pagination'];
  loading: boolean;
  error: string | null;
  refetch: () => void;

  // Current state
  currentPage: number;
  sortBy: string;
  sortDirection: 'asc' | 'desc';
  filters: OpportunityFilters;

  // Actions
  setPage: (page: number) => void;
  setSortBy: (sortBy: string) => void;
  setSortDirection: (direction: 'asc' | 'desc') => void;
  setFilters: (filters: OpportunityFilters) => void;
  updateFilter: (key: keyof OpportunityFilters, value: any) => void;
  clearFilters: () => void;
};

export const useOpportunities = ({
  itemsPerPage,
  defaultSortBy = 'date',
  defaultSortDirection = 'desc',
}: UseOpportunitiesParams): UseOpportunitiesReturn => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [data, setData] = useState<Opportunity[]>([]);
  const [pagination, setPagination] = useState<
    OpportunityApiResponse['pagination']
  >({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Helper function to update URL params
  const updateParams = useCallback(
    (updates: Record<string, string | number | null>) => {
      const newParams = new URLSearchParams(searchParams);

      Object.entries(updates).forEach(([key, value]) => {
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

  // Get current state from URL parameters
  const currentPage = useMemo(() => {
    const value = searchParams.get('page');
    const parsed = value ? parseInt(value, 10) : undefined;
    return !isNaN(parsed || 0) && parsed ? parsed : 1;
  }, [searchParams]);

  const sortBy = useMemo(() => {
    return searchParams.get('sortBy') || defaultSortBy;
  }, [searchParams, defaultSortBy]);

  const sortDirection = useMemo(() => {
    const direction = searchParams.get('sortDirection') || defaultSortDirection;
    return direction as 'asc' | 'desc';
  }, [searchParams, defaultSortDirection]);

  const filters: OpportunityFilters = useMemo(() => {
    const location_type_key = searchParams.get('location_type_key') || 'all';
    const opportunity_level_key =
      searchParams.get('opportunity_level_key') || 'all';
    const opportunity_type_key =
      searchParams.get('opportunity_type_key') || 'all';
    const currency_code = searchParams.get('currency_code') || 'all';
    const compensation_amount_min = searchParams.get('compensation_amount_min');
    const compensation_amount_max = searchParams.get('compensation_amount_max');
    const search = searchParams.get('search') || '';

    return {
      location_type_key:
        location_type_key !== 'all' ? location_type_key : undefined,
      opportunity_level_key:
        opportunity_level_key !== 'all' ? opportunity_level_key : undefined,
      opportunity_type_key:
        opportunity_type_key !== 'all' ? opportunity_type_key : undefined,
      currency_code: currency_code !== 'all' ? currency_code : undefined,
      compensation_amount_min: compensation_amount_min
        ? parseFloat(compensation_amount_min)
        : undefined,
      compensation_amount_max: compensation_amount_max
        ? parseFloat(compensation_amount_max)
        : undefined,
      search: search || undefined,
    };
  }, [searchParams]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params: OpportunityApiParams = {
        page: currentPage,
        limit: itemsPerPage,
        sortBy: sortBy as any,
        sortDirection,
        filters,
      };

      const response = await fetchOpportunities(params);
      setData(response.data);
      setPagination(response.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setData([]);
      setPagination({
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        itemsPerPage,
      });
    } finally {
      setLoading(false);
    }
  }, [currentPage, itemsPerPage, sortBy, sortDirection, filters]);

  // Fetch data when dependencies change
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Actions
  const setPage = useCallback(
    (page: number) => {
      updateParams({ page });
    },
    [updateParams]
  );

  const setSortByAction = useCallback(
    (newSortBy: string) => {
      updateParams({ sortBy: newSortBy, page: null });
    },
    [updateParams]
  );

  const setSortDirection = useCallback(
    (direction: 'asc' | 'desc') => {
      updateParams({ sortDirection: direction, page: null });
    },
    [updateParams]
  );

  const updateFilter = useCallback(
    (key: keyof OpportunityFilters, value: any) => {
      const updates: Record<string, string | null> = { page: null };

      if (
        key === 'compensation_amount_min' ||
        key === 'compensation_amount_max'
      ) {
        updates[key] =
          value !== undefined && value !== null ? value.toString() : null;
      } else {
        updates[key] =
          value === 'all' || value === '' || value === undefined ? null : value;
      }

      updateParams(updates);
    },
    [updateParams]
  );

  const setFiltersAction = useCallback(
    (newFilters: OpportunityFilters) => {
      const updates: Record<string, string | null> = {
        location_type_key:
          newFilters.location_type_key && newFilters.location_type_key !== 'all'
            ? newFilters.location_type_key
            : null,
        opportunity_level_key:
          newFilters.opportunity_level_key &&
          newFilters.opportunity_level_key !== 'all'
            ? newFilters.opportunity_level_key
            : null,
        opportunity_type_key:
          newFilters.opportunity_type_key &&
          newFilters.opportunity_type_key !== 'all'
            ? newFilters.opportunity_type_key
            : null,
        currency_code:
          newFilters.currency_code && newFilters.currency_code !== 'all'
            ? newFilters.currency_code
            : null,
        compensation_amount_min:
          newFilters.compensation_amount_min !== undefined
            ? newFilters.compensation_amount_min.toString()
            : null,
        compensation_amount_max:
          newFilters.compensation_amount_max !== undefined
            ? newFilters.compensation_amount_max.toString()
            : null,
        search: newFilters.search || null,
        page: null,
      };

      updateParams(updates);
    },
    [updateParams]
  );

  const clearFilters = useCallback(() => {
    const newParams = new URLSearchParams();
    setSearchParams(newParams, { replace: true });
  }, [setSearchParams]);

  return {
    data,
    pagination,
    loading,
    error,
    refetch: fetchData,
    // Current state
    currentPage,
    sortBy,
    sortDirection,
    filters,

    // Actions
    setPage,
    setSortBy: setSortByAction,
    setSortDirection,
    setFilters: setFiltersAction,
    updateFilter,
    clearFilters,
  };
};

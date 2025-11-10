import ListingPagination from '@/components/Common/Listings/ListingPagination';
import ResultsCount from '@/components/Common/Listings/ResultsCount';
import SearchBar from '@/components/Common/Listings/SearchBar';
import { useOpportunities } from '@/hooks/useOpportunities';
import { BaseFC } from '@/models/interfaces/BaseFC';
import { cn } from '@/utils/shadcn';
import OpportunityCardSkeleton from './OpportunityCardSkeleton';
import OpportunityFiltersDrawer from './OpportunityFiltersDrawer';
import OpportunityGrid from './OpportunityGrid';
import OpportunitySort from './OpportunitySort';
import { Opportunity } from './types';

type OpportunityListingProps = Pick<BaseFC, 'className'> & {
  itemsPerPage?: number;
  onViewDetails?: (opportunity: Opportunity) => void;
};

/**
 * Complete listing component for job opportunities with search, filters, sorting, and pagination
 */
const OpportunityListing: React.FC<OpportunityListingProps> = ({
  itemsPerPage = 16,
  onViewDetails,
  className,
}) => {
  const opportunities = useOpportunities({
    itemsPerPage,
    defaultSortBy: 'created_at',
    defaultSortDirection: 'desc',
  });

  const handleSortDirectionToggle = () => {
    const newDirection = opportunities.sortDirection === 'asc' ? 'desc' : 'asc';
    opportunities.setSortDirection(newDirection);
  };

  return (
    <div className={cn('space-y-8', className)}>
      {/* Sticky Search and Filters Section */}
      <div className="sticky top-[--header-height] z-10 -mx-4 border-b border-border/40 bg-background/80 px-4 pb-6 pt-4 backdrop-blur-sm">
        <div className="flex flex-col items-center space-y-6">
          {/* Search Bars Row */}
          <div className="flex w-full max-w-4xl gap-4">
            {/* Main Search Bar - 3/4 width */}
            <div className="flex-[3]">
              <SearchBar
                value={opportunities.filters.search || ''}
                onChange={(value) =>
                  opportunities.updateFilter('search', value)
                }
                placeholder="Search by title, description, or location..."
              />
            </div>

            {/* Code Search Bar - 1/4 width */}
            <div className="flex-[1]">
              <SearchBar
                value={opportunities.filters.code_search || ''}
                onChange={(value) =>
                  opportunities.updateFilter('code_search', value)
                }
                placeholder="Search by code..."
              />
            </div>
          </div>

          {/* Filters and Sort Row */}
          <div className="flex w-full max-w-4xl items-center justify-between">
            {/* Filters Drawer - Left aligned */}
            <OpportunityFiltersDrawer
              locationTypeFilter={
                opportunities.filters.location_type_key || 'all'
              }
              opportunityLevelFilter={
                opportunities.filters.opportunity_level_key || 'all'
              }
              opportunityTypeFilter={
                opportunities.filters.opportunity_type_key || 'all'
              }
              currencyCodeFilter={opportunities.filters.currency_code || 'all'}
              onLocationTypeChange={(value: string) =>
                opportunities.updateFilter('location_type_key', value)
              }
              onOpportunityLevelChange={(value: string) =>
                opportunities.updateFilter('opportunity_level_key', value)
              }
              onOpportunityTypeChange={(value: string) =>
                opportunities.updateFilter('opportunity_type_key', value)
              }
              onCurrencyCodeChange={(value: string) =>
                opportunities.updateFilter('currency_code', value)
              }
              onClearFilters={opportunities.clearFilters}
            />

            {/* Sort Dropdown - Right aligned */}
            <OpportunitySort
              currentSortKey={opportunities.sortBy}
              currentSortDirection={opportunities.sortDirection}
              onSortChange={opportunities.setSortBy}
              onSortDirectionToggle={handleSortDirectionToggle}
            />
          </div>
        </div>
      </div>

      {/* Error State */}
      {opportunities.error && (
        <div className="text-center">
          <p className="text-red-500">{opportunities.error}</p>
          <button
            onClick={opportunities.refetch}
            className="mt-2 text-blue-500 underline"
          >
            Try again
          </button>
        </div>
      )}

      {/* Results Count */}
      {!opportunities.error && (
        <ResultsCount
          totalItems={opportunities.pagination.totalItems}
          itemType="opportunities"
        />
      )}

      {/* Opportunities Grid or Skeleton */}
      {opportunities.loading ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {Array.from({ length: itemsPerPage }, (_, index) => (
            <OpportunityCardSkeleton key={index} />
          ))}
        </div>
      ) : (
        <OpportunityGrid
          opportunities={opportunities.data}
          onViewDetails={onViewDetails}
        />
      )}

      {/* Pagination */}
      {!opportunities.loading &&
        !opportunities.error &&
        opportunities.pagination.totalPages > 1 && (
          <ListingPagination
            currentPage={opportunities.pagination.currentPage}
            totalPages={opportunities.pagination.totalPages}
            hasNext={
              opportunities.pagination.currentPage <
              opportunities.pagination.totalPages
            }
            hasPrevious={opportunities.pagination.currentPage > 1}
            onPageChange={opportunities.setPage}
            onNext={() =>
              opportunities.setPage(opportunities.pagination.currentPage + 1)
            }
            onPrevious={() =>
              opportunities.setPage(opportunities.pagination.currentPage - 1)
            }
          />
        )}
    </div>
  );
};

export default OpportunityListing;

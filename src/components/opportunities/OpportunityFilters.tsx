import FilterSelect, {
  FilterOption,
} from '@/components/Common/Listings/FilterSelect';
import SortDropdown, {
  SortOption,
} from '@/components/Common/Listings/SortDropdown';
import { BaseFC } from '@/models/interfaces/BaseFC';

type OpportunityFiltersProps = Pick<BaseFC, 'className'> & {
  // Filter values
  locationTypeFilter: string;
  opportunityLevelFilter: string;
  opportunityTypeFilter: string;
  currencyCodeFilter: string;

  // Filter handlers
  onLocationTypeChange: (value: string) => void;
  onOpportunityLevelChange: (value: string) => void;
  onOpportunityTypeChange: (value: string) => void;
  onCurrencyCodeChange: (value: string) => void;

  // Sort props
  currentSortKey: string;
  currentSortDirection: 'asc' | 'desc';
  onSortChange: (key: string) => void;
  onSortDirectionToggle: () => void;

  // Layout prop for sticky mode
  isCompact?: boolean;
};

// Filter options configuration
const locationTypeOptions: FilterOption[] = [
  { value: 'all', label: 'All Location Types' },
  { value: 'remote', label: 'Remote' },
  { value: 'hybrid', label: 'Hybrid' },
  { value: 'onsite', label: 'On-site' },
];

const opportunityLevelOptions: FilterOption[] = [
  { value: 'all', label: 'All Experience Levels' },
  { value: 'entry', label: 'Entry Level' },
  { value: 'mid', label: 'Mid Level' },
  { value: 'senior', label: 'Senior Level' },
  { value: 'executive', label: 'Executive' },
];

const opportunityTypeOptions: FilterOption[] = [
  { value: 'all', label: 'All Opportunity Types' },
  { value: 'job', label: 'Full-time Job' },
  { value: 'internship', label: 'Internship' },
  { value: 'freelance', label: 'Freelance' },
  { value: 'challenge', label: 'Challenge' },
  { value: 'bootcamp', label: 'Bootcamp' },
  { value: 'thesis', label: 'Thesis' },
  { value: 'mentorship', label: 'Mentorship' },
  { value: 'research', label: 'Research' },
  { value: 'volunteering', label: 'Volunteering' },
];

const currencyCodeOptions: FilterOption[] = [
  { value: 'all', label: 'All Currencies' },
  { value: 'USD', label: 'USD' },
  { value: 'EUR', label: 'EUR' },
  { value: 'GBP', label: 'GBP' },
];

const sortOptions: SortOption[] = [
  { key: 'created_at', label: 'Created Date' },
  { key: 'updated_at', label: 'Updated Date' },
  { key: 'display_name', label: 'Opportunity Name' },
  { key: 'compensation_amount', label: 'Compensation' },
  { key: 'start_date', label: 'Start Date' },
  { key: 'end_date', label: 'End Date' },
];

/**
 * Filter and sort controls for job opportunities
 */
const OpportunityFilters: React.FC<OpportunityFiltersProps> = ({
  locationTypeFilter,
  opportunityLevelFilter,
  opportunityTypeFilter,
  currencyCodeFilter,
  onLocationTypeChange,
  onOpportunityLevelChange,
  onOpportunityTypeChange,
  onCurrencyCodeChange,
  currentSortKey,
  currentSortDirection,
  onSortChange,
  onSortDirectionToggle,
  className,
}) => {
  return (
    <div className={`flex flex-wrap justify-center gap-4 ${className || ''}`}>
      <FilterSelect
        value={locationTypeFilter}
        onValueChange={onLocationTypeChange}
        options={locationTypeOptions}
        placeholder="Location Type"
      />

      <FilterSelect
        value={opportunityLevelFilter}
        onValueChange={onOpportunityLevelChange}
        options={opportunityLevelOptions}
        placeholder="Experience Level"
      />

      <FilterSelect
        value={opportunityTypeFilter}
        onValueChange={onOpportunityTypeChange}
        options={opportunityTypeOptions}
        placeholder="Opportunity Type"
      />

      <FilterSelect
        value={currencyCodeFilter}
        onValueChange={onCurrencyCodeChange}
        options={currencyCodeOptions}
        placeholder="Currency"
      />

      <SortDropdown
        sortOptions={sortOptions}
        currentSortKey={currentSortKey}
        currentDirection={currentSortDirection}
        onSortChange={onSortChange}
        onDirectionToggle={onSortDirectionToggle}
      />
    </div>
  );
};

export default OpportunityFilters;

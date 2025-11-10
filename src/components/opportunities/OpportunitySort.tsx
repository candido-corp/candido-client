import SortDropdown, {
  SortOption,
} from '@/components/Common/Listings/SortDropdown';
import { BaseFC } from '@/models/interfaces/BaseFC';
import React from 'react';

type OpportunitySortProps = Pick<BaseFC, 'className'> & {
  currentSortKey: string;
  currentSortDirection: 'asc' | 'desc';
  onSortChange: (key: string) => void;
  onSortDirectionToggle: () => void;
};

const sortOptions: SortOption[] = [
  { key: 'created_at', label: 'Created Date' },
  { key: 'updated_at', label: 'Updated Date' },
  { key: 'display_name', label: 'Opportunity Name' },
  { key: 'compensation_amount', label: 'Compensation' },
  { key: 'start_date', label: 'Start Date' },
  { key: 'end_date', label: 'End Date' },
];

/**
 * Sort dropdown component for opportunities
 */
const OpportunitySort: React.FC<OpportunitySortProps> = ({
  currentSortKey,
  currentSortDirection,
  onSortChange,
  onSortDirectionToggle,
  className,
}) => {
  return (
    <SortDropdown
      sortOptions={sortOptions}
      currentSortKey={currentSortKey}
      currentDirection={currentSortDirection}
      onSortChange={onSortChange}
      onDirectionToggle={onSortDirectionToggle}
      className={className}
    />
  );
};

export default OpportunitySort;

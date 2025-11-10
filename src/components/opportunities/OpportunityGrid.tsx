import { BaseFC } from '@/models/interfaces/BaseFC';
import { cn } from '@/utils/shadcn';
import OpportunityCard from './OpportunityCard';
import { Opportunity } from './types';

type OpportunityGridProps = Pick<BaseFC, 'className'> & {
  opportunities: Opportunity[];
  onViewDetails?: (opportunity: Opportunity) => void;
};

/**
 * Grid component for displaying a list of job opportunities
 */
const OpportunityGrid: React.FC<OpportunityGridProps> = ({
  opportunities,
  onViewDetails,
  className,
}) => {
  return (
    <div className={cn('grid grid-cols-1 gap-6 md:grid-cols-2', className)}>
      {opportunities.map((opportunity) => (
        <OpportunityCard
          key={opportunity.opportunity_id}
          opportunity={opportunity}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  );
};

export default OpportunityGrid;

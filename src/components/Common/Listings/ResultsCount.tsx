import { BaseFC } from '@/models/interfaces/BaseFC';
import { cn } from '@/utils/shadcn';

type ResultsCountProps = Pick<BaseFC, 'className'> & {
  totalItems: number;
  itemType?: string;
};

/**
 * Reusable results count component for listings
 */
const ResultsCount: React.FC<ResultsCountProps> = ({
  totalItems,
  itemType,
  className,
}) => {
  return (
    <div className={cn('text-center', className)}>
      <p className="text-muted-foreground">
        {totalItems} {itemType || 'items'}
      </p>
    </div>
  );
};

export default ResultsCount;

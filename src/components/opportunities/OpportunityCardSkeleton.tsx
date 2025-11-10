import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { BaseFC } from '@/models/interfaces/BaseFC';
import { cn } from '@/utils/shadcn';

type OpportunityCardSkeletonProps = Pick<BaseFC, 'className'>;

/**
 * Skeleton component for opportunity cards while loading
 */
const OpportunityCardSkeleton: React.FC<OpportunityCardSkeletonProps> = ({
  className,
}) => {
  return (
    <Card className={cn('glass-card', className)}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1 space-y-2">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-5 w-1/2" />
          </div>
        </div>

        {/* Badges Skeleton */}
        <div className="mt-3 flex flex-wrap gap-2">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-6 w-16" />
          <Skeleton className="w-18 h-6" />
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Description Skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
        </div>

        {/* Technologies Skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <div className="flex flex-wrap gap-1">
            <Skeleton className="h-6 w-12" />
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-14" />
            <Skeleton className="w-18 h-6" />
          </div>
        </div>

        {/* Benefits Skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <div className="flex flex-wrap gap-1">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-16" />
            <Skeleton className="w-18 h-6" />
          </div>
        </div>

        {/* Button Skeleton */}
        <div className="pt-2">
          <Skeleton className="h-10 w-full" />
        </div>
      </CardContent>
    </Card>
  );
};

export default OpportunityCardSkeleton;

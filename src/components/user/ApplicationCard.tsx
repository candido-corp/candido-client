import { Badge } from '@/components/ui/badge';
import { cn } from '@/utils/shadcn';

type ApplicationStatus = 'new' | 'in-progress' | 'completed' | 'on-hold';

interface ApplicationCardProps {
  title: string;
  client: string;
  value: string;
  dueDate: string;
  status: ApplicationStatus;
  className?: string;
}

export function ApplicationCard({
  title,
  client,
  value,
  dueDate,
  status,
  className,
}: ApplicationCardProps) {
  const getStatusColor = (status: ApplicationStatus) => {
    switch (status) {
      case 'new':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'in-progress':
        return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      case 'completed':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'on-hold':
        return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
      default:
        return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  const getStatusLabel = (status: ApplicationStatus) => {
    switch (status) {
      case 'new':
        return 'New';
      case 'in-progress':
        return 'In Progress';
      case 'completed':
        return 'Completed';
      case 'on-hold':
        return 'On Hold';
      default:
        return status;
    }
  };

  return (
    <div
      className={cn(
        'glass-card group flex flex-col gap-3 rounded-xl p-5 transition-all duration-200 hover:translate-y-[-2px] hover:shadow-md',
        className
      )}
      style={{ '--index': '3' } as React.CSSProperties}
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-base font-medium transition-colors group-hover:text-primary">
            {title}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">{client}</p>
        </div>
        <Badge
          variant="outline"
          className={cn(
            'rounded-full px-2.5 py-0.5 text-xs font-medium',
            getStatusColor(status)
          )}
        >
          {getStatusLabel(status)}
        </Badge>
      </div>

      <div className="mt-1 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium">{value}</p>
          <p className="text-xs text-muted-foreground">Value</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium">{dueDate}</p>
          <p className="text-xs text-muted-foreground">Due Date</p>
        </div>
      </div>
    </div>
  );
}

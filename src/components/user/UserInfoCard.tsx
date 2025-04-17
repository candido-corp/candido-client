import { BaseFC } from '@/models/interfaces/BaseFC';
import { cn } from '@/utils/shadcn';
import { Link } from 'react-router-dom';

interface UserInfoCardProps extends BaseFC {
  title: string;
  value: string | number;
  label: string;
  icon: React.ReactNode;
  linkTo: string;
}

export function UserInfoCard({
  title,
  value,
  label,
  icon,
  className,
  linkTo,
}: UserInfoCardProps) {
  return (
    <Link to={linkTo}>
      <div
        className={cn(
          'glass-card flex animate-fade-up flex-col gap-4 rounded-xl p-6',
          linkTo && 'transition-all hover:shadow-xl',
          className
        )}
        style={{ '--index': '1' } as React.CSSProperties}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
            {icon}
          </div>
        </div>

        <div>
          <div className="text-2xl font-semibold">{value}</div>
          <p className="mt-1 text-sm text-muted-foreground">{label}</p>
        </div>
      </div>
    </Link>
  );
}

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { BaseFC } from '@/models/interfaces/BaseFC';
import { cn } from '@/utils/shadcn';
import { SortAsc, SortDesc } from 'lucide-react';

export type SortOption = {
  key: string;
  label: string;
};

type SortDropdownProps = Pick<BaseFC, 'className'> & {
  sortOptions: SortOption[];
  currentSortKey: string;
  currentDirection: 'asc' | 'desc';
  onSortChange: (key: string) => void;
  onDirectionToggle: () => void;
};

/**
 * Reusable sort dropdown component for listings
 */
const SortDropdown: React.FC<SortDropdownProps> = ({
  sortOptions,
  currentSortKey,
  currentDirection,
  onSortChange,
  onDirectionToggle,
  className,
}) => {
  const currentSortLabel =
    sortOptions.find((option) => option.key === currentSortKey)?.label ||
    currentSortKey;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className={cn('w-40', className)}>
          {currentSortLabel}
          {currentDirection === 'asc' ? (
            <SortAsc className="ml-2 h-4 w-4" />
          ) : (
            <SortDesc className="ml-2 h-4 w-4" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {sortOptions.map((option) => (
          <DropdownMenuItem
            key={option.key}
            onClick={() => onSortChange(option.key)}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
        <DropdownMenuItem onClick={onDirectionToggle}>
          {currentDirection === 'asc' ? 'Descending' : 'Ascending'}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SortDropdown;

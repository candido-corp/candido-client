import { Input } from '@/components/ui/input';
import { BaseFC } from '@/models/interfaces/BaseFC';
import { cn } from '@/utils/shadcn';
import { Search } from 'lucide-react';

type SearchBarProps = Pick<BaseFC, 'className'> & {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

/**
 * Reusable search bar component for listings
 */
const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Search...',
  className,
}) => {
  return (
    <div className={cn('relative w-full max-w-2xl', className)}>
      <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 transform text-muted-foreground" />
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-12 pl-12 text-lg"
      />
    </div>
  );
};

export default SearchBar;

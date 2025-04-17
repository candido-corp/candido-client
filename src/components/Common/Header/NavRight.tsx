import { BaseFC } from '@/models/interfaces/BaseFC';
import { cn } from '@/utils/shadcn';
import { Bell, ChartColumn, Settings } from 'lucide-react';
import UserAvatar from './UserAvatar';

const NavRight: React.FC<BaseFC> = ({ className }) => {
  return (
    <nav className={cn('flex items-center gap-4', className)}>
      <ChartColumn />
      <Bell />
      <Settings />
      <UserAvatar />
    </nav>
  );
};

export default NavRight;

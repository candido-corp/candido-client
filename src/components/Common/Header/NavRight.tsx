import { BaseFC } from '@/models/interfaces/BaseFC';
import { cn } from '@/utils/shadcn';
import UserAvatar from './UserAvatar';

const NavRight: React.FC<BaseFC> = ({ className }) => {
  return (
    <nav className={cn('flex items-center gap-2', className)}>
      <UserAvatar />
      <ModeToggle />
    </nav>
  );
};

export default NavRight;

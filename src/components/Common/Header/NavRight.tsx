import { Button } from '@/components/ui/button';
import { EnumRoutes } from '@/models/enums/EnumRoutes';
import { BaseFC } from '@/models/interfaces/BaseFC';
import { cn } from '@/utils/shadcn';
import { Plus } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import UserAvatar from './UserAvatar';

const NavRight: React.FC<BaseFC> = ({ className }) => {
  return (
    <nav className={cn('flex items-center gap-4', className)}>
      <Button asChild className="hidden md:flex">
        <NavLink to={EnumRoutes.FORMS_CREATE}>
          <Plus />
          Create your own
        </NavLink>
      </Button>
      <UserAvatar />
    </nav>
  );
};

export default NavRight;

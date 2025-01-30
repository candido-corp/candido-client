import { BaseFC } from '@/models/interfaces/BaseFC';
import { cn } from '@/utils/shadcn';
import UserAvatar from './UserAvatar';
import { Button } from '@/components/ui/button';
import { NavLink } from 'react-router-dom';
import { EnumRoutes } from '@/models/enums/EnumRoutes';
import { Plus } from 'lucide-react';
import { ModeToggle } from '../ModeToggle';

const NavRight: React.FC<BaseFC> = ({ className }) => {
  return (
    <nav className={cn('flex items-center gap-4', className)}>
      <Button asChild className="hidden md:flex">
        <NavLink to={EnumRoutes.FORMS_CREATE}>
          <Plus />
          Build your opportunity
        </NavLink>
      </Button>
      <UserAvatar />
      <ModeToggle />
    </nav>
  );
};

export default NavRight;

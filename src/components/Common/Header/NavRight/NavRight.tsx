import { UserAvatarExp } from '@/components/Common/Header/NavRight/UserAvatarExp.tsx';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useAuth } from '@/hooks/useAuth';
import { EnumRoutes } from '@/models/enums/EnumRoutes';
import { BaseFC } from '@/models/interfaces/BaseFC';
import { cn } from '@/utils/shadcn';
import { TooltipProvider } from '@radix-ui/react-tooltip';
import { ChartColumn } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import NavNotificationsDropdown from './NavNotificationsDropdown';

const NavRight: React.FC<BaseFC> = ({ className }) => {
  const { isAuthenticated } = useAuth();
  return (
    <nav className={cn('flex items-center', className)}>
      <TooltipProvider>
        {isAuthenticated && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" asChild>
                <NavLink
                  to={EnumRoutes.ANALYTICS}
                  className="[&.active]:text-primary"
                >
                  <ChartColumn />
                </NavLink>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">Analytics</TooltipContent>
          </Tooltip>
        )}

        <NavNotificationsDropdown />

        <UserAvatarExp className="ml-2" />
      </TooltipProvider>
    </nav>
  );
};

export default NavRight;

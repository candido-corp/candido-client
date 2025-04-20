import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { EnumRoutes } from '@/models/enums/EnumRoutes';
import { BaseFC } from '@/models/interfaces/BaseFC';
import { cn } from '@/utils/shadcn';
import { TooltipProvider } from '@radix-ui/react-tooltip';
import { ChartColumn, Settings } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import NavNotificationsDropdown from './NavNotificationsDropdown';
import NavToggleThemeDropdown from './NavToggleThemeDropdown';

const NavRight: React.FC<BaseFC> = ({ className }) => {
  return (
    <nav className={cn('flex items-center', className)}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" asChild>
              <NavLink
                to={EnumRoutes.ANALYTICS}
                end
                className="[&.active]:text-primary"
              >
                <ChartColumn />
              </NavLink>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">Analytics</TooltipContent>
        </Tooltip>

        <NavNotificationsDropdown />

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" asChild>
              <NavLink
                to={EnumRoutes.SETTINGS}
                end
                className="[&.active]:text-primary"
              >
                <Settings />
              </NavLink>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">Settings</TooltipContent>
        </Tooltip>

        <NavToggleThemeDropdown />
      </TooltipProvider>
    </nav>
  );
};

export default NavRight;

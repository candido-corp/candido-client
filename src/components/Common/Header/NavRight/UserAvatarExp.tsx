import { CreditCard, LogOut, Settings, User } from 'lucide-react';

import LogoutForm from '@/components/auth/LogoutForm';
import { ModeToggleGroup } from '@/components/Common/ModeToggleGroup.tsx';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/hooks/useAuth.tsx';
import { EnumRoutes } from '@/models/enums/EnumRoutes.ts';
import { cn } from '@/utils/shadcn.ts';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

export function UserAvatarExp({ className }: { className?: string }) {
  const { t } = useTranslation();
  const { user } = useAuth();

  return (
    <div className={cn(className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <span className="inline-flex">{user?.email}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <User />
              <NavLink to={EnumRoutes.USER} className="w-full">
                Profile
              </NavLink>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CreditCard />
              <NavLink to={EnumRoutes.SETTINGS_BILLING} className="w-full">
                Billing
              </NavLink>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings />
              <NavLink to={EnumRoutes.SETTINGS} className="w-full">
                Settings
              </NavLink>
            </DropdownMenuItem>
            <DropdownMenuItem className="!focus:bg-transparent !hover:bg-transparent !active:bg-transparent">
              <span>Theme</span>
              <ModeToggleGroup />
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />

          <DropdownMenuItem>
            <LogoutForm>
              <LogOut />
              {t('logout.title')}
            </LogoutForm>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

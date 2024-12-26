import { useTranslation } from 'react-i18next';
import { BaseFC } from '@/models/interfaces/BaseFC';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Form, NavLink } from 'react-router-dom';
import { EnumRoutes } from '@/models/enums/EnumRoutes';
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
import { useAuth } from '@/hooks/useAuth';

const UserAvatar: React.FC<BaseFC> = ({ className }) => {
  const { t } = useTranslation();
  const { user, isAuthenticated } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Avatar>
            <AvatarImage
              src="https://github.com/shadcn.png"
              alt={user?.email}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
        side="bottom"
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar>
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt={user?.email}
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">Nome</span>
              <span className="truncate text-xs">{user?.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {isAuthenticated ? (
            <>
              <DropdownMenuItem>
                <NavLink to={EnumRoutes.USER} className="w-full">
                  {t('user.title')}
                </NavLink>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <NavLink to={EnumRoutes.SETTINGS} className="w-full">
                  {'Settings'}
                </NavLink>
              </DropdownMenuItem>
            </>
          ) : (
            <>
              <DropdownMenuItem>
                <NavLink to={EnumRoutes.LOGIN} className="w-full">
                  {t('login.title')}
                </NavLink>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <NavLink to={EnumRoutes.REGISTER} className="w-full">
                  {t('register.title')}
                </NavLink>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuGroup>
        {isAuthenticated && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Form action={EnumRoutes.LOGOUT} method="post" className="w-full">
                <button type="submit" className="w-full text-left">
                  {t('logout.title')}
                </button>
              </Form>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAvatar;

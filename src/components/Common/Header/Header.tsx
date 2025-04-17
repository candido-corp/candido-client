import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { navigationData } from '@/config/ConfigNavigation';
import { EnumRoutes } from '@/models/enums/EnumRoutes';
import { NavLink } from 'react-router-dom';
import NavMain from './NavMain';
import NavRight from './NavRight';

type HeaderProps = {
  hasSidebar?: boolean;
};

const Header: React.FC<HeaderProps> = ({ hasSidebar }) => {
  return (
    <header className="border-grid sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="ml-auto mr-auto h-[--header-height] w-full">
        <div className="flex h-14 items-center px-8">
          <div className="flex h-[--header-height] w-full items-center gap-2">
            {hasSidebar && (
              <>
                <SidebarTrigger className="h-8 w-8 md:hidden" />
                <Separator
                  orientation="vertical"
                  className="mr-2 h-4 md:hidden"
                />
              </>
            )}
            <NavLink
              to={EnumRoutes.HOME}
              className="mr-4 flex items-center gap-2 lg:mr-6"
              end
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
              </svg>
              <span className="hidden font-bold lg:inline-block">Candido</span>
              <Separator
                orientation="vertical"
                className="ml-2 hidden h-4 md:flex"
              />
            </NavLink>
            <NavMain navItems={navigationData} className="hidden md:flex" />
          </div>
          <div className="flex flex-1 items-center justify-end gap-4">
            {/* <div className="w-full flex-1 md:w-auto md:flex-none">
              <Input placeholder="Search..." id="search" />
            </div> */}
            <NavRight />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

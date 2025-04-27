import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { EnumRoutes } from '@/models/enums/EnumRoutes';
import { NavLink } from 'react-router-dom';
import NavMain from './NavMain';
import NavRight from './NavRight/NavRight';
import {Navigation} from "@/config/navigation";

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

            {/* TODO: This could be a logo component */}
            <NavLink
              to={EnumRoutes.HOME}
              className="mr-4 flex items-center gap-2 lg:mr-6"
              end
            >
              <span className="font-bold text-primary">Candido</span>
              <Separator
                orientation="vertical"
                className="ml-2 hidden h-4 md:flex"
              />
            </NavLink>

            {/* Main Navigation */}
            <NavMain navItems={Navigation.getNavbarItems()} className="hidden md:flex" />
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

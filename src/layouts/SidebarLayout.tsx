import Header from '@/components/Common/Header/Header';
import { SidebarMain } from '@/components/Common/Sidebar/SidebarMain';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { SidebarItem } from '@/config/ConfigSidebars';
import { EnumRoutes } from '@/models/enums/EnumRoutes';
import { BaseFC } from '@/models/interfaces/BaseFC';
import { Outlet, useLocation } from 'react-router-dom';

type SidebarLayoutProps = BaseFC & {
  sidebarNavItems: SidebarItem[];
};

const SidebarLayout: React.FC<SidebarLayoutProps> = ({ sidebarNavItems }) => {
  const location = useLocation();

  // Updates sidebar items with isActive based on the current path
  const updatedNavItems = sidebarNavItems.map((item) => ({
    ...item,
    isActive:
      item.url === location.pathname ||
      (item.url !== (EnumRoutes.HOME as string) &&
        item.url &&
        location.pathname.startsWith(item.url))
        ? true
        : false,
  }));

  return (
    <div className="[--header-height:calc(theme(spacing.14))]">
      <SidebarProvider className="flex flex-col">
        <Header hasSidebar />
        <div className="flex flex-1">
          <SidebarMain sidebarNavItems={updatedNavItems} />
          <SidebarInset className="!min-h-full py-6">
            <Outlet />
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default SidebarLayout;

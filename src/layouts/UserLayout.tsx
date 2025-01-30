import { UtilComponentBreadcrumb } from '@/components/Common/Breadcrumbs';
import Header from '@/components/Common/Header/Header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { UserSidebar } from '@/components/User/UserSidebar';
import { Outlet } from 'react-router-dom';

const UserLayout = () => {
  return (
    <div className="[--header-height:calc(theme(spacing.14))]">
      <SidebarProvider className="flex flex-col">
        <Header />
        <div className="flex flex-1">
          <UserSidebar />
          <SidebarInset>
            <div className="container flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2">
                <UtilComponentBreadcrumb />
              </div>
            </div>
            <Outlet />
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default UserLayout;

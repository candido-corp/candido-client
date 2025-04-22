import Header from '@/components/Common/Header/Header';
import { SidebarMain } from '@/components/Common/Sidebar/SidebarMain';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { SidebarItem } from '@/config/ConfigSidebars';
import { useAuth } from '@/hooks/useAuth';
import { BaseFC } from '@/models/interfaces/BaseFC';
import { cn } from '@/utils/shadcn';
import { Outlet, useLocation } from 'react-router-dom';

type SidebarLayoutProps = BaseFC & {
  sidebarNavItems: SidebarItem[];
};

const SidebarLayout: React.FC<SidebarLayoutProps> = ({ sidebarNavItems }) => {
  const location = useLocation();
  const { isUserVerifyStripeActive } = useAuth();

  console.log('location', location.pathname);

  // Updates sidebar items with isActive based on the current path
  const updatedNavItems = sidebarNavItems.map((item) => ({
    ...item,
    isActive: item.url === location.pathname,
  }));

  return (
    <div
      className={cn(
        isUserVerifyStripeActive &&
          '[--user-verified-stripe-height:theme(spacing.9)]',
        '[--header-height:calc(theme(spacing.14))]'
      )}
    >
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

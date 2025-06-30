import Header from '@/components/Common/Header/Header';
import { SidebarMain } from '@/components/Common/Sidebar/SidebarMain';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import {
  getCurrentPlugin,
  getCurrentPluginId,
  getMobileNavigationPlugins,
} from '@/config/navigation';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/utils/shadcn';
import { Outlet, useMatches } from 'react-router-dom';

const SidebarLayout: React.FC = () => {
  const { isUserVerified, isAuthenticated } = useAuth();
  const matches = useMatches();
  const currentPluginId = getCurrentPluginId(matches);

  const mobileNavigationPlugins = getMobileNavigationPlugins(isAuthenticated);
  const currentPlugin = currentPluginId
    ? getCurrentPlugin(currentPluginId)
    : undefined;

  const hasSidebarContent =
    currentPlugin?.sidebar && currentPlugin.sidebar.length > 0;

  return (
    <div
      className={cn(
        !isUserVerified && '[--user-verified-stripe-height:theme(spacing.9)]',
        '[--header-height:calc(theme(spacing.14))]'
      )}
    >
      <SidebarProvider className="flex flex-col">
        <Header hasSidebar={true} />
        <div className="flex flex-1">
          <SidebarMain
            fullNavigationPlugins={mobileNavigationPlugins}
            currentPlugin={currentPlugin}
            showDesktopSidebar={!!hasSidebarContent}
          />
          <SidebarInset className="!min-h-full py-6">
            <Outlet />
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default SidebarLayout;

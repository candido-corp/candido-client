import { useMatches, Outlet } from 'react-router-dom';
import Header from '@/components/Common/Header/Header';
import { SidebarMain } from '@/components/Common/Sidebar/SidebarMain';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import {
  getFullNavigationPlugins,
  RouteHandle
} from '@/config/navigation';
import { EnumNavigationPlugin } from '@/config/navigation/enums/EnumNavigationPlugin';

function getCurrentPluginId(matches: ReturnType<typeof useMatches>): EnumNavigationPlugin | undefined {
  for (const match of matches) {
    const handle = match.handle as RouteHandle | undefined;
    if (handle?.pluginId) return handle.pluginId;
  }
  return undefined;
}

const SidebarLayout: React.FC = () => {
  const matches = useMatches();
  const currentPluginId = getCurrentPluginId(matches);

  const fullNavigationPlugins = getFullNavigationPlugins();
  const currentPlugin = fullNavigationPlugins.find(p => p.id === currentPluginId);

  const hasSidebarContent = currentPlugin?.sidebar && currentPlugin.sidebar.length > 0;

  return (
    <div className="[--header-height:calc(theme(spacing.14))]">
      <SidebarProvider className="flex flex-col">
        <Header hasSidebar={true} />
        <div className="flex flex-1">
          <SidebarMain
            fullNavigationPlugins={fullNavigationPlugins}
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

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';
import {EnumRoutes} from '@/models/enums/EnumRoutes';
import {t} from 'i18next';
import {LogOut} from 'lucide-react';
import {Form} from 'react-router-dom';
import {SidebarNavMain} from './SidebarNavMain';
import {FlatNavItem, NavigationPlugin} from "@/config/navigation";

type SidebarMainProps = React.ComponentProps<typeof Sidebar> & {
  fullNavigationPlugins: NavigationPlugin[];
  sidebarNavItems: FlatNavItem[];
  showDesktopSidebar: boolean;
};

export const SidebarMain: React.FC<SidebarMainProps> = (
  {
    fullNavigationPlugins,
    sidebarNavItems,
    showDesktopSidebar,
    ...props
  }) => {
  const hasDesktop = showDesktopSidebar;
  const hasMobile = true;

  if (!hasDesktop && hasMobile) return null;

  return (
    <Sidebar
      variant="inset"
      collapsible="icon"
      {...props}
      className="top-[--header-height] !h-[calc(100svh-var(--header-height))]"
    >
      <SidebarContent>
        {/* Mobile: navigation plugins */}
        <SidebarNavMain className="md:hidden" navItems={fullNavigationPlugins} mode="mobile"/>

        {/* Desktop: sidebar flat items */}
        <SidebarNavMain className="hidden md:block" navItems={sidebarNavItems} mode="desktop"/>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <Form action={EnumRoutes.LOGOUT} method="post" className="w-full">
              <SidebarMenuButton
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                tooltip={t('logout.title')}
              >
                <LogOut/>
                <span>{t('logout.title')}</span>
              </SidebarMenuButton>
            </Form>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail/>
    </Sidebar>
  );
};
